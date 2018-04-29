import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map } from 'rxjs/operators';

import { IPlayer } from '../model/iplayer.model';
import { ITeam } from '../model/iteam.model';
import { Player } from '../model/player.model';
import { Team } from '../model/team.model';
import { AppConfigService } from './the-sportsdb-config.service';


@Injectable()
export class TheSportsDbServcie {

  private arrayOfTeams: Array<ITeam>;
  private arrayOfPlayers: Array<IPlayer>;

  constructor(@Inject(AppConfigService) private config, private http: HttpClient) {
    this.arrayOfTeams = [];
    this.arrayOfPlayers = [];
  }

  private handleError(error: any) {
    if (error instanceof Response) {
      return Observable.throw(error.json()['error'] || 'backend server error');
    }
    return Observable.throw(error || 'backend server error');
  }

  private mapToTeam(team: Team): Team {
      return new Team(team.strTeam, team.strTeamBadge);
  }

  private mapToPlayer(player: Player): Player {
    return new Player(player.strPlayer, player.strPosition, new Date(player.dateBorn), player.strSigning, player.strThumb);
  }

   getTeamsByLeagueName(nameleague: string): Observable<ITeam[]> {
    return this.http.get(`${this.config.endpoints.getAllTeamsByLeagueName}${nameleague}`)
      .pipe(
          map((response: {teams: Array<any>}) => {
            if (response.teams) {
              response.teams.forEach((team: ITeam) => {
                this.arrayOfTeams.push(this.mapToTeam(team));
              });
            }
            return of(this.arrayOfTeams);
          }),
          catchError(error => this.handleError(error))
      );
  }

  getAllPlayersByTeam(teamName: string): Observable<IPlayer[]> {
    return this.http.get(`${this.config.endpoints.getAllPlayersByTeamName}${teamName}`)
    .pipe(
        map((response: {player: Array<any>}) => {
          if (response.player) {
            response.player.forEach((player: IPlayer) => {
              this.arrayOfPlayers.push(this.mapToPlayer(player));
            });
          }
          return this.arrayOfPlayers;
        }),
        catchError(error => this.handleError(error))
    );

  }

}
