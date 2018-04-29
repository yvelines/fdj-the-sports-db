import { createFeatureSelector, createSelector, ActionReducerMap } from '@ngrx/store';

import * as fromActions from './app.actions';
import { SET_TERM_OF_SEARCH } from './app.constants';
import { TermOfSearchState } from './app.states';


export const initialState: TermOfSearchState = {
   termOfSearch: 'Spanish La Liga',
};


export function reducer(state: any = initialState,  action: fromActions.All): TermOfSearchState {

  switch (action.type) {
    case SET_TERM_OF_SEARCH: {
        return {...state, termOfSearch: action.payload};
    }
    default: {
      return state;
    }
  }
}

export const getTermOfsearchState = createFeatureSelector<TermOfSearchState>('termOfSearchState');

export const getTermOfSearch = createSelector(
  getTermOfsearchState,
  (state: TermOfSearchState) => state.termOfSearch
);



