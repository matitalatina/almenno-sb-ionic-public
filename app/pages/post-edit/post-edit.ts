import {Page, NavController, NavParams} from 'ionic-angular';
import {Inject} from 'angular2/core';
import {Post} from '../../models/post';
import {Observable} from 'rxjs';
import {PostForm} from '../../components/post-form/post-form';
import {PostsProvider} from '../../storage/posts-provider';
import {PushNotifications} from '../../services/push-notifications';
import {Config} from '../../config/config';

@Page({
  templateUrl: 'build/pages/post-edit/post-edit.html',
  directives: [PostForm]
})
export class PostEditPage {
  constructor(
    private nav: NavController,
    private navParams: NavParams,
    private postsProvider: PostsProvider,
    private pushNotifications: PushNotifications,
    private config: Config
    ) {
  }

  post: Post = new Post('reminder', '', [], null, '', null, null, null, null, null, null);

  ui = {
    notifyUsers: false
  };

  onPageWillEnter() {
    const postId = <string>this.navParams.get('postId');
    if (postId) {
      this.postsProvider.get(postId).subscribe(p => this.post = p);
    }
  }

  onSave(post: Post) {
    let observable: Observable<Post>;
    if (post._id) {
      observable = this.postsProvider.update(post);
    }
    else {
      observable = this.postsProvider.add(post);
    }
    observable.subscribe(p => {
      this.post = p;
      this.ui.notifyUsers = false;
    })
  }

  notifyPost(post: Post) {
    this.pushNotifications.notifyPost(this.config.push.topics.post.important, post);
  }

  onDelete(postId: string) {
    this.postsProvider.rm(postId).subscribe(deleted => this.nav.pop());
  }
}
