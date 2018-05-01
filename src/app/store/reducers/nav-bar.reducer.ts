import * as fromActions from '../actions/nav-bar.action';
import { ITeam } from '../../models';

export interface SearchBarState {
  term: string;
}

export const initialState: SearchBarState = {
  term: undefined,
};


export function reducer (
  state = initialState,
  action: fromActions.NavBarAction
): SearchBarState {

  switch (action.type) {
    case fromActions.SET_TERM_OF_SEARH: {
      return {
        ...state,
        term: action.payload
      };
    }

    default:
      return state;
  }
}

export const getTerm = (state: SearchBarState) => state.term;

