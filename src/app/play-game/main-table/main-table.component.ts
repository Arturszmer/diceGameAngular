import { Component, OnInit} from "@angular/core";
import { Player } from "../../model/player";
import { DataService } from "./services/dataService";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-main-table",
  templateUrl: "./main-table.component.html",
  styleUrls: ["./main-table.component.css"],
})
export class MainTableComponent implements OnInit{
  players: Player[] = [];

  constructor(private data: DataService, private route: ActivatedRoute) {}

  get playerTurn(){
    return this.data.playerTurn;
  }

  set playerTurn(turn: number){
    this.data.playerTurn = turn;
  }
  ngOnInit(): void {
    //zaciagasz dane raz i nie ma opcji zeby dane o pkt akutalizowaly sie prawidlowo
    this.players = this.data.gamePlayers;

    //1 tu przypisujesz wartosc z serwisu
    this.playerTurn = this.data.playerTurn;

    this.route.paramMap.subscribe((params) => {
      // niewykorzystne nigdzie gameID
      const gameId = params.get("id");
    });
  }

  clearLocalStorage() {
    localStorage.clear();
  }

}
