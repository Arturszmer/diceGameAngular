import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {Player} from "../../../model/player";
import {Dice} from "../../../model/dice";
import {playerStorage} from "../player/player.component";
import {localDices} from "../roller-dice/roller-dice.component";

export let flagLocal = false;

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private gamePlayers: Player[] = [];
  private playerTurn: number = 5;
  private player?: Player;
  private _player = new Subject<Player>();
  player$ = this._player.asObservable();
  private _diceNumbers: Dice[] = [];
  private diceNumbersSource = new Subject<Dice[]>();
  diceNumbers$ = this.diceNumbersSource.asObservable();
  constructor() {}

  setGameData(data: Player[]) {
    this.gamePlayers = data;
    localStorage.setItem('players', JSON.stringify(data.length))
    this.gamePlayers.forEach(player => {
      const playerData = {
        id: player.id,
        name: player.name,
        points: player.points
      }
      localStorage.setItem(playerStorage(player.id), JSON.stringify(playerData))
    })
  }

  getGameData() {
    if(this.gamePlayers.length === 0){
      this.loadDataFromLocalStorage();
    }
    return this.gamePlayers;
  }

  getPlayerTurn(){
    return this.playerTurn;
  }

  getDiceNumbers(): Dice[] {
    return this._diceNumbers;
  }

  setDiceNumbers(value: Dice[]) {
    console.log(value.length, ' VALUE')
    if (value.length === 0){
      console.log(' into ')
      this._diceNumbers = JSON.parse(localStorage.getItem(localDices) || '[]');
      // console.log('_dice ', this._diceNumbers)
      // this.diceNumbersSource.next(JSON.parse(localStorage.getItem(localDices) || ''));
      // this._diceNumbers = [diceOne, diceOne, diceOne, diceOne, diceOne];
      // console.log(this._diceNumbers, ' DICE NUMBER _')
      // this.diceNumbersSource.next([diceOne, diceOne, diceOne, diceOne, diceOne] );
    } else {
      localStorage.setItem(localDices, JSON.stringify(value));
      this._diceNumbers = value;
      this.diceNumbersSource.next(value);
    }
  }

  getPlayer() {
    return this.gamePlayers[this.playerTurn];
  }

  setPlayer(turn: number){
    this.player = this.gamePlayers[turn];
  }

  managePlayerTurn() {
    if (this.playerTurn === 5){
      this.setPlayer(this.loadTurnFromLocalStorage())
      this.setDiceNumbers([]);
      return this.playerTurn = this.loadTurnFromLocalStorage();
    }
    this._diceNumbers = [];
    this.setPlayer(0)
    return this.playerTurn = 0;
  }

  changeTurn(): number{
    this._diceNumbers = [];
    this.playerTurn++
    if(this.playerTurn == this.gamePlayers.length){
      this.playerTurn = 0;
    }
    return this.playerTurn;
  }

  addPoints(points: number){
    this.player!.points += points;
    localStorage.setItem(playerStorage(this.player?.id!), JSON.stringify({
      id: this.player!.id,
      name: this.player!.name,
      points: this.player!.points
    }));
    console.log(JSON.parse(localStorage.getItem(playerStorage(this.player?.id!)) || ''))
    this._player.next(this.player!);
  }

  loadDataFromLocalStorage() {
    console.log(flagLocal, 'loadDataFromLocalStorage')
    flagLocal = true;
    const players = Number.parseInt(localStorage.getItem('players') || "0" );
    if(flagLocal) {
      for (let i = 1; i <= players; i++){
        let parse = JSON.parse(localStorage.getItem(playerStorage(i)) || '');
        this.gamePlayers.push(parse);
      }
    }

  }
  loadTurnFromLocalStorage(): number {

    return Number.parseInt(localStorage.getItem('turn') || '0');
  }

  setFlag(flag: boolean) {
    flagLocal = flag;
  }
}
