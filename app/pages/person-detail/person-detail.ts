import {Page, NavController, NavParams} from 'ionic-angular';
import {PersonDetailComponent} from '../../components/person-detail/person-detail';
import {Person} from '../../models/person';
import {OnInit} from 'angular2/core';

@Page({
  templateUrl: 'build/pages/person-detail/person-detail.html',
  directives: [PersonDetailComponent]
})
export class PersonDetailPage implements OnInit {
  constructor(
    private nav: NavController,
    private navParams: NavParams
    ) { }

  person: Person;

  ngOnInit() {
    this.person = <Person> this.navParams.get('person');
  }
}
