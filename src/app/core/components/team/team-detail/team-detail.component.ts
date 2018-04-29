import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { IPlayer } from '../../../model/iplayer.model';
import { TheSportsDbServcie } from '../../../services/the-sportsdb.service';

@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.scss']
})
export class TeamDetailComponent implements OnInit, OnDestroy {

  public players: IPlayer[];
  public teamDetailPlayers: IPlayer[];

  private sub: Subscription;

  constructor(private theSportsDbServcie: TheSportsDbServcie,
              private route: ActivatedRoute,
              private router: Router) {}

  ngOnInit(): void {
    this.sub = this.route.params.subscribe( (params) => {
      this.theSportsDbServcie.getAllPlayersByTeam(params['name']).subscribe((response: IPlayer[]) => {
          this.teamDetailPlayers = response;
      });
   });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  backToTeamlist() {
    this.router.navigate(['/']);
  }

  isValidDate(date: any) {
    return !isNaN(Date.parse(date));
  }

}

