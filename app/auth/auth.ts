import {NamedGroup} from '../models/named-group';
import {Office} from '../models/office';
import {Injectable} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {EventEmitter} from 'angular2/core';
import {Observable}     from 'rxjs';
import {Subject} from 'rxjs';
import {Config} from '../config/config';
import {EmailLogin} from '../models/email-login';
import * as _ from 'lodash';
import * as Firebase from 'firebase';
import {Subscriber} from 'rxjs';

@Injectable()
export class Auth {
  constructor(
    private config: Config
    ) { }

  onAuthEmitter = new Subject<boolean>();

  login(login: EmailLogin): Observable<boolean> {
    const ref = new Firebase(this.config.api.firebase.backend);
    console.log(login)
    const authPromise = ref.authWithPassword(login);
    return Observable.create((subscriber: Subscriber<boolean>) => {
      authPromise.then(auth => {
        const isAuthenticated = !!auth.token;
        subscriber.next(isAuthenticated);
        this.onAuthEmitter.next(isAuthenticated);
      });
    });
  }

  logout(): Observable<boolean> {
    const ref = new Firebase(this.config.api.firebase.backend);
    ref.unauth();
    this.onAuthEmitter.next(false);
    return Observable.create((subscriber: Subscriber<boolean>) => {
      subscriber.next(true);
    });
  }

  isAuthenticated(): boolean {
    const ref = new Firebase(this.config.api.firebase.backend);
    return !!ref.getAuth();
  }

}
