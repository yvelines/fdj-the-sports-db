import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';

import { IPlayer } from '../../../model/iplayer.model';
import { TheSportsDbServcie } from '../../../services/the-sportsdb.service';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.scss']
})
export class TeamDetailComponent implements OnInit {

  public players: Array<IPlayer>;
  public teamDetailPlayers: IPlayer[];

  private sub: Subscription;

  constructor(private theSportsDbServcie: TheSportsDbServcie, private route: ActivatedRoute) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe( (params) => {
      this.theSportsDbServcie.getAllPlayersByTeam(params['name']).subscribe((response: IPlayer[]) => {
          this.teamDetailPlayers = response;
      });
   });
  }

}

