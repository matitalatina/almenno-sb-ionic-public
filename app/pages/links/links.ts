import {Page, NavController} from 'ionic-angular';
import {Inject} from 'angular2/core';
import {Link} from '../../models/link';

/*
  Generated class for the LinksPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/links/links.html',
})
export class LinksPage {
  constructor(private nav: NavController) {

  }

  links: Link[] = [
    new Link('http://www.comune.almennosanbartolomeo.bergamo.it/', 'Comune di Almenno San Bartolomeo', null, 'data/img/links/comuneasb.jpg'),
    new Link('http://www.antennaeuropeadelromanico.it/', 'Antenna Europea Del Romanico', null, 'data/img/links/romanico.jpg'),
    new Link('http://parrocchiasb.it/', 'Parrocchia San Bartolomeo Apostolo', null, 'data/img/links/parrocchiasb.jpg'),
    new Link('http://www.oratoriosb.altervista.org/', 'Oratorio Don Antonio Seghezzi', null, 'data/img/links/oratoriosb.jpg')
  ];

  openLink(link: Link) {
    const windowUntyped = <any>window;
    if (windowUntyped.cordova && windowUntyped.cordova.InAppBrowser) {
      windowUntyped.cordova.InAppBrowser.open(link.src, '_system');
    }
  }
}
