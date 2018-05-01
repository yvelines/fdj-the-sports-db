import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { IPlayer } from '../../../..//models';
import { PlayerServcie } from '../../../services';

@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.scss']
})
export class TeamDetailComponent implements OnInit, OnDestroy {

  public players: IPlayer[];
  public teamDetailPlayers: IPlayer[];

  private subParams: Subscription;
  private termOfSearch: string;

  constructor(private playerServcie: PlayerServcie,
              private route: ActivatedRoute,
              private router: Router) {}

  ngOnInit(): void {
    this.subParams = this.route.params.subscribe( (params) => {
      this.termOfSearch = params['league'];
      this.playerServcie.getAllPlayersByTeam(params['name']).subscribe((response: IPlayer[]) => {
          this.teamDetailPlayers = response;
      });
   });
  }

  ngOnDestroy(): void {
    this.subParams.unsubscribe();
  }

  backToTeamlist() {
    this.router.navigate(['/search', {league: this.termOfSearch}]);
  }

  isValidDate(date: any) {
    return !isNaN(Date.parse(date));
  }

}

