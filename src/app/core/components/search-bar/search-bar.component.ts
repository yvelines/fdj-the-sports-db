import { Component, OnInit, EventEmitter, Output, OnDestroy, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { ITeam } from '../../model/iteam.model';
import { TheSportsDbServcie } from '../../services/the-sportsdb.service';
import { startWith, map, debounceTime, distinctUntilChanged, switchMap, catchError, tap } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})

export class SearchBarComponent implements OnInit, OnDestroy {

  public leagueName: string;

  private searchTerms = new Subject<string>();
  private sub: Subscription;

  @Input()
  set termSearched(value: string) {
    if (!this.leagueName) {
      this.leagueName = value;
    }
  }

  @Output()
  termToSearch: EventEmitter<string> = new EventEmitter<string>();

  constructor(private theSportsDbServcie: TheSportsDbServcie, private router: Router) {}

  ngOnInit(): void {
    this.sub = this.searchTerms.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe((term: string) => {
        this.termToSearch.emit(term);
    });
  }

  ngOnDestroy(): void {
   this.sub.unsubscribe();
  }

  searchTeam(leagueName: string) {
    this.searchTerms.next(leagueName);
  }

  resetSearch() {
    this.leagueName = '';
    this.searchTerms.next(this.leagueName);
  }

}
