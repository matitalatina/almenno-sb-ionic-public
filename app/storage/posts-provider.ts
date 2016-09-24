import {NamedGroup} from '../models/named-group';
import {Person} from '../models/person';
import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs';
import {Observer} from 'rxjs';
import {Config} from '../config/config';
import {Post, PostRaw} from '../models/post';
import {Http, Response} from 'angular2/http';
import {User} from '../models/user';
import {Location, LatLng} from '../models/location';
import * as Firebase from 'firebase';
import * as _ from 'lodash';

@Injectable()
export class PostsProvider {
  constructor(
    private config: Config
    ) { }

  list(): Promise<Post[]> {
    return new Promise<Post[]>((resolve, reject) => {
      const ref = new Firebase(this.config.api.firebase.backend);
      return ref.child(this.config.api.firebase.posts)
        .orderByKey()
        .limitToLast(this.config.default.postNumber)
        .once('value', posts => {
        let postList = _.values<PostRaw>(posts.val());
        let postsPromises = _.map(postList, p => this.postWithUser(p)).reverse();
        return Promise.all<Post>(postsPromises).then(posts => resolve(posts));
      })
    });
  }

  add(post: Post): Observable<Post> {
    const ref = this.getPostsRef();
    let postRaw = this.preparePostRaw(post, ref);
    let newPostRef = ref.push();
    postRaw._id = newPostRef.key();
    console.log(postRaw);
    const addPromise = newPostRef
      .set(postRaw)
      .then(_ => Post.fromPostRaw(postRaw))
    return Observable.fromPromise(addPromise);
  }

  update(post: Post): Observable<Post> {
    const ref = this.getPostsRef(post._id);
    const postRaw = this.preparePostRaw(post, ref);
    let observer: Observer<Post>;
    const observable = Observable.create((obs) => {
      observer = obs;
    });

    ref.update(postRaw, (error: any) => (error) ? observer.error(error) : observer.next(post));

    return observable;
  }

  get(id: string): Observable<Post> {
    return Observable.create((observer: Observer<Post>) => {
      const ref = this.getPostsRef(id);
      ref.once('value',
        (post: FirebaseDataSnapshot) => observer.next(post.val()),
        (error: any) => observer.error(error))
    });
  }

  rm(id: string): Observable<boolean> {
    const ref = this.getPostsRef(id);
    let promise = ref.remove()
      .then(_ => true);
    return Observable.fromPromise(promise);
  }

  /*const postRef = ref
  .child(this.config.api.firebase.posts + "/" + post._id)
  .once('value', po*/

  private preparePostRaw(post: Post, ref?: Firebase): PostRaw {
    let postRaw = PostRaw.fromPost(post);
    ref = ref || this.getPostsRef();
    if (!postRaw.userId) {
      postRaw.userId = ref.getAuth().uid;
    }
    return postRaw;
  }

  private getPostsRef(postId?: string) {
    let url = this.config.api.firebase.backend + "/" + this.config.api.firebase.posts;
    if (postId) {
      url += "/" + postId;
    }
    return new Firebase(url);
  }

  private postWithUser(post: PostRaw): Promise<Post> {
    return new Promise<Post>((resolve, reject) => {
      const userRef = new Firebase(this.config.api.firebase.backend + '/' + this.config.api.firebase.users + '/' + post.userId);
      userRef.once('value', user => {
        const finalizedPost = Post.fromPostRaw(post, user.val());
        resolve(finalizedPost);
      })
    });
  }

  private handleError(error: Response) {
    console.log(error);
    return Observable.throw(error.json().error || 'Server error');
  }

  listFake(): Observable<Post[]> {
    return Observable.create(observer => {
      const user = new User('sadas', 'Mattia', 'Natali', 'http://i0.kym-cdn.com/entries/icons/original/000/005/497/lenincat.jpg?1301802892');
      const photos = [
        'https://scontent-mxp1-1.xx.fbcdn.net/hphotos-xlf1/t31.0-8/s960x960/12748032_243270526011202_4019616354510306699_o.jpg'
      ];

      const photoDog = [
        'https://scontent-mxp1-1.xx.fbcdn.net/hphotos-xtf1/v/t1.0-9/12654333_10207482546613248_2993102271107933572_n.jpg?oh=c6beef3b38301e29e3c5dab1eb7323a1&oe=5792BA5A',
        'https://scontent-mxp1-1.xx.fbcdn.net/hphotos-xfp1/v/t1.0-9/12647348_10207482546333241_4643789054693396417_n.jpg?oh=3d48053b9342faa2263eecb7d007d817&oe=575B1B44'
      ];

      const eventImg = [
        'http://la.repubblica.it/cucina/files/2014/04/costine-per-rep-360x230.jpg',
        'http://cdn-2.guidecucina.it/o/j/come-cucinare-costine-di-maiale-al-forno_1c8105a2cd5c3c44d80ee793eb71dfbd.jpg'
      ];

      const location = new Location(new LatLng(45.7441541, 9.5802954), 'ciao');
      const locationOratorio = new Location(new LatLng(45.746533, 9.5782103), 'ciao');
      observer.next([
        new Post('reminder', 'Ricordiamo la scadenza della tassa XXX, dovete andare in comune prima del XXXXX per non incorrere in sanzioni', [], null, 'Attenzione', user),
        new Post('party', '…un viaggio fatto di narrazioni e musica, storie e poesie, racconti di vita e di viaggi, nelle esperienze di donne e poetesse provenienti da ogni angolo del mondo, per vivere con serenità, ma anche con consapevolezza, la ricorrenza della Giornata della Donna ..', photos, null, 'Giornata della donna', user),
        new Post('issue', 'C\'è un problema all\'incrocio bla bla bla.', [], null, 'Attenzione', user, null, null, location),
        new Post('party', 'Un momento memorabile, l\'inaugurazione del Centro Studi presso il Museo Del Falegname, complimenti alla Famiglia Sana e ai loro collaboratori che in questi anni sono riusciti a costruire un pezzo di Almenno in tutti i Continenti. Un vanto per tutta la comunità', photoDog, null, 'Scuola', user),
        new Post('event', 'La sagra della costina ti aspetta all\'Oratorio Domenica XX Agosto. Ti aspettiamo!', eventImg, null, 'Costinata all\'Oratorio!', user, null, null, null)
      ]);
      observer.complete();
    });
  }
}
