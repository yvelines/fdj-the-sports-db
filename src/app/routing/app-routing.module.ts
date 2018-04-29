import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TeamDetailComponent } from '../core/components/team/team-detail/team-detail.component';
import { TeamListComponent } from '../core/components/team/team-list/team-list.component';

const routes: Routes = [
  {path: '', redirectTo: 'search', pathMatch: 'full'},
  {path: 'search', component: TeamListComponent },
  {path: 'team-players/:name', component: TeamDetailComponent },
  {path: '**', redirectTo: '/'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {}
