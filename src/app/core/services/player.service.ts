import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { catchError, map } from 'rxjs/operators';

import { IPlayer, Player } from '../../models';
import { AppConfigService } from './config.service';
import * as utils from './utils';


@Injectable()
export class PlayerServcie {

  private players: IPlayer[];

  constructor(@Inject(AppConfigService) private config, private http: HttpClient) {
    this.resetData();
  }

  private mapToPlayer(player: IPlayer): IPlayer {
    return new Player(player.strPlayer, player.strPosition, new Date(player.dateBorn), player.strSigning, player.strThumb);
  }

  getAllPlayersByTeam(teamName: string): Observable<IPlayer[]> {
    this.resetData();
    return this.http.get(`${this.config.endpoints.getAllPlayersByTeamName}${teamName}`)
    .pipe(
        map((response: {player: any[]}) => {
          if (response.player) {
            response.player.forEach((player: IPlayer) => {
              this.players.push(this.mapToPlayer(player));
            });
          }
          return this.players;
        }),
        catchError(error => utils.handleError(error))
    );
  }

  private resetData() {
    this.players = [];
  }

}
