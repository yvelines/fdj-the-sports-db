import { Action } from '@ngrx/store';

// load teams
export const LOAD_TEAMS = '[Soccer] Load Teams';
export const LOAD_TEAMS_FAIL = '[Soccer] Load Teams Fail';
export const LOAD_TEAMS_SUCCESS = '[Soccer] Load Teams Success';
export const RESET_TEAMS_DATA = '[Soccer] Reset teams data';


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
export class ResetTeamsData implements Action {
  readonly type = RESET_TEAMS_DATA;
  constructor(public payload: any) {}
}

export type TeamAction = LoadTeams | LoadTeamsFail | LoadTeamsSuccess | ResetTeamsData;
