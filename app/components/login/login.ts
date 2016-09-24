import {Component, Input, EventEmitter, Output} from 'angular2/core';
import {FORM_DIRECTIVES} from 'angular2/common';
import {IONIC_DIRECTIVES} from 'ionic-angular';
import {EmailLogin} from '../../models/email-login';

@Component({
  selector: 'asb-login',
  templateUrl: 'build/components/login/login.html',
  directives: [IONIC_DIRECTIVES, FORM_DIRECTIVES]
})
export class LoginComponent {
  @Input() userLogin: EmailLogin;
  @Output() onLogin: EventEmitter<EmailLogin> = new EventEmitter<EmailLogin>();

  constructor() {
  }

  onSubmit() {
    this.onLogin.emit(this.userLogin);
  }

}
