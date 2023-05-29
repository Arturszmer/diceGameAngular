import { Component, OnInit} from "@angular/core";
import { Player } from "../../model/player";
import { DataService } from "./services/dataService";
import { ActivatedRoute } from "@angular/router";
import {DicesService} from "./services/dices.service";

@Component({
  selector: "app-main-table",
  templateUrl: "./main-table.component.html",
  styleUrls: ["./main-table.component.css"],
})
export class MainTableComponent implements OnInit{
  players: Player[] = [];

  constructor(private data: DataService, private dicesService: DicesService, private route: ActivatedRoute) {}

  get playerTurn(){
    return this.data.playerTurn;
  }

  get diceNumbers(){
    return this.data.diceNumbers;
  }

  get playerPoints(){
    return this.data.player.points;
  }

  set playerTurn(turn: number){
    this.data.playerTurn = turn;
  }
  ngOnInit(): void {
    this.players = this.data.gamePlayers;
    this.playerTurn = this.data.playerTurn;

    this.route.paramMap.subscribe((params) => {
      const gameId = params.get("id");
    });
  }

  clearLocalStorage() {
    localStorage.clear();
  }

  diceCheck(index: number){
    this.dicesService.diceCheck(this.diceNumbers[index])
  }

}
