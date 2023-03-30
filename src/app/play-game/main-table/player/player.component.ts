import {Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {Dice} from "../../../model/dice";
import {count} from "../diceLogic/count";
import {DataService} from "../services/dataService";
import {CountService} from "../services/count.service";

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

  diceNumbers: Dice[] = [];
  subscriptionDices?: Subscription;
  points: number = 0;

  constructor(private dataService: DataService, private countService: CountService ) { }

  ngOnInit(): void {
    this.subscriptionDices = this.dataService.diceNumbers$.subscribe(
      (diceNumbers) => {
        this.diceNumbers = diceNumbers;
        console.log(this.diceNumbers, 'PLAYER COMPONENT DICES');
      }
    );
  }

  ngOnDestroy(): void {
    this.subscriptionDices?.unsubscribe();
  }

  diceCheck(index: number, dice: Dice) {
    if(dice.isMultiple){
      this.diceNumbers.filter((d) => d.isMultiple == dice.isMultiple).forEach((value) => {
      value.isChecked = !value.isChecked})
      // console.log(this.diceNumbers, ' MULTIPLE? ')
      this.sendData();
    } else {
      dice.isChecked = !dice.isChecked;
      // console.log(index, dice, ' CHECK');
      this.sendData()
    }
  }

  updatePoints(){
    this.countService.getPoints();
  }

  updateDices(){
    this.dataService.setDiceNumbers(this.diceNumbers);
  }
  private sendData() {
    this.countService.countFromDices(this.diceNumbers);
    this.updatePoints();
    this.updateDices();
  }
}