import { Component, Input } from '@angular/core';

import { ITeam } from './../../../../models';

@Component({
  selector: 'app-item-team',
  templateUrl: './team-item.component.html',
  styleUrls: ['./team-item.component.scss']
})
export class TeamItemComponent {

  @Input()
  team: ITeam;

}

