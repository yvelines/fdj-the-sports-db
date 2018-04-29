import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { ITeam } from '../../model/iteam.model';
import { TheSportsDbServcie } from '../../services/the-sportsdb.service';
import { startWith, map, debounceTime, distinctUntilChanged, switchMap, catchError, tap } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})

export class SearchBarComponent implements OnInit {

  public leagueName: string;
  private searchTerms = new Subject<string>();

  @Output()
  dataTeamsNames: EventEmitter<Observable<ITeam[]> | any[]> = new EventEmitter<Observable<ITeam[]> | any[]>();

  constructor(private theSportsDbServcie: TheSportsDbServcie, private router: Router) {}

  ngOnInit(): void {
    this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term => term
        ? this.theSportsDbServcie.getTeamsByLeagueName(term)
        : of<any[]>([])
      )
    ).subscribe((response: Observable<ITeam[]> | any[]) => {
      if (response instanceof Observable) {
        response.subscribe((value) => {
          this.dataTeamsNames.emit(value);
        });
      }
    });
  }

  searchTeam(leagueName: string) {
    this.searchTerms.next(leagueName);
  }

}
