import { Component, OnInit } from '@angular/core';
import {Player} from "../../model/player";
import {DataService} from "./services/dataService";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-main-table',
  templateUrl: './main-table.component.html',
  styleUrls: ['./main-table.component.css']
})
export class MainTableComponent implements OnInit {

  players: Player[] = [];
  playerTurn: number = 0;

  constructor(private data: DataService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.players = this.data.getGameData();
    this.playerTurn = this.data.setPlayerTurn();
    this.route.paramMap.subscribe(params => {
      const gameId = params.get('id');
    })
  }

  nextPlayer(turn: number){
    this.playerTurn = turn;
  }

  quit() {
    localStorage.clear();
  }
}
