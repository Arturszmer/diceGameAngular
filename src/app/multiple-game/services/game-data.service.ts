import {Injectable} from '@angular/core';
import {Player} from "../../model/player";
import {GameDto} from "../../model/dtos";
import {mockDiceRoll} from "../../model/mock-models";
import {Dice} from "../../model/dice";

@Injectable({
  providedIn: 'root'
})
export class GameDataService {

  private _adminPlayer!: Player;
  private _players: Player[] = [];
  private _games: GameDto[] = [];
  private _game!: GameDto;

  constructor() {}

  get currentPlayerPoints(): number {
    return this.players[this.game.currentTurn].points;
  }

  get players(): Player[] {
    return this._players;
  }

  set players(value: Player[]) {
    this._players = value;
  }

  get game(): GameDto {
    return this._game;
  }

  set game(game: GameDto) {
    this._game = game;
  }

  get games(): GameDto[] {
    return this._games;
  }

  set games(game: GameDto[]) {
    this._games = game;
  }

  get adminPlayer(): Player {
    return this._adminPlayer;
  }

  set adminPlayer(player: Player) {
    this._adminPlayer = player;
    this._players.push(player)
  }

  get diceNumbers(): Dice[] {
    return mockDiceRoll
  }

  clearPlayers(): void {
    this._players = [];
  }


}
