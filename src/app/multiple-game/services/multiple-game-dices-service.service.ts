import { Injectable } from '@angular/core';
import {Dice} from "../../model/dice";
import {GameDataService} from "./game-data.service";
import {CountService} from "../../play-game/main-table/services/count.service";

@Injectable({
  providedIn: 'root'
})
export class MultipleGameDicesServiceService {

  constructor(private dataService: GameDataService, private countService: CountService) { }

  diceCheck(dice: Dice) {
    if(dice.isMultiple && !dice.isImmutable){
      this.dataService.diceNumbers.filter((d) => d.isMultiple == dice.isMultiple).forEach((value) => {
        value.isChecked = !value.isChecked})
      this.sendData();
    } else if(!dice.isImmutable) {
      dice.isChecked = !dice.isChecked;
      this.sendData()
    }
  }

  private sendData() {
    this.countService.countFromDices(this.dataService.diceNumbers);
  }
}
