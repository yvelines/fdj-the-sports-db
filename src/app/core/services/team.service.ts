import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';

import { ITeam, Team } from '../../models';
import { AppConfigService } from './config.service';
import * as utils from './utils';

interface ResponseObj  {
  [teams: string]: ITeam[];
}


@Injectable()
export class TeamServcie {

  private teams: ITeam[];

  constructor(@Inject(AppConfigService) private config, private http: HttpClient) {
    this.resetData();
  }

  private mapToTeam(team: ITeam): ITeam {
      return new Team(team.strTeam, team.strTeamBadge);
  }

  getTeamsByLeagueName(nameleague: string): Observable<ITeam[]> {
    this.resetData();
    return this.http.get<ResponseObj>(`${this.config.endpoints.getAllTeamsByLeagueName}${nameleague}`)
      .pipe(
          tap(console.log),
          map((response: ResponseObj) => {

            if (response.teams) {
              response.teams.forEach((team) => {
                // this.teams.push(this.mapToTeam(team));
                this.teams.push((({ strTeam, strTeamBadge}) => ({ strTeam, strTeamBadge}))(team));
              });
            }
            return this.teams;
          }),
          catchError(error => utils.handleError(error))
      );
  }

  private resetData() {
    this.teams = [];
  }

}
