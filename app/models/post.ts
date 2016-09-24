import {User} from './user';
import {Location} from './location';
import {Image} from './image';
import * as moment from 'moment';

export class Post {
  constructor(
    public postType: 'party' | 'animals' | 'issue' | 'event' | 'reminder',
    public message: string,
    public photos: Image[],
    public _id?: string,
    public title?: string,
    public user?: User,
    public dateStart?: moment.Moment,
    public dateEnd?: moment.Moment,
    public location?: Location,
    public created?: moment.Moment,
    public modified?: moment.Moment
    ) { }

  static fromPostRaw(postRaw: PostRaw, user?: User): Post {
    return new Post(
      postRaw.postType,
      postRaw.message,
      postRaw.photos ? postRaw.photos : null,
      postRaw._id,
      postRaw.title,
      user,
      postRaw.dateStart ? moment(postRaw.dateStart) : null,
      postRaw.dateEnd ? moment(postRaw.dateEnd) : null,
      postRaw.location ? postRaw.location : null,
      postRaw.created ? moment(postRaw.created) : null,
      postRaw.modified ? moment(postRaw.modified) : null
      )
  }
}

export class PostRaw {
  constructor(
    public postType: 'party' | 'animals' | 'issue' | 'event' | 'reminder',
    public message: string,
    public photos: Image[],
    public _id?: string,
    public title?: string,
    public userId?: string,
    public dateStart?: string,
    public dateEnd?: string,
    public location?: Location,
    public created?: string,
    public modified?: string
    ) { }

  static fromPost(post: Post): PostRaw {
    return new PostRaw(
      post.postType,
      post.message,
      post.photos ? post.photos : null,
      post._id,
      post.title,
      post.user ? post.user._id : null,
      post.dateStart ? post.dateStart.toISOString() : null,
      post.dateEnd ? post.dateEnd.toISOString() : null,
      post.location ? post.location : null,
      post.created ? post.created.toISOString() : null,
      post.modified ? post.modified.toISOString() : null
      )
  }
}
