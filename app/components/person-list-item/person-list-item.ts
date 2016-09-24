import {Component, Input} from 'angular2/core';
import {Item} from 'ionic-angular'
import {Person} from '../../models/person';
@Component({
  selector: 'asb-person-li',
  templateUrl: 'build/components/person-list-item/person-list-item.html',
  directives: [Item]
})
export class PersonListItemComponent {
  @Input() person: Person
}
