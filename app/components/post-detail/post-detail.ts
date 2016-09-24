import {Component, Input, OnInit, Output, EventEmitter} from 'angular2/core'
import {Post} from '../../models/post'
import {Item, Button, Icon, Slide, Slides} from 'ionic-angular'
import {DayHoursComponent} from '../day-hours/day-hours';
import {PostTypeIconPipe} from '../../pipes/post-type-icon';
import {ToMarkdownPipe} from '../../pipes/to-markdown';
import {ANGULAR2_GOOGLE_MAPS_DIRECTIVES} from 'angular2-google-maps/core';
import {Location} from '../../models/location';
import {PushNotifications} from '../../services/push-notifications';
import {Config} from '../../config/config';
import * as _ from 'lodash';


@Component({
  selector: 'asb-post-detail',
  templateUrl: 'build/components/post-detail/post-detail.html',
  directives: [Item, Button, Icon, DayHoursComponent, Slide, Slides, ANGULAR2_GOOGLE_MAPS_DIRECTIVES],
  pipes: [PostTypeIconPipe, ToMarkdownPipe]
})
export class PostDetailComponent implements OnInit {
  @Input() post: Post;
  @Input() editable: boolean;
  @Output() edit = new EventEmitter<Post>();

  constructor() {

  }

  ngOnInit() {
  }

  sharePost(post: Post) {

    const appSignature = "\n\nPer ulteriori informazioni scarica l'app ufficiale del Comune di Almenno San Bartolomeo.";
    const message = _.unescape(post.message + appSignature);
    const title = _.unescape(post.title ? post.title : "Comune di Almenno San Bartolomeo");
    (<any>window).plugins.socialsharing.share(message, title)
  }

  editPost(post: Post) {
    this.edit.emit(post);
  }

  navigateTo(location: Location) {
    (<any>window).launchnavigator.navigate([location.coords.lat, location.coords.lng]);
  }

}

interface Window {
  launchnavigator: any;
}
