import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ITeam } from '../../model/iteam.model';
import { Observable } from 'rxjs/Observable';


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

  onRecieveTermToSearch(term: string) {
    this.termToSearch.emit(term);
  }

}

