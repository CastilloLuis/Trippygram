import { Component } from '@angular/core';

import { DashboardPage } from '../dashboard/dashboard';
import { SearchPage } from '../search/search';
import { UploadPage } from '../upload/upload';
import { ActivityPage } from '../activity/activity';
import { ProfilePage } from '../profile/profile';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = DashboardPage;
  tab2Root = SearchPage;
  tab3Root = UploadPage;
  tab4Root = ActivityPage;
  tab5Root = ProfilePage;

  constructor() {

  }
}
