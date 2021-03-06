import {Page, NavController} from 'ionic-angular';
import {Inject} from 'angular2/core';
import {PostsProvider} from '../../storage/posts-provider';
import {Post} from '../../models/post';
import {Location, LatLng} from '../../models/location';
import * as _ from 'lodash';

@Page({
  templateUrl: 'build/pages/credits/credits.html',
})
export class CreditsPage {
  constructor(
    private nav: NavController,
    private postsProvider: PostsProvider
    ) {
    //this.addPosts();
  }

  addPosts() {
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

    const posts = [
      new Post('reminder', 'Ricordiamo la scadenza della tassa XXX, dovete andare in comune prima del XXXXX per non incorrere in sanzioni', [], null, 'Attenzione', null),
      new Post('party', '…un viaggio fatto di narrazioni e musica, storie e poesie, racconti di vita e di viaggi, nelle esperienze di donne e poetesse provenienti da ogni angolo del mondo, per vivere con serenità, ma anche con consapevolezza, la ricorrenza della Giornata della Donna ..', photos, null, 'Giornata della donna', null),
      new Post('issue', 'C\'è un problema all\'incrocio bla bla bla.', [], null, 'Attenzione', null, null, null, location),
      new Post('party', 'Un momento memorabile, l\'inaugurazione del Centro Studi presso il Museo Del Falegname, complimenti alla Famiglia Sana e ai loro collaboratori che in questi anni sono riusciti a costruire un pezzo di Almenno in tutti i Continenti. Un vanto per tutta la comunità', photoDog, null, 'Scuola', null),
      new Post('event', 'La sagra della costina ti aspetta all\'Oratorio Domenica XX Agosto. Ti aspettiamo!', eventImg, null, 'Costinata all\'Oratorio!', null, null, null, null)
    ]

    _.map(posts, p => this.postsProvider.add(p))

  }
}
