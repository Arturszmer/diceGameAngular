import { Injectable } from '@angular/core';
import {MultipleGameDataService} from "./multiple-game-data.service";
import {CountService} from "../../play-single-game/main-table/services/count.service";
import {Dice} from "../../model/dtos";
import {ApiService} from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class MultipleGameDicesService {

  private diceNumbers_: Dice[] = [];

  get diceNumbers(): Dice[] {
    return this.diceNumbers_;
  }

  set diceNumbers(dices: Dice[]){
    this.diceNumbers_ = dices;
  }

  constructor(private dataService: MultipleGameDataService, private countService: CountService, private api: ApiService) { }

  rollDices() {
    let numberOfDicesToRoll;
    if(this.diceNumbers_.length === 0){
      numberOfDicesToRoll = 5;
    } else {
      numberOfDicesToRoll = this.diceNumbers_.filter(f => f.isChecked).length;
    }
    this.api.rollDices(numberOfDicesToRoll).subscribe(result => {
      console.log(result, ' --> zwrotka z BE');
      this.diceNumbers = result;
    });
  }

  diceCheck(dice: Dice) {
    if(dice.isMultiple && !dice.isImmutable){
      this.diceNumbers_.filter((d) => d.isMultiple == dice.isMultiple).forEach((value) => {
        value.isChecked = !value.isChecked})
      this.sendData();
    } else if(!dice.isImmutable) {
      dice.isChecked = !dice.isChecked;
      this.sendData()
    }
  }

  private sendData() {
    this.countService.countFromDices(this.diceNumbers);
  }
}
