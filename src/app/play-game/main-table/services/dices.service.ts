import { Injectable } from '@angular/core';
import {Dice} from "../../../model/dice";
import {DataService} from "./dataService";
import {CountService} from "./count.service";

@Injectable({
  providedIn: 'root'
})
export class DicesService {

  constructor(private dataService: DataService, private countService: CountService) { }

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
