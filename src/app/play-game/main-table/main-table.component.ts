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
  subscriptionPlayer?: Subscription;


  constructor(private data: DataService) { }

  ngOnInit(): void {
    this.players = this.data.getGameData();
    this.data.setPlayerTurn(this.playerTurn);
    console.log('choosen players: ', this.players)
    this.subscriptionPlayer = this.data.player$.subscribe(
      (player) => {
        this.players[this.playerTurn].points = player.points;
      }
    )
  }

  nextPlayer(turn: number){
    this.playerTurn = turn;
  }

  playerPoints(points: number) {
    this.players[this.playerTurn].points = points;
  }
}
