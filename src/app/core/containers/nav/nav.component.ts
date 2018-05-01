import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromStore from '../../../store';
import { SetTermOfSearch } from '../../../store';
import { SoccerState } from './../../../store/reducers';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  @Input()
  termSearched: string;

  constructor(private store: Store<fromStore.SoccerState>) {}

  onRecieveTermToSearch(term: string) {
      this.store.dispatch(new SetTermOfSearch(term));
  }

}

