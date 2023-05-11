import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {Player} from "../../../model/player";
import {Dice} from "../../../model/dice";
import {playerStorage} from "../player/player.component";

export const localPlayers: string = 'playersNumber'
export const localDices: string = 'dices';
export const localValidations: string = 'validations';
export const localPoints: string = 'points';
export const localHandlePoints: string = 'handlePoints';
export const localTurn: string = 'turn';

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
  private flagLocal = false;

  constructor() {}

  setFlagLocal(flag: boolean): void {
    this.flagLocal = flag;
  }
  getFlagLocal(): boolean {
    return this.flagLocal;
  }

  setGameData(data: Player[]): void {
    this.gamePlayers = data;
    localStorage.setItem(localPlayers, JSON.stringify(data.length))
    this.gamePlayers.forEach(player => {
      const playerData = {
        id: player.id,
        name: player.name,
        points: player.points
      }
      localStorage.setItem(playerStorage(player.id), JSON.stringify(playerData))
    })
  }

  getGameData(): Player[] {
    if(this.gamePlayers.length === 0){
      this.loadDataFromLocalStorage();
    }
    return this.gamePlayers;
  }

  getPlayerTurn(): number {
    return this.playerTurn;
  }

  getDiceNumbers(): Dice[] {
    return this._diceNumbers;
  }

  setDiceNumbers(value: Dice[]): void {
    if (value.length === 0){
      this._diceNumbers = JSON.parse(localStorage.getItem(localDices) || '[]');
    } else {
      localStorage.setItem(localDices, JSON.stringify(value));
      this._diceNumbers = value;
      this.diceNumbersSource.next(value);
    }
  }

  getPlayer(): Player {
    return this.gamePlayers[this.playerTurn];
  }

  setPlayer(turn: number){
    this.player = this.gamePlayers[turn];
  }

  managePlayerTurn(): number {
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

  addPoints(points: number): void{
    this.player!.points += points;
    localStorage.setItem(playerStorage(this.player?.id!), JSON.stringify({
      id: this.player!.id,
      name: this.player!.name,
      points: this.player!.points
    }));
    this._player.next(this.player!);
  }

  loadDataFromLocalStorage(): void {
    this.setFlagLocal(true)
    const players = Number.parseInt(localStorage.getItem(localPlayers) || "0" );
    if(this.getFlagLocal()) {
      for (let i = 1; i <= players; i++){
        let parse = JSON.parse(localStorage.getItem(playerStorage(i)) || '');
        this.gamePlayers.push(parse);
      }
    }

  }
  loadTurnFromLocalStorage(): number {

    return Number.parseInt(localStorage.getItem(localTurn) || '0');
  }
}
