import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { ITeam } from '../../../models';
import { TeamServcie } from '../../services';
import { Subscription } from 'rxjs/Subscription';
import * as fromStore from '../../../store';


@Component({
  selector: 'app-team',
  template: `
  <ng-container *ngIf="teams; then displayTeams else nothingFound"></ng-container>
  <ng-template #displayTeams>
    <app-team-list [teams]="teams"></app-team-list>
  </ng-template>
  <ng-template #nothingFound>
  <span *ngIf="isServiceCalled">Nothing found!</span>
  </ng-template>
  `,
})
export class TeamComponent implements OnInit, OnDestroy {

  public teams: ITeam[];
  public isServiceCalled: boolean;
  public termForSearch: string;

  private subParams: Subscription;

  constructor(private teamService: TeamServcie,
              private route: ActivatedRoute,
              private router: Router,
              private store: Store<fromStore.SoccerState>) {}



  ngOnInit(): void {
    this.subParams = this.route.params.subscribe( (params) => {
      this.termForSearch = params['league'];
      if (this.termForSearch) {
        this.getTeamsByLeagueName(this.termForSearch);
      }
   });

    this.store.select(fromStore.getTermOfsearch).subscribe((term: string) => {
      this.getTeamsByLeagueName(term);
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
    this.teamService.getTeamsByLeagueName(recievedTerm)
      .subscribe((response: ITeam[]) => {
          this.teams = response.length ? response : undefined;
          this.termForSearch = recievedTerm;
          this.setIsServiceCalled(true);
      });
  }

}

