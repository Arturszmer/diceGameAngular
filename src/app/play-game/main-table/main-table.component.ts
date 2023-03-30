import { Component, OnInit } from '@angular/core';
import {Player} from "../../model/player";
import {DataService} from "./services/dataService";

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
    console.log('choosen players: ', this.players)
  }

  changeTurn() {
    this.playerTurn++
    if(this.playerTurn == this.players.length){
      this.playerTurn = 0;
    }
    this.data.setPlayerTurn(this.playerTurn);

  }

}
