import { Injectable } from '@angular/core';
import {Player} from "../model/player";
import {Subject} from "rxjs";
import {Dices} from "../model/dices";


@Injectable({
  providedIn: 'root'
})
export class DataService {
  private gameData: Player[] = [];
  private _diceNumbers: Dices[] = [];
  private diceNumbersSource = new Subject<Dices[]>();
  diceNumbers$ = this.diceNumbersSource.asObservable();

  constructor() {}

  setGameData(data: Player[]) {
    this.gameData = data;
  }

  getGameData() {
    return this.gameData;
  }


  getDiceNumbers(): Dices[] {
    return this._diceNumbers;
  }

  setDiceNumbers(value: Dices[]) {
    this._diceNumbers = value;
    this.diceNumbersSource.next(value);
  }
}
