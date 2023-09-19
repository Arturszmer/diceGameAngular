import { Injectable } from '@angular/core';
import {MultipleGameDataService} from "./multiple-game-data.service";
import {CountService} from "../../play-single-game/main-table/services/count.service";
import {Dice} from "../../model/dtos";

@Injectable({
  providedIn: 'root'
})
export class MultipleGameDicesService {

  constructor(private dataService: MultipleGameDataService, private countService: CountService) { }

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
