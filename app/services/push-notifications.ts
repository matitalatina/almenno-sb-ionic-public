import {NamedGroup} from '../models/named-group';
import {Office} from '../models/office';
import {Injectable} from 'angular2/core';
import {Http, Response, RequestOptions, Headers} from 'angular2/http';
import {Config} from '../config/config';
import {Location, LatLng} from '../models/location';
import {Observable, Observer} from 'rxjs';
import {Platform} from 'ionic-angular';
import * as _ from 'lodash';
import {Post} from '../models/post';
/// <reference path="main/ambient/phonegap-plugin-push/index.d.ts" />

export interface IPushNotifications {
  subscribeToTopic(topic: string)
}

@Injectable()
export class PushNotifications implements IPushNotifications {
  constructor(
    private platform: Platform,
    private config: Config,
    private http: Http
    ) {
  }

  subscribeToTopic(topic: string) {
    if (this.platform.is('cordova')) {
      let push = PushNotification.init(<any>{
        android: {
          senderID: this.config.push.senderID,
          iconColor: '#1E46F3',
          icon: 'notification_icon',
          topics: [topic]
        },
        ios: {
          senderID: this.config.push.senderID,
          alert: true,
          badge: true,
          sound: false,
          gcmSandbox: true,
          topics: [topic]
        },
        windows: {}
      });

      //this.prepareCallbacks(push);
      return push;
    }
  }

  notifyPost(topic: string, post: Post) {
    console.log('NOTIFY!')
    const url = this.config.push.backend;
    const body = {
      "to": "/topics/" + topic,
      "notification": {
        "title": "Almenno SB",
        "body": post.title + " - " + post.message,
        iconColor: '#1E46F3',
        icon: 'notification_icon',
        topics: [topic]
      },
      "data": { "message": "" }
    };
    const apiKey = this.platform.is('android') ? this.config.api.googleApiKey.android : this.config.api.googleApiKey.ios;
    const options = new RequestOptions({
      headers: new Headers({
        'Authorization': 'key=' + apiKey,
        'Content-Type': 'application/json'
      })
    });
    return this.http.post(url, JSON.stringify(body), options).subscribe(c => console.log(c));
  }

  private prepareCallbacks(push: PhonegapPluginPush.PushNotification) {
    push.on('registration', (data) => {
      console.log(data.registrationId);
    });

    push.on('notification', (data) => {
      console.log(data.message);
      console.log(data.title);
      console.log(data.count);
      console.log(data.sound);
      console.log(data.image);
      console.log(data.additionalData);
    });

    push.on('error', (e) => {
      console.log(e.message);
    });
  }

}
