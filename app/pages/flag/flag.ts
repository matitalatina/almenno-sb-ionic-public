import {Page, NavController} from 'ionic-angular';
import {Inject} from 'angular2/core';
import {Flag} from '../../models/flag';
import {Location} from '../../models/location';
import {LocateMe} from '../../components/locate-me/locate-me';

@Page({
  templateUrl: 'build/pages/flag/flag.html',
  directives: [LocateMe]
})
export class FlagPage {
  constructor(private nav: NavController) { }

  flag: Flag = new Flag('road', null);

  onLocate(location: Location) {
    this.flag.location = location;
  }

  onTogglePosition(enabled: boolean) {
    console.log(enabled)
    if (!enabled) {
      this.flag.location = null;
    }
  }
}
