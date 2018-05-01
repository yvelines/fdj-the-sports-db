import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromStore from '../../../store';
import { SetTermOfSearch } from '../../../store/actions/nav-bar.action';
import { SoccerState } from './../../../store/reducers';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  @Output()
  termToSearch: EventEmitter<string> = new EventEmitter<string>();

  @Input()
  termSearched: string;

  termOfSearch$: Observable<String>;

  constructor(private store: Store<fromStore.SoccerState>) {
    this.termOfSearch$ =  this.store.select(fromStore.getTermOfsearch));
  }

  onRecieveTermToSearch(term: string) {
    // todo dispatch une action pour  setter dans le store le term de recherche
    this.store.dispatch(new SetTermOfSearch(term));
    // this.termToSearch.emit(term);
  }

}

