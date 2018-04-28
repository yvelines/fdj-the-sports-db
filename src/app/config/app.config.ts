import { InjectionToken } from '@angular/core';

import { IAppConfig } from './iapp.config';

export let APP_CONFIG = new InjectionToken('app.config');

const API_ENDPOINT = 'https://www.thesportsdb.com/api/v1/json/{API_KEY}';

export const AppConfig: IAppConfig = {
  routes: {

  },
  endpoints: {
    // Search for all players from team
    getAllPlayersByTeamName: `${API_ENDPOINT}/searchplayers.php?t=`,
    // List all Teams in a League
    getAllTeamsByLeagueName: `${API_ENDPOINT}/search_all_teams.php?l=`
  },
};
