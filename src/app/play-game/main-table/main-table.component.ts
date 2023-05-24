import { Component, OnInit } from "@angular/core";
import { Player } from "../../model/player";
import { DataService } from "./services/dataService";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-main-table",
  templateUrl: "./main-table.component.html",
  styleUrls: ["./main-table.component.css"],
})
export class MainTableComponent implements OnInit {
  players: Player[] = [];
  playerTurn: number = 0;

  constructor(private data: DataService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    //zaciagasz dane raz i nie ma opcji zeby dane o pkt akutalizowaly sie prawidlowo
    this.players = this.data.getGameData();
    //1 tu przypisujesz wartosc z serwisu
    this.playerTurn = this.data.setPlayerTurn();
    this.route.paramMap.subscribe((params) => {
      // niewykorzystne nigdzie gameID
      const gameId = params.get("id");
    });
  }

  nextPlayer(turn: number) {
    //2 a tu ja przeslaniasz i cala synchronizacja danych idzie w piach
    this.playerTurn = turn;
  }

  // mylna nazwa metody. bardziej clearLocalSotrage
  quit() {
    localStorage.clear();
  }
}
