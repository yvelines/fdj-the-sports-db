import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
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

  ngOnInit(): void {
    this.sub = this.searchTerms
      .pipe(
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
