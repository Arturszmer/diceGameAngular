import { Component, OnInit } from '@angular/core';
import {DataService} from "../dataService";
import {Player} from "../../model/player";

@Component({
  selector: 'app-main-table',
  templateUrl: './main-table.component.html',
  styleUrls: ['./main-table.component.css']
})
export class MainTableComponent implements OnInit {

  players: Player[] = [];
  playersTurn = 0;

  constructor(private data: DataService) { }

  ngOnInit(): void {
    this.players = this.data.getGameData()
    console.log('choosen players: ', this.players)
  }

  changeTurn() {
    this.playersTurn++
    if(this.playersTurn == this.players.length){
      this.playersTurn = 0;
    }
  }

}
