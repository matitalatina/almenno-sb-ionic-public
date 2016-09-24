import {Page, MenuController} from 'ionic-angular';
import {Contacts} from '../contacts/contacts';
import {OfficesPage} from '../offices/offices';
import {PostsPage} from '../posts/posts';

@Page({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page

  constructor(private menu: MenuController) {

  }
  postsRoot = PostsPage;
  contactsRoot = Contacts;
  officesRoot = OfficesPage;

  menuToggle(): Promise<boolean> {
    return this.menu.toggle();
  }

}
