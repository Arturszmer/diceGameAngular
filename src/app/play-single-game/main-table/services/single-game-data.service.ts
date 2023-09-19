import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { PlayerDto } from "../../../model/playerDto";
import { playerStorage } from "../player/player.component";
import {Dice} from "../../../model/dtos";
import {GameDataService} from "../../../service-interfaces/data-service";

@Injectable({
  providedIn: "root",
})
export class SingleGameDataService extends GameDataService{

  private _player_ = new Subject<PlayerDto>();
  _players: PlayerDto[] = []
  playerTurn_: number = 0;
  _player!: PlayerDto;
  diceNumbers_: Dice[] = [];

  constructor() {
    super();
  }

  setGamePlayers(players: PlayerDto[]) {
    this._players = players;
    this._player = players[this.playerTurn]
    this.saveGameDataToLocalStorage();
  }

  get players() {
    if (this._players.length === 0) {
      this.loadDataFromLocalStorage();
    }
    return this._players;
  }

  private saveGameDataToLocalStorage(){
    localStorage.setItem("players", JSON.stringify(this._players.length));
    this._players.forEach((player) => {
      localStorage.setItem(playerStorage(player.id), JSON.stringify(player))
    });
  }

  set diceNumbers(dices: Dice[]) {
    this.diceNumbers_ = dices;
  }

  get diceNumbers() {
    return this.diceNumbers_;
  }

  get player_() {
    return this._players[this.playerTurn];
  }
  set player(player: PlayerDto) {
    this._player = player;
  }
  get playerTurn(): number {
    return this.playerTurn_;
  }

  nextPlayer(playerTurn: number){
    this._player = this._players[playerTurn];
  }

  set playerTurn(playerTurn: number){
    this.playerTurn_ = playerTurn;
  }

  changeTurn(): number {
    this.playerTurn = this.playerTurn_ + 1;
    if (this.playerTurn_ == this._players.length) {
      this.playerTurn_ = 0;
    }
    return this.playerTurn_;
  }

  addPoints(points: number) {
    this.player_!.points += points;
    localStorage.setItem(
      playerStorage(this.player_?.id!),
      JSON.stringify({
        id: this.player_!.id,
        name: this.player_!.name,
        points: this.player_!.points,
      })
    );
    this._player_.next(this.player_!);
  }

  loadDataFromLocalStorage() {
    const players = Number.parseInt(localStorage.getItem("players") || "0");
    if (players !== 0) {
      for (let i = 1; i <= players; i++) {
        let parse = JSON.parse(localStorage.getItem(playerStorage(i)) || "");
        this._players.push(parse);
      }
    }
  }
  loadTurnFromLocalStorage(): number {
    return Number.parseInt(localStorage.getItem("turn") || "0");
  }

  diceCheck() {
    // this.dicesService.diceCheck(this.diceNumbers)
  }
}
