import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Player } from "../../../model/player";
import { Dice } from "../../../model/dice";
import { playerStorage } from "../player/player.component";

@Injectable({
  providedIn: "root",
})
/**
 * brak konsekwencji przy nazywaniu pol.
 * serwis nazywasz DataService co sugeruje agregacje stanow. jednak sa w nim metody takike jak addPoints()
 *
 * setPlayerTurn i changeTurn czym sie roznia? W main-table.component uzywasz setPlayerTurn a w rollerDice uzywasz changeTurn
 *
 * wczytywanie tury z localStorage masz tu a zapis do localStorge masz w roller-dice.
 */
export class DataService {
  private gamePlayers_: Player[] = [];
  private playerTurn_: number = 0;
  private player_?: Player;
  private _player = new Subject<Player>();
  private _diceNumbers: Dice[] = []; // coś tu nie gra?
  private diceNumbersSource = new Subject<Dice[]>();
  diceNumbers$ = this.diceNumbersSource.asObservable();
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

  // getter
  /**
   * dlatego zawsze zalecam suffixowac prywatne zmienne "_".
   * nie przeszkadza to w wyszukiwaniu zmiennej w intelisense a od razu widac ktora zmienna jest prywatna i
   * mozemy uzyc gettera w formie zapisanej ponizej oraz od razu widac ze jest to wystawienie wartosci do odczytu.
   *
   * get playerTurn(){
   * return this._playerTurn
   * }
   *
   */

  setDiceNumbers(value: Dice[]) {
    this._diceNumbers = value;
    this.diceNumbersSource.next(value);
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

  managePlayerTurn(turn: number) {
    if (this.playerTurn_ === 5) {
      this.loadDataFromLocalStorage();
      this.player = this.gamePlayers_[this.playerTurn]
      this.playerTurn_ = this.loadTurnFromLocalStorage()
      //nie zwracamy przypisania wartosci!!
      //zamiast zwracac przypisane lepiej wystawic playerTurn jako getter (co robisz).
      //w komponencie sobie zrobic getter tego gettera i mamy prosty mechanizm gdzie zawsze dostajemy aktualna wartosc playersTurn
    } else {
      this.playerTurn_ = 0
    }
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
}
