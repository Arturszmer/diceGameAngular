import { Component, OnInit } from '@angular/core';
import {Player} from "../../model/player";
import {DataService} from "./services/dataService";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-main-table',
  templateUrl: './main-table.component.html',
  styleUrls: ['./main-table.component.css']
})
export class MainTableComponent implements OnInit {

  players: Player[] = [];
  playerTurn = 0;

  constructor(private data: DataService) { }

  ngOnInit(): void {
    this.players = this.data.getGameData();
    this.data.setPlayerTurn(this.playerTurn);
  }

  nextPlayer(turn: number){
    this.playerTurn = turn;
  }

}
