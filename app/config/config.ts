import {Injectable} from 'angular2/core'

@Injectable()
export class Config {
  api = {
    backend: 'url',
    googleApiKey: {
      ios: process.env.GOOGLE_API_KEY_IOS,
      android: process.env.GOOGLE_API_KEY_ANDROID
    },
    firebase: {
      backend: process.env.,
      posts: 'posts',
      users: 'users'
    }
  }
  imgUpload = {
    endpoint: process.env.CLOUDINARY_ENDPOINT,
    apiKey: process.env.CLOUDINARY_API_KEY,
    uploadPreset: 'almennosb',
    maxWidth: 1024,
    maxHeight: 1024,
    quality: 80
  }
  push = {
    senderID: process.env.GOOGLE_PUSH_SENDERID,
    backend: process.env.GOOGLE_PUSH_BACKEND,
    topics: {
      post: {
        important: 'post-important'
      }
    }
  }
  default = {
    postNumber: 10
  }
  staticDataPath = 'data/static-data.json'
}
