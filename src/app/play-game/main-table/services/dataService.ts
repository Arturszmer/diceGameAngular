import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {Player} from "../../../model/player";
import {Dice} from "../../../model/dice";


@Injectable({
  providedIn: 'root'
})
export class DataService {
  private gamePlayers: Player[] = [];
  private playerTurn: number = 0;
  private player?: Player;
  private _player = new Subject<Player>();
  player$ = this._player.asObservable();
  private _diceNumbers: Dice[] = [];
  private diceNumbersSource = new Subject<Dice[]>();
  diceNumbers$ = this.diceNumbersSource.asObservable();

  constructor() {}

  setGameData(data: Player[]) {
    this.gamePlayers = data;
  }

  getGameData() {
    return this.gamePlayers;
  }


  getDiceNumbers(): Dice[] {
    return this._diceNumbers;
  }

  setDiceNumbers(value: Dice[]) {
    this._diceNumbers = value;
    this.diceNumbersSource.next(value);
  }

  getPlayer() {
    return this.gamePlayers[this.playerTurn];
  }

  setPlayer(turn: number){
    this.player = this.gamePlayers[turn];
  }

  setPlayerTurn(turn: number) {
    this.setPlayer(turn)
    return this.playerTurn = turn;
  }

  chaneTurn(): number{
    this.playerTurn++
    if(this.playerTurn == this.gamePlayers.length){
      this.playerTurn = 0;
    }
    console.log(this.playerTurn, 'change turn')

    return this.playerTurn;
  }

  addPoints(points: number){
      this.player!.points += points;
    console.log(this.player!, ' || ', this._player ,'addPoints')
      this._player.next(this.player!)
  }
}
