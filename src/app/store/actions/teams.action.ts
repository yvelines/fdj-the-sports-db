import { Action } from '@ngrx/store';

// load teams
export const LOAD_TEAMS = '[Leagues] Load Teams';
export const LOAD_TEAMS_FAIL = '[Leagues] Load Teams Fail';
export const LOAD_TEAMS_SUCCESS = '[Leagues] Load Teams Success';


export class LoadTeams implements Action {
  readonly type = LOAD_TEAMS;
}

export class LoadTeamsFail implements Action {
  readonly type = LOAD_TEAMS_FAIL;
  constructor(public payload: any) {}
}

export class LoadTeamsSuccess implements Action {
  readonly type = LOAD_TEAMS_SUCCESS;
  constructor(public payload: any) {}
}

export type TeamAction = LoadTeams | LoadTeamsFail | LoadTeamsSuccess;
