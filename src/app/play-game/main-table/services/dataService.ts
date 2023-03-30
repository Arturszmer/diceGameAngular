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
    let player = this.gamePlayers[this.playerTurn];
    return this.player = player;
  }

  setPlayerTurn(turn: number) {
    return this.playerTurn = turn;
  }
}
