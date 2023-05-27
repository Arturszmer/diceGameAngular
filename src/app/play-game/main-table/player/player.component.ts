import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Dice} from "../../../model/dice";
import {DataService} from "../services/dataService";
import {CountService} from "../services/count.service";

export const playerStorage = (id: number) => `player_${id}`

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

  points: number = 0;
  @Output() takePoints = new EventEmitter<number>()

  constructor(private dataService: DataService, private countService: CountService ) { }

  get diceNumbers(){
    return this.dataService.diceNumbers;
  }
  set diceNumbers(dices: Dice[]){
    this.dataService.diceNumbers = dices;
  }
  ngOnInit(): void {
    this.countService.countFromRoll(this.diceNumbers);
    this.diceNumbers = this.dataService.diceNumbers;
  }

  diceCheck(index: number, dice: Dice) {
    if(dice.isMultiple && !dice.isImmutable){
      this.diceNumbers.filter((d) => d.isMultiple == dice.isMultiple).forEach((value) => {
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
    this.countService.countFromDices(this.diceNumbers);
    this.updatePoints();
  }
}
