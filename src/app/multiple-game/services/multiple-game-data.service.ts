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

  private _players: PlayerDto[] = [];
  private _currentPlayer!: PlayerDto;
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

  get currentPlayer(): PlayerDto {
    return this._currentPlayer;
  }

  set currentPlayer(playerDto: PlayerDto){
    this._currentPlayer = playerDto;
  }

  get game(): GameDto {
    return this._game;
  }

  set game(game: GameDto) {
    this._game = game;
  }

  get dicesFromGame(){
    return this.game?.dices;
  }

  get gameOwner(){
    return this._gameOwner;
  }

  set gameOwner(player: PlayerDto){
    this._gameOwner = player;
  }

  connectGame(){
    this.webSocket.connectNewGame(this.game?.gameId, this.gameOwner?.name);
  }

  setCurrentPlayer(){
    this.currentPlayer = this.players[this.game.currentTurn];
  }

  clearPlayers(): void {
    this._players = [];
  }

  restoreData(gameId: string):Observable<GameDto> {
    return this.api.findGameById(gameId);

  }

  nextPlayer(): void {
  this.webSocket.nextPlayer(this.game?.gameId);
  }

  get playerTurn(): number {
    return this.game?.currentTurn;
  }

  generateInvitationLink(gameId: string) {
    return this.api.generateInvitationLink(gameId);
  }
}
