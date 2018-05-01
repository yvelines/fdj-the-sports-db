import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';

import { IAppConfig } from '../config/iapp.config';
import { SharedModule } from '../shared/shared.module';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { TeamListComponent } from './components/team/team-list/team-list.component';
import * as fromServices from './services';
import { AppConfigService } from './services';
import { TeamItemComponent } from './components/team/team-item/team-item.component';

import { reducers, effects } from '../store';
import { TeamComponent } from './containers/team/team.component';
import { NavComponent } from './containers/nav/nav.component';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    SharedModule,
    ReactiveFormsModule,
    StoreModule.forFeature('soccer', reducers ),
    EffectsModule.forFeature(effects)
  ],
  exports: [
    NavComponent,
    SearchBarComponent,
    TeamListComponent,
    TeamItemComponent,
    TeamComponent,
  ],
  declarations: [
    NavComponent,
    SearchBarComponent,
    TeamListComponent,
    TeamItemComponent,
    TeamComponent

  ],
  providers: [
    ...fromServices.services
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
        {
          provide: AppConfigService,
          useValue: config
        }
      ]
    };
  }
}
