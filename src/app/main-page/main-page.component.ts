import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Player } from "../model/player";
import { DataService } from "../play-game/main-table/services/dataService";

/**
 * - brakuje walidacji co do unikalnosci nazw graczy.
 * - tworzenie i przechowywanie danych graczy powinno odbywac sie w serwisie
 */
@Component({
  selector: "app-main-page",
  templateUrl: "./main-page.component.html",
  styleUrls: ["./main-page.component.css"],
})
export class MainPageComponent implements OnInit {
  numPlayers: number = 2;
  playersArray: number[] = new Array(this.numPlayers)
    .fill(0)
    .map((x, i) => i + 1);
  players: Player[] = [];

  invalidName: boolean = false;
  names: string[] = ["", "", "", ""];
  uniqueId: string = this.generateUniqueId();

  constructor(private router: Router, private data: DataService) {}

  ngOnInit(): void {
    this.numPlayers = 2;
  }

  updatePlayersArray() {
    // w js jest przyjęta konwencja, że gdy nie używamy jakiegoś argumentu ale jest zdeklarowany to wpisujemy go jako "_"
    // za kazdym razem tworzysz nowa metode. po wywolaniu tej metody wpisane juz imiona zostana usuniete. bad ux.
    // zamist tworzyc ciagle nowe tablice powinienes dodawc usuwac odpowiednia ilosc elementow.
    this.playersArray = new Array(this.numPlayers).fill(0).map((x, i) => i + 1);
  }

  onSubmit() {
    /**
     * to manulane iterownie przy uzyciu reactive forms w ogole by nie zachodzilo,
     * bo byś mial mozliwosc sprawdzenia poprawnosci calego formularza.
     *
     * ale co mozemy zrobic z tym podejsciem ktore tu zastosowales:
     *  - możesz stworzyc w html w <form ngForm="form"> co pozwoli zagregowac wszystkie ngModele z
     *    tego formularza w jedno i tez uzyc przeznaczonych do walidacji metod w celu sprawdzenia poprwanosci danych.
     *    https://angular.io/guide/forms
     *  -
     */

    //jesli juz mamy taki zapis walidacji etc. to ten for bym wyciagnal do osobnej metody
    for (let i = 1; i <= this.numPlayers; i++) {
      const playerName = (
        document.getElementById(`player${i}`) as HTMLInputElement
      ).value;
      if (playerName.length <= 3) {
        //nieprawidlowe uzycie throw https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/throw
        throw (this.invalidName = true);
      }
      // to tez bym wyciagnal do osobnej opisanej metody
      this.players.push({ id: i, name: playerName, points: 0 });
      // this.players.push({id: i, name: playerName, points: 1000});
    }
    this.data.setGameData(this.players);
    /**
     *  osobna metoda. i to w niej by mdal generowanie uniqueId.
     *  Wtedy spokojnie moze to byc zmienna istniejaca tylko w scope metody
     *  zamiast w scope calego komponentu.
     */
    this.router.navigate(["/game", this.uniqueId]);
  }

  // nieuzywana metoda
  playerNameValid(index: number): boolean {
    return this.players[index] && this.players[index].name.length >= 3;
  }

  // nieuzywana metoda
  playerNameInvalid(index: number) {
    return this.invalidName && !this.playerNameValid(index);
  }

  // metoda powinna byc prywatna. uzywana jest tylko wewnatrz komponentu
  generateUniqueId() {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < 8; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}
