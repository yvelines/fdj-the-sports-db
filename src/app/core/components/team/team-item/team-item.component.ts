import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { ITeam } from './../../../../models';

@Component({
  selector: 'app-item-team',
  templateUrl: './team-item.component.html',
  styleUrls: ['./team-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeamItemComponent {

  @Input()
  team: ITeam;

}

