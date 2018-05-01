import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromTeams from './teams.reducer';
import * as fromNavBar from './nav-bar.reducer';

export interface SoccerState {
  termOfSearch: fromNavBar.SearchBarState;
  teams: fromTeams.TeamState;
}

export const reducers: ActionReducerMap<SoccerState> = {
  termOfSearch: fromNavBar.reducer,
  teams: fromTeams.reducer
};


// Selectors

export const getSoccerState = createFeatureSelector<SoccerState>(
  'soccer'
);

export const getSearchState = createSelector(
  getSoccerState,
  (state: SoccerState) => state.termOfSearch);

export const getTermOfsearch = createSelector(getSearchState, fromNavBar.getTermOfSearch);
