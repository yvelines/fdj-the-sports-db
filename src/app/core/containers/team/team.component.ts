import { getTeamsLoaded, getTeamsData } from './../../../store/reducers/index';
import { getTeamsLoading } from './../../../store/reducers/teams.reducer';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { ITeam } from '../../../models';
import { TeamServcie } from '../../services';
import { Subscription } from 'rxjs/Subscription';
import * as fromStore from '../../../store';
import { LoadTeams, ResetTeamsData } from '../../../store';
import { skip } from 'rxjs/operators';


@Component({
  selector: 'app-team',
  template: `
  <ng-container *ngIf="loading; then loadingData; else loadedData"></ng-container>
  <ng-template #loadedData>
      <app-team-list *ngIf="teams.length > 0"
          [teams]="teams">
    </app-team-list>
  </ng-template>
  <ng-template #loadingData>
    <span>loading....</span>
  </ng-template>
  `,
})
export class TeamComponent implements OnInit, OnDestroy {

  public teams: ITeam[];
  public isServiceCalled: boolean;
  public termForSearch: string;
  public loading: boolean;

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

    this.store.select(fromStore.getTermOfsearch)
      .pipe(skip(1))
      .subscribe((term: string) => {
          if (term) {
            this.store.dispatch(new LoadTeams());
          } else {
            this.store.dispatch(new ResetTeamsData([]));
          }
       });

    this.store.select(fromStore.getTeamsLoading)
      .subscribe((isLoading: boolean) => {
         this.loading = isLoading;
      });

    this.store.select(fromStore.getTeamsData)
      .subscribe((data: ITeam[]) => {
          this.teams = data;
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

