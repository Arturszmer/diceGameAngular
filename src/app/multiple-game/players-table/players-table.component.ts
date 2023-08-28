import {Component, OnInit} from '@angular/core';
import {GameDataService} from "../services/game-data.service";
import {Dice} from "../../model/dice";
import {mockDiceRoll} from "../../model/mock-models";
import {MultipleGameDicesServiceService} from "../services/multiple-game-dices-service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-players-table',
  templateUrl: './players-table.component.html',
  styleUrls: ['./players-table.component.css']
})
export class PlayersTableComponent implements OnInit {

  diceNumbers: Dice[] = mockDiceRoll;

  constructor(private gameDataService: GameDataService,
              private diceService: MultipleGameDicesServiceService,
              private router: Router) { }


  ngOnInit(): void {
    this.gameDataService.restoreData();
  }

  get players(){
    return this.gameDataService.players;
  }

  get game(){
    return this.gameDataService.game;
  }

  get currentTurn(){
    return this.gameDataService.game.currentTurn;
  }
  get points(){
    return this.gameDataService.currentPlayerPoints;
  }

  diceCheck(index: number){
    this.diceService.diceCheck(this.diceNumbers[index]);
  }

    quit() {
        this.gameDataService.clearPlayers();
        localStorage.clear();
        this.router.navigate([""]);
    }
}
