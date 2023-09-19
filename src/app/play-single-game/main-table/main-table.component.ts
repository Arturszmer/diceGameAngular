import { Component, OnInit} from "@angular/core";
import { PlayerDto } from "../../model/playerDto";
import { SingleGameDataService } from "./services/single-game-data.service";
import { ActivatedRoute } from "@angular/router";
import {DicesService} from "./services/dices.service";

@Component({
  selector: "app-main-table",
  templateUrl: "./main-table.component.html",
  styleUrls: ["./main-table.component.css"],
})
export class MainTableComponent implements OnInit{
  players: PlayerDto[] = [];

  constructor(private dataService: SingleGameDataService, private dicesService: DicesService, private route: ActivatedRoute) {}

  get playerTurn(){
    return this.dataService.playerTurn;
  }

  get diceNumbers(){
    return this.dataService.diceNumbers;
  }

  get playerPoints(){
    return this.dataService.player_.points;
  }

  set playerTurn(turn: number){
    this.dataService.playerTurn = turn;
  }
  ngOnInit(): void {
    this.players = this.dataService.players;
    this.playerTurn = this.dataService.playerTurn;

    this.route.paramMap.subscribe((params) => {
      const gameId = params.get("id");
    });
  }

  //TODO: dopracować localstorage (trochę się rozjechało)
  clearLocalStorage() {
    localStorage.clear();
  }

  diceCheck(index: number){
    this.dicesService.diceCheck(this.diceNumbers[index])
  }

}
