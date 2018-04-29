import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ITeam } from '../../model/iteam.model';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  @Output()
  dataTeamsNames: EventEmitter<Observable<Array<ITeam>> | any[]> = new EventEmitter<Observable<Array<ITeam>> | any[]>();


  constructor() {
  }

  ngOnInit() {
  }

  onRecieveTeamsData(recieveTeams: ITeam[]) {
    this.dataTeamsNames.emit(recieveTeams);
  }

}

