import {Page} from 'ionic-angular';
import {PersonGroupProvider} from '../../storage/person-group-provider';
import {OnInit} from 'angular2/core';
import {NamedGroup} from '../../models/named-group';
import {Person} from '../../models/person';
import {Office} from '../../models/office';
import {OfficeGroupProvider} from '../../storage/office-group-provider';
import {NavController} from 'ionic-angular';
import {PersonListItemComponent} from '../../components/person-list-item/person-list-item';
import {PersonDetailPage} from '../person-detail/person-detail';

@Page({
  templateUrl: 'build/pages/contacts/contacts.html',
  directives: [PersonListItemComponent]
})
export class Contacts implements OnInit {
  constructor(
    private nav: NavController,
    private personGroupProvider: PersonGroupProvider,
    private officeGroupProvider: OfficeGroupProvider
    ) { }

  personGroups: NamedGroup<Person>[];
  officeGroups: NamedGroup<Office>[];

  ngOnInit() {
    this.personGroupProvider
      .list()
      .subscribe(
      personGroups => this.personGroups = personGroups
      );
  }

  goToPersonGroup(id: string) {
    console.log('coa' + id)
  }

  goToPersonDetail(person: Person) {
    this.nav.push(PersonDetailPage, { person: person });
  }
}
