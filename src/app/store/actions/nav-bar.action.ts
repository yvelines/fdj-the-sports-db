import { Action } from '@ngrx/store';

// Term of serach
export const SET_TERM_OF_SEARH = '[Leagues] Set term of search';


export class SetTermOfSearch implements Action {
  readonly type = SET_TERM_OF_SEARH;
  constructor(public payload: any) {}
}


export type NavBarAction = SetTermOfSearch;
