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
  private gamePlayers: Player[] = [];
  private playerTurn: number = 5;
  private player?: Player;
  private _player = new Subject<Player>();
  player$ = this._player.asObservable(); //nieuzywne
  private _diceNumbers: Dice[] = [];
  private diceNumbersSource = new Subject<Dice[]>();
  diceNumbers$ = this.diceNumbersSource.asObservable();
  constructor() {}

  // malo opisowy argument
  setGameData(data: Player[]) {
    this.gamePlayers = data;

    // to bym wyniosl do metody saveGameDataToLocalStorage
    localStorage.setItem("players", JSON.stringify(data.length));
    this.gamePlayers.forEach((player) => {
      //nic to nie wnosi. nie robisz tu zadnego mapowania
      const playerData = {
        id: player.id,
        name: player.name,
        points: player.points,
      };
      // rownie dobrze tu mozna zapisac to
      // localStorage.setItem(playerStorage(player.id), JSON.stringify(player))
      localStorage.setItem(
        playerStorage(player.id),
        JSON.stringify(playerData)
      );
    });
  }

  getGameData() {
    if (this.gamePlayers.length === 0) {
      this.loadDataFromLocalStorage();
    }
    return this.gamePlayers;
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
  getPlayerTurn() {
    return this.playerTurn;
  }

  // getter
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

  setPlayer(turn: number) {
    this.player = this.gamePlayers[turn];
  }

  setPlayerTurn() {
    if (this.playerTurn === 5) {
      this.setPlayer(this.loadTurnFromLocalStorage());
      //nie zwracamy przypisania wartosci!!
      //zamiast zwracac przypisane lepiej wystawic playerTurn jako getter (co robisz). 
      //w komponencie sobie zrobic getter tego gettera i mamy prosty mechanizm gdzie zawsze dostajemy aktualna wartosc playersTurn
      return (this.playerTurn = this.loadTurnFromLocalStorage());
    }
    this.setPlayer(0);
    return (this.playerTurn = 0);
  }

  changeTurn(): number {
    this.playerTurn++;
    if (this.playerTurn == this.gamePlayers.length) {
      this.playerTurn = 0;
    }
    return this.playerTurn;
  }

  addPoints(points: number) {
    this.player!.points += points;
    localStorage.setItem(
      playerStorage(this.player?.id!),
      JSON.stringify({
        id: this.player!.id,
        name: this.player!.name,
        points: this.player!.points,
      })
    );
    console.log(
      JSON.parse(localStorage.getItem(playerStorage(this.player?.id!)) || "")
    );
    this._player.next(this.player!);
  }

  loadDataFromLocalStorage() {
    const players = Number.parseInt(localStorage.getItem("players") || "0");
    if (players !== 0) {
      for (let i = 1; i <= players; i++) {
        let parse = JSON.parse(localStorage.getItem(playerStorage(i)) || "");
        this.gamePlayers.push(parse);
      }
    }
  }
  loadTurnFromLocalStorage(): number {
    return Number.parseInt(localStorage.getItem("turn") || "0");
  }
}
