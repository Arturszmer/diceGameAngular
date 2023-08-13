import { Component, OnInit } from '@angular/core';
import {GameDataService} from "../services/game-data.service";
import {Dice} from "../../model/dice";
import {mockDiceRoll} from "../../model/mock-models";
import {DicesService} from "../../play-game/main-table/services/dices.service";
import {MultipleGameDicesServiceService} from "../services/multiple-game-dices-service.service";

@Component({
  selector: 'app-players-table',
  templateUrl: './players-table.component.html',
  styleUrls: ['./players-table.component.css']
})
export class PlayersTableComponent implements OnInit {

  diceNumbers: Dice[] = mockDiceRoll;

  constructor(private dataService: GameDataService, private diceService: MultipleGameDicesServiceService) { }


  ngOnInit(): void {
  }

  get players(){
    return this.dataService.players;
  }

  get game(){
    return this.dataService.game;
  }

  get currentTurn(){
    return this.dataService.game.currentTurn;
  }
  get points(){
    return this.dataService.currentPlayerPoints;
  }

  diceCheck(index: number){
    this.diceService.diceCheck(this.diceNumbers[index]);
  }

}
