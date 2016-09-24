import {Page, NavController, NavParams} from 'ionic-angular';
import {Inject, OnInit} from 'angular2/core';
import {OfficeDetail} from '../../components/office-detail/office-detail';
import {Office} from '../../models/office';

@Page({
  templateUrl: 'build/pages/office-detail/office-detail.html',
  directives: [OfficeDetail]
})
export class OfficeDetailPage implements OnInit {
  constructor(
    private nav: NavController,
    private navParams: NavParams) {
  }

  office: Office;

  ngOnInit() {
    this.office = <Office>this.navParams.get('office');
    console.log(this.office);
  }
}
