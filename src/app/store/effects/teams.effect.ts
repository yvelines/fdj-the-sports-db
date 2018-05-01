import { getTermOfsearch } from './../reducers/index';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { of } from 'rxjs/observable/of';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';

import * as fromServices from '../../core/services';
import * as teamActions from '../actions/teams.action';
import * as fromReducer from '../reducers';
import { SearchBarState, getTerm } from './../reducers/nav-bar.reducer';

@Injectable()
export class TeamsEffects {

  constructor(
    private store$: Store<any>,
    private actions$: Actions,
    private teamService: fromServices.TeamServcie) {}

  @Effect()
  loadTeams$  = this.actions$.ofType(teamActions.LOAD_TEAMS)
    .pipe(
      withLatestFrom(this.store$.select(fromReducer.getTermOfsearch)),
      switchMap((actionAndState: [Action, string]) => {
          return this.teamService
            .getTeamsByLeagueName(actionAndState[1])
            .pipe(
              map(teams => new teamActions.LoadTeamsSuccess(teams)),
              catchError(error => of(new teamActions.LoadTeamsFail(error)))
            );
      })
    );

}
