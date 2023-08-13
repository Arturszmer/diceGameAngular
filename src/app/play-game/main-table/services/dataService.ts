import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Player } from "../../../model/player";
import { Dice } from "../../../model/dice";
import { playerStorage } from "../player/player.component";

@Injectable({
  providedIn: "root",
})
export class DataService {
  private gamePlayers_: Player[] = [];
  private playerTurn_: number = 0;
  private player_?: Player;
  private _player = new Subject<Player>();
  private diceNumbers_: Dice[] = [];
  constructor() {}

  setGamePlayers(players: Player[]) {
    this.gamePlayers_ = players;
    this.player = players[this.playerTurn]
    this.saveGameDataToLocalStorage();
  }

  get gamePlayers() {
    if (this.gamePlayers_.length === 0) {
      this.loadDataFromLocalStorage();
    }
    return this.gamePlayers_;
  }

  private saveGameDataToLocalStorage(){
    localStorage.setItem("players", JSON.stringify(this.gamePlayers_.length));
    this.gamePlayers_.forEach((player) => {
      localStorage.setItem(playerStorage(player.id), JSON.stringify(player))
    });
  }

  set diceNumbers(dices: Dice[]) {
    this.diceNumbers_ = dices;
  }

  get diceNumbers(){
    return this.diceNumbers_;
  }

  get player() {
    return this.gamePlayers_[this.playerTurn];
  }
  set player(player: Player) {
    this.player_ = player;
  }
  get playerTurn() {
    return this.playerTurn_;
  }

  nextPlayer(playerTurn: number){
    this.player = this.gamePlayers_[playerTurn];
  }

  set playerTurn(playerTurn: number){
    this.playerTurn_ = playerTurn;
  }

  changeTurn(): number {
    this.playerTurn = this.playerTurn_ + 1;
    if (this.playerTurn_ == this.gamePlayers_.length) {
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
    this._player.next(this.player_!);
  }

  loadDataFromLocalStorage() {
    const players = Number.parseInt(localStorage.getItem("players") || "0");
    if (players !== 0) {
      for (let i = 1; i <= players; i++) {
        let parse = JSON.parse(localStorage.getItem(playerStorage(i)) || "");
        this.gamePlayers_.push(parse);
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
