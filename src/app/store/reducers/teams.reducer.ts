import * as fromActions from '../actions/teams.action';
import { ITeam } from '../../models';

export interface TeamState {
  data: ITeam [];
  loaded: boolean;
  loading: boolean;
}

export const initialState: TeamState = {
  data: [],
  loaded: false,
  loading: false
};


export function reducer (
  state = initialState,
  action: fromActions.TeamAction
): TeamState {

  switch (action.type) {
    case fromActions.LOAD_TEAMS: {
      return {
        ...state,
        loading: true
      };
    }

    case fromActions.LOAD_TEAMS_SUCCESS: {
      return {
        ...state,
        data: action.payload,
        loading: false,
        loaded: true
      };
    }

    case fromActions.LOAD_TEAMS_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }

    case fromActions.RESET_TEAMS_DATA: {
      return {
        ...state,
        data: action.payload,
        loading: false,
        loaded: false
      };
    }


    default:
      return state;
  }
}

export const getTeamsLoading = (state: TeamState) => state.loading;
export const getTeamsLoaded = (state: TeamState) => state.loaded;
export const getTeamsData = (state: TeamState) => state.data;
