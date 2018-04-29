import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { IAppConfig } from '../config/iapp.config';
import { SharedModule } from '../shared/shared.module';
import { NavComponent } from './components/nav/nav.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { TeamListComponent } from './components/team/team-list/team-list.component';
import { AppConfigService } from './services/the-sportsdb-config.service';
import { TheSportsDbServcie } from './services/the-sportsdb.service';
import { TeamDetailComponent } from './components/team/team-detail/team-detail.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  exports: [
    NavComponent,
    SearchBarComponent,
    TeamListComponent,
    TeamDetailComponent
  ],
  declarations: [
    NavComponent,
    SearchBarComponent,
    TeamListComponent,
    TeamDetailComponent

  ],
  providers: [
    TheSportsDbServcie
  ]
})

export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(`coreModule has already been loaded. Import Core modules in the AppModule only.`);
    }
  }

  static forRoot(config: IAppConfig): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        TheSportsDbServcie,
        {
          provide: AppConfigService,
          useValue: config
        }
      ]
    };
  }

}
