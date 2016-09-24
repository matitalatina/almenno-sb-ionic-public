import {Page, NavController} from 'ionic-angular';
import {Inject} from 'angular2/core';

@Page({
  templateUrl: 'build/pages/trashes/trashes.html',
})
export class TrashesPage {
  constructor(private nav: NavController) {
  }

  openPdf() {
    (<any>window).cordova.InAppBrowser.open('data/trashes/trashes.pdf', '_system');
  }
}
