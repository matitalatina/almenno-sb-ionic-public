import {Page, NavController} from 'ionic-angular';

import {Office} from '../../models/office';
import {OfficeGroupProvider} from '../../storage/office-group-provider';
import {OnInit} from 'angular2/core';
import {NamedGroup} from '../../models/named-group';
import {OfficeListItem} from '../../components/office-list-item/office-list-item';
import {OfficeDetailPage} from '../office-detail/office-detail';
import {PhoneLinkPipe} from '../../pipes/phone-link';

@Page({
  templateUrl: 'build/pages/offices/offices.html',
  directives: [OfficeListItem],
  pipes: [PhoneLinkPipe]
})
export class OfficesPage implements OnInit {
  constructor(
    private nav: NavController,
    private officeGroupProvider: OfficeGroupProvider
    ) {
  }

  officeGroups: NamedGroup<Office>[];

  ngOnInit() {
    this.officeGroupProvider
      .list()
      .subscribe(
      officeGroups => this.officeGroups = officeGroups
      );
  }

  goToOfficeDetail(office: Office) {
    this.nav.push(OfficeDetailPage, { office: office });
  }

}
