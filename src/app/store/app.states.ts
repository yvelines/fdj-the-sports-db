import { IPlayer } from './../core/model/iplayer.model';
import { ITeam } from '../core/model/iteam.model';

export interface TermOfSearchState {
  termOfSearch: string;
}


export interface AppState {
  termOfSearchState: TermOfSearchState;
}
