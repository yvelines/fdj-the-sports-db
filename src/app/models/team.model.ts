import { ITeam } from './iteam.model';

export class Team implements ITeam {

  constructor(public strTeam: string, public strTeamBadge: string) {}

}
