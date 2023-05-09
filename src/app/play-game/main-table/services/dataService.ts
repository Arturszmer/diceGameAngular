import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {Player} from "../../../model/player";
import {Dice} from "../../../model/dice";
import {playerStorage} from "../player/player.component";

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
    this._diceNumbers = value;
    this.diceNumbersSource.next(value);
  }

  getPlayer() {
    return this.gamePlayers[this.playerTurn];
  }

  setPlayer(turn: number){
    this.player = this.gamePlayers[turn];
  }

  setPlayerTurn() {
    if (this.playerTurn === 5){
      this.setPlayer(this.loadTurnFromLocalStorage())
      return this.playerTurn = this.loadTurnFromLocalStorage();
    }
    this.setPlayer(0)
    return this.playerTurn = 0;
  }

  changeTurn(): number{
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
    const players = Number.parseInt(localStorage.getItem('players') || "0" );
    if(players !== 0) {
      for (let i = 1; i <= players; i++){
        let parse = JSON.parse(localStorage.getItem(playerStorage(i)) || '');
        this.gamePlayers.push(parse);
      }
    }

  }
  loadTurnFromLocalStorage(): number {

    return Number.parseInt(localStorage.getItem('turn') || '0');
  }

}
