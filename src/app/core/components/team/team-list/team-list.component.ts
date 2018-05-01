import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { ITeam } from '../../../../models';



@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeamListComponent {

  @Input()
  teams: ITeam[];

}

