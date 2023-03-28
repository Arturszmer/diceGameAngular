import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {DataService} from "../play-game/dataService";
import {Player} from "../model/player";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  numPlayers: number = 2;
  playersArray: number[] = new Array(this.numPlayers).fill(0).map((x, i) => i + 1)
  players: Player[] = [];
  invalidName: boolean = false;
  names: string[] = ['', '', '', ''];

  constructor(private router: Router, private data: DataService) { }

  ngOnInit(): void {
    this.numPlayers = 2;
  }

  updatePlayersArray() {
    this.playersArray = new Array(this.numPlayers).fill(0).map((x, i) => i + 1)
  }

  onSubmit() {
    for (let i = 1; i <= this.numPlayers; i++) {
      const playerName = (document.getElementById(`player${i}`) as HTMLInputElement).value;
      if(playerName.length <= 3){
        throw this.invalidName = true;
      }
      this.players.push({id: i, name: playerName, points: 0});
    }
    this.data.setGameData(this.players);
    this.router.navigate(['/game']);
  }

  playerNameValid(index: number): boolean {
    return (this.players[index] && this.players[index].name.length >= 3);
  }

  playerNameInvalid(index: number) {
    return this.invalidName && !this.playerNameValid(index);
  }
}
