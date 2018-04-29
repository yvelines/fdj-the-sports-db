import { ActionReducerMap } from '@ngrx/store';

import { AppState } from './app.states';
import * as searchReducer from './search.reducer';

export const reducers: ActionReducerMap<AppState> = {
  termOfSearchState: searchReducer.reducer
};
