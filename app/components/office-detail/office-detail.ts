import {Component, Input} from 'angular2/core';
import {IONIC_DIRECTIVES} from 'ionic-angular';
import {Office} from '../../models/office';
import {ToMarkdownPipe} from '../../pipes/to-markdown';
import {DayHoursComponent} from '../day-hours/day-hours';
import {PhoneLinkPipe} from '../../pipes/phone-link';

@Component({
  selector: 'asb-office-detail',
  templateUrl: 'build/components/office-detail/office-detail.html',
  directives: [IONIC_DIRECTIVES, DayHoursComponent],
  pipes: [ToMarkdownPipe, PhoneLinkPipe]
})
export class OfficeDetail {
  @Input() office: Office;
  constructor() {
  }
}
