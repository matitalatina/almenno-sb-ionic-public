import {Page, NavController, NavParams} from 'ionic-angular';
import {OnInit} from 'angular2/core'
import {OfficeGroupProvider} from '../../storage/office-group-provider';
import {NamedGroup} from '../../models/named-group';
import {Office} from '../../models/Office';
import {PhoneLinkPipe} from '../../pipes/phone-link';

@Page({
  templateUrl: 'build/pages/office-group/office-group.html',
  pipes: [PhoneLinkPipe]
})
export class OfficeGroupPage implements OnInit {
  constructor(
    private nav: NavController,
    private navParams: NavParams,
    private officeGroupProvider: OfficeGroupProvider
    ) { }

  private _officeGroupId: string;
  officeGroup: NamedGroup<Office>;

  ngOnInit() {
    this._officeGroupId = this.navParams.get("officeGroupId");
    console.log(this._officeGroupId)
    this.officeGroupProvider
      .get(this._officeGroupId)
      .subscribe(og => { console.log(og); this.officeGroup = og });
  }
}
