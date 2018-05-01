import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromTeams from './teams.reducer';
import * as fromNavBar from './nav-bar.reducer';

export interface SoccerState {
  search: fromNavBar.SearchBarState;
  teams: fromTeams.TeamState;
}

export const reducers: ActionReducerMap<SoccerState> = {
  search: fromNavBar.reducer,
  teams: fromTeams.reducer
};


// Selectors
export const getSoccerState = createFeatureSelector<SoccerState>(
  'soccer'
);

// Selectors for term of search
export const getSearchState = createSelector(
  getSoccerState,
  (state: SoccerState) => state.search);

export const getTermOfsearch = createSelector(getSearchState, fromNavBar.getTerm);


// Selectors for team
export const getTeamsState = createSelector(
  getSoccerState,
  (state: SoccerState) => state.teams);

export const getTeamsLoading = createSelector(getTeamsState, fromTeams.getTeamsLoading);
export const getTeamsLoaded = createSelector(getTeamsState, fromTeams.getTeamsLoaded);
export const getTeamsData = createSelector(getTeamsState, fromTeams.getTeamsData);
