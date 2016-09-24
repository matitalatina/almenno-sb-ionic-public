import {Page, NavController} from 'ionic-angular';
import {OnInit} from 'angular2/core';
import {PostsProvider} from '../../storage/posts-provider';
import {Post} from '../../models/post';
import {PostDetailComponent} from '../../components/post-detail/post-detail';
import {PostEditPage} from '../post-edit/post-edit';
import {Auth} from '../../auth/auth';

@Page({
  templateUrl: 'build/pages/posts/posts.html',
  directives: [PostDetailComponent]
})
export class PostsPage implements OnInit {
  constructor(
    private nav: NavController,
    private postsProvider: PostsProvider,
    private auth: Auth
    ) {
  }

  ui = {
    isAuthenticated: false
  }
  posts: Post[] = []

  ngOnInit() {
    this.ui.isAuthenticated = this.auth.isAuthenticated();
    this.auth.onAuthEmitter.subscribe(a => this.ui.isAuthenticated = a);
    this.postsProvider.list().then(l => this.posts = l);
  }

  onEditPost(post: Post) {
    this.nav.push(PostEditPage, { postId: post._id });
  }

  goToNewPost() {
    this.nav.push(PostEditPage);
  }
}
