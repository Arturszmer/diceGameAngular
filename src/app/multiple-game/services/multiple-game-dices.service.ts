import {Injectable} from '@angular/core';
import {MultipleGameDataService} from "./multiple-game-data.service";
import {CountService} from "../../play-single-game/main-table/services/count.service";
import {Dice, RollDto} from "../../model/dtos";
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
    this.api.rollDices(this.prepareDataToBE()).subscribe(response => {
      console.log(response, ' --> zwrotka z BE');
      this.diceNumbers = response.dices;
      this.dataService.player = response.player;
    });
  }

  diceCheck(dice: Dice) {
    if(dice.isMultiple && !dice.isImmutable){
      this.diceNumbers_.filter((d) => d.isMultiple == dice.isMultiple).forEach((value) => {
        value.isChecked = !value.isChecked})
      this.sendData();
      this.refreshDataFromApi();
    } else if (!dice.isImmutable) {
      dice.isChecked = !dice.isChecked;
      this.sendData()
      this.refreshDataFromApi();
    }
    console.log(this.diceNumbers_, '---> kostki z serwisu')
  }

  private refreshDataFromApi() {
    this.api.diceCheck(this.prepareDataToBE()).subscribe(response => {
      this.diceNumbers = response.dices;
      this.dataService.player = response.player;
    });
  }

  private sendData() {
    this.countService.countFromDices(this.diceNumbers);
  }

  private prepareDataToBE(): RollDto {
    return {
      dices: this.diceNumbers_,
      gameId: this.dataService.game.gameId
    };
  }

}
