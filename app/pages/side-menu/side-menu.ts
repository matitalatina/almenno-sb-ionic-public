import {Page, NavController, MenuController} from 'ionic-angular';
import {Inject, Component, Type, OnInit} from 'angular2/core';
import {TabsPage} from '../tabs/tabs';
import {LoginPage} from '../login/login';
import {LinksPage} from '../links/links';
import {FlagPage} from '../flag/flag';
import {CreditsPage} from '../credits/credits';
import {TrashesPage} from '../trashes/trashes';
import {Auth} from '../../auth/auth';

@Page({
  templateUrl: 'build/pages/side-menu/side-menu.html',
})
export class SideMenuPage implements OnInit {
  constructor(
    private nav: NavController,
    private menu: MenuController,
    private auth: Auth
    ) {

  }

  private ui = {
    isAuthenticated: false
  }

  ngOnInit() {
    console.log('INIT')
    this.ui.isAuthenticated = this.auth.isAuthenticated();
    this.auth.onAuthEmitter.subscribe(a => {
      console.log('AUTH' + a)
      this.ui.isAuthenticated = a
    });
  }

  tabsRoot = TabsPage;

  openLogin() {
    this.openPage(LoginPage);
  }

  openLinks() {
    this.openPage(LinksPage);
  }

  openFlag() {
    this.openPage(FlagPage);
  }

  openCredits() {
    this.openPage(CreditsPage);
  }

  openTrashes() {
    this.openPage(TrashesPage);
  }

  openPage(page: Type) {
    this.nav.push(page);
    this.menu.close();
  }

  logout() {
    console.log('logout! Out')
    this.auth.logout();
  }
}
