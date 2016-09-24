import {App, Platform} from 'ionic-angular';
import {TabsPage} from './pages/tabs/tabs';
import {SideMenuPage} from './pages/side-menu/side-menu';
import {PersonGroupProvider} from './storage/person-group-provider';
import {StaticDataProvider} from './storage/static-data-provider';
import {OfficeGroupProvider} from './storage/office-group-provider';
import {PostsProvider} from './storage/posts-provider';
import {Config} from './config/config';
import {ANGULAR2_GOOGLE_MAPS_PROVIDERS} from 'angular2-google-maps/core';
import {Auth} from './auth/auth';
import {Geolocator} from './services/geolocator';
import {provide} from 'angular2/core';
import {PushNotifications} from './services/push-notifications';
import {Cloudinary} from './storage/cloudinary';
import 'rxjs/Rx';
import 'firebase';

// https://angular.io/docs/ts/latest/api/core/Type-interface.html
import {Type} from 'angular2/core';


@App({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  providers: [
    Auth,
    PersonGroupProvider,
    OfficeGroupProvider,
    StaticDataProvider,
    PostsProvider,
    Geolocator,
    Config,
    Cloudinary,
    PushNotifications,
    ANGULAR2_GOOGLE_MAPS_PROVIDERS],
  config: {} // http://ionicframework.com/docs/v2/api/config/Config/,
})
export class MyApp {
  rootPage: Type = SideMenuPage;

  constructor(
    platform: Platform,
    pushNotifications: PushNotifications,
    config: Config
    ) {
    platform.ready().then(() => {
      // The platform is now ready. Note: if this callback fails to fire, follow
      // the Troubleshooting guide for a number of possible solutions:
      //
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      //
      // First, let's hide the keyboard accessory bar (only works natively) since
      // that's a better default:
      //
      // Keyboard.setAccessoryBarVisible(false);
      //
      // For example, we might change the StatusBar color. This one below is
      // good for dark backgrounds and light text:
      // StatusBar.setStyle(StatusBar.LIGHT_CONTENT)
      pushNotifications.subscribeToTopic(config.push.topics.post.important);
    });
  }
}
