import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {Player} from "../player";
import {DataService} from "../play-game/dataService";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  numPlayers: number = 2;
  playersArray: number[] = new Array(this.numPlayers).fill(0).map((x, i) => i + 1)

  constructor(private router: Router, private data: DataService) { }

  ngOnInit(): void {
    this.numPlayers = 2;
  }

  updatePlayersArray() {
    this.playersArray = new Array(this.numPlayers).fill(0).map((x, i) => i + 1)
  }

  onSubmit() {
    const players: Player[] = [];
    for (let i = 1; i <= this.numPlayers; i++) {
      const playerName = (document.getElementById(`player${i}`) as HTMLInputElement).value;
      players.push({id: i, name: playerName});
    }
    this.data.setGameData(players);
    this.router.navigate(['/game']);
  }
}
