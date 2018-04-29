import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ITeam } from '../../../model/iteam.model';


@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.scss']
})
export class TeamListComponent {

  public teams: ITeam[];

  constructor(private router: Router) {}

  onRecieveTeamsData(recievedTeams: ITeam[]) {
      this.teams = recievedTeams;
  }

  seeTeamDetails(team: ITeam) {
    this.router.navigate(['/team-players', team.strTeam]);
  }

}

