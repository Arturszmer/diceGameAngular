import { Injectable } from '@angular/core';
import {SingleGameDataService} from "./single-game-data.service";
import {CountService} from "./count.service";
import {Dice} from "../../../model/dtos";

@Injectable({
  providedIn: 'root'
})
export class DicesService {

  constructor(private dataService: SingleGameDataService, private countService: CountService) { }

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

  updatePoints(){
    this.countService.getPoints();
  }

  private sendData() {
    this.countService.countFromDices(this.dataService.diceNumbers);
  }
}
