import {Injectable} from '@angular/core';
import {GameDto, GameMessage, PlayerDto} from "../../model/dtos";
import {ApiService} from "./api.service";
import {Observable} from "rxjs";
import {WebSocketService} from "./web-socket.service";

export const GAME_ID_STORAGE = 'GAME_ID';

@Injectable({
  providedIn: 'root'
})
export class MultipleGameDataService {

  private _adminPlayer!: PlayerDto;
  private _players: PlayerDto[] = [];
  private _player!: PlayerDto;
  private _game!: GameDto;
  private _gameMessage?: GameMessage;
  private _gameOwner!: PlayerDto;

  constructor(private api: ApiService,
              private webSocket: WebSocketService) {
    this.webSocket.gameMessage$.subscribe((message) => {
      this._gameMessage = message;
      this.game = message.game;
      this.players = message.game.players;
      this.setCurrentPlayer();
    })
  }

  get currentPlayerPoints(): number {
    return this.players[this.game.currentTurn].points;
  }

  get players(): PlayerDto[] {
    return this._players;
  }

  set players(value: PlayerDto[]) {
    this._players = value;
  }

  get player(): PlayerDto {
    return this._player;
  }

  set player(playerDto: PlayerDto){
    this._player = playerDto;
  }

  get game(): GameDto {
    return this._game;
  }

  set game(game: GameDto) {
    this._game = game;
  }

  get adminPlayer(): PlayerDto {
    return this._adminPlayer;
  }

  set adminPlayer(player: PlayerDto) {
    this._adminPlayer = player;
    this._players.push(player)
  }

  get dicesFromGame(){
    return this.game.dices;
  }

  get gameOwner(){
    return this._gameOwner;
  }

  set gameOwner(player: PlayerDto){
    this._gameOwner = player;
  }

  connectGame(){
    this.webSocket.connectNewGame(this.game.gameId, this.gameOwner.name);
  }

  setCurrentPlayer(){
    this.player = this.players[this.game.currentTurn];
  }

  clearPlayers(): void {
    this._players = [];
  }

  restoreData(gameId: string):Observable<GameDto> {
    return this.api.findGameById(gameId);

  }

  nextPlayer(): void {
  this.webSocket.nextPlayer(this.game.gameId);
  }

  get playerTurn(): number {
    return 0;
  }
}
