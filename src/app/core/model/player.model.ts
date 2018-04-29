import { IPlayer } from './iplayer.model';

export class Player implements IPlayer {

  constructor( public strPlayer: string,
               public strPosition: string,
               public dateBorn: any,
               public strSigning: string,
               public strThumb: string ) {}

}
