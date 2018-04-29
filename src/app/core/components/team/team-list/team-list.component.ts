import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ITeam } from '../../../model/iteam.model';
import { TheSportsDbServcie } from '../../../services/the-sportsdb.service';


@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.scss']
})
export class TeamListComponent {

  public teams: ITeam[];
  isServiceCalled: boolean;

  constructor(private router: Router, private theSportsDbServcie: TheSportsDbServcie) {}

  onRecieveTermToSearch(recievedTerm: string) {
    this.isServiceCalled = false;
      this.theSportsDbServcie.getTeamsByLeagueName(recievedTerm).subscribe((response: ITeam[]) => {
        this.isServiceCalled = true;
        this.teams = response.length ? response : undefined;
      });
  }

  seeTeamDetails(team: ITeam) {
    this.router.navigate(['/team-players', team.strTeam]);
  }

}

