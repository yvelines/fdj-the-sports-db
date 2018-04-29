import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ITeam } from '../../../model/iteam.model';
import { TheSportsDbServcie } from '../../../services/the-sportsdb.service';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.scss']
})
export class TeamListComponent implements OnInit, OnDestroy {

  public teams: ITeam[];
  public isServiceCalled: boolean;
  public termForSearch: string;

  private subParams: Subscription;

  constructor(private theSportsDbServcie: TheSportsDbServcie,
              private route: ActivatedRoute,
              private router: Router) {}

  ngOnInit(): void {
    this.subParams = this.route.params.subscribe( (params) => {
      this.termForSearch = params['league'];
      if (this.termForSearch) {
        this.getTeamsByLeagueName(this.termForSearch);
      }
   });
  }

  ngOnDestroy(): void {
    this.subParams.unsubscribe();
  }

  onRecieveTermToSearch(recievedTerm: string) {
    this.setIsServiceCalled(false);

    if (recievedTerm) {
      this.getTeamsByLeagueName(recievedTerm);
    } else {
       this.teams = undefined;
       this.router.navigate(['/']);
    }
  }

  seeTeamDetails(team: ITeam) {
    this.router.navigate(['/team-players', team.strTeam, {league: this.termForSearch}]);
  }

  private setIsServiceCalled(value: boolean) {
    this.isServiceCalled = value;
  }

  private getTeamsByLeagueName(recievedTerm: string) {
    this.theSportsDbServcie.getTeamsByLeagueName(recievedTerm).subscribe((response: ITeam[]) => {
      this.teams = response.length ? response : undefined;
      this.termForSearch = recievedTerm;
      this.setIsServiceCalled(true);
    });
  }

}

