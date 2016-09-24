import {Component, Input, OnInit} from 'angular2/core'
import {Person} from '../../models/person'
import {Item, Button, Icon} from 'ionic-angular'
import {DayHoursComponent} from '../day-hours/day-hours';
import {ToMarkdownPipe} from '../../pipes/to-markdown';
import {PhoneLinkPipe} from '../../pipes/phone-link';

@Component({
  selector: 'asb-person-detail',
  templateUrl: 'build/components/person-detail/person-detail.html',
  directives: [Item, Button, Icon, DayHoursComponent],
  pipes: [ToMarkdownPipe, PhoneLinkPipe]
})
export class PersonDetailComponent implements OnInit {
  @Input() person: Person

  ngOnInit() {
    console.log(this.person);
  }

}
