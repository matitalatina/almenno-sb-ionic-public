import {Component, Input, OnInit} from 'angular2/core';
import {DayHours} from '../../models/day-hours';
import {Item, Button, Icon} from 'ionic-angular';
import {ToDayTextPipe} from '../../pipes/to-day-text';
import {HourRangePipe} from '../../pipes/hour-range';
@Component({
  selector: 'asb-day-hours',
  templateUrl: 'build/components/day-hours/day-hours.html',
  pipes: [ToDayTextPipe, HourRangePipe]
})
export class DayHoursComponent {
  @Input() dayHours: DayHours
}
