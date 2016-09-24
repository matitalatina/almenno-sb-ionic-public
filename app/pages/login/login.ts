import {Page, NavController} from 'ionic-angular';
import {Inject} from 'angular2/core';
import {LoginComponent} from '../../components/login/login';
import {EmailLogin} from '../../models/email-login';
import {Auth} from '../../auth/auth';

@Page({
  templateUrl: 'build/pages/login/login.html',
  directives: [LoginComponent]
})
export class LoginPage {
  constructor(
    private nav: NavController,
    private auth: Auth
    ) {
  }

  userLogin = new EmailLogin('', '');
  submit(login: EmailLogin) {
    this.auth.login(login).subscribe(l => this.nav.pop());
  }
}
