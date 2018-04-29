import { Action } from '@ngrx/store';

import { SET_TERM_OF_SEARCH } from './app.constants';

export class SetTermOfSerach implements Action {
  readonly type = SET_TERM_OF_SEARCH;
  constructor(public payload: string) {}
}

export type All = SetTermOfSerach;
