import {Component, Input} from 'angular2/core';
import {IONIC_DIRECTIVES} from 'ionic-angular';
import {Office} from '../../models/office';
import {DayHoursOpenPipe} from '../../pipes/day-hours-open'

@Component({
  selector: 'asb-office-li',
  templateUrl: 'build/components/office-list-item/office-list-item.html',
  directives: [IONIC_DIRECTIVES],
  pipes: [DayHoursOpenPipe]
})
export class OfficeListItem {
  @Input() office: Office
  constructor() {
  }
}
