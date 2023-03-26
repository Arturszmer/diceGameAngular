import { Component, OnInit } from '@angular/core';
import {DataService} from "../dataService";
import {Player} from "../../player";

@Component({
  selector: 'app-main-table',
  templateUrl: './main-table.component.html',
  styleUrls: ['./main-table.component.css']
})
export class MainTableComponent implements OnInit {

  players: Player[] = [];

  constructor(private data: DataService) { }

  ngOnInit(): void {
    this.players = this.data.getGameData()
    console.log('choosen players: ', this.players)
  }

}
