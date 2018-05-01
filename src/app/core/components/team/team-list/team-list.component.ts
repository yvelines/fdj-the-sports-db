import { Component, Input } from '@angular/core';

import { ITeam } from '../../../../models';



@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.scss']
})
export class TeamListComponent {

  @Input()
  teams: ITeam[];

}

