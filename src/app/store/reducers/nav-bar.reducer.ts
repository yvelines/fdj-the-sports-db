import * as fromActions from '../actions/nav-bar.action';
import { ITeam } from '../../models';

export interface SearchBarState {
  termOfSearch: string;
}

export const initialState: SearchBarState = {
  termOfSearch: 'Ai caramba',
};


export function reducer (
  state = initialState,
  action: fromActions.NavBarAction
): SearchBarState {

  switch (action.type) {
    case fromActions.SET_TERM_OF_SEARH: {
      return {
        ...state,
        termOfSearch: action.payload
      };
    }

    default:
      return state;
  }
}

export const getTermOfSearch = (state: SearchBarState) => state.termOfSearch;
