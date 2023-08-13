import {Player} from "../model/player";
import {Dice} from "../model/dice";

export interface GameData {
  gamePlayers_: Player[];
  playerTurn_: number;
  player_?: Player;
  diceNumbers_: Dice[];
}
