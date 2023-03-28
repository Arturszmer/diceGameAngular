import { Component, OnInit } from '@angular/core';
import {rollDice} from "../diceLogic/throwingDice";
import {checkMultipleNumbers, checkGoodNumbers} from "../diceLogic/validators"
import {DataService} from "../../dataService";
import {Dices} from "../../../model/dices";

@Component({
  selector: 'app-roller-dice',
  templateUrl: './roller-dice.component.html',
  styleUrls: ['./roller-dice.component.css']
})
export class RollerDiceComponent implements OnInit {

  dices: Dices[] = [];
  isClicked: boolean = false;
  handleDices: Dices[] = [];

  constructor(private service: DataService) { }

  ngOnInit(): void {
  }

  diceThrow() {
    this.isClicked = true;
    let something = this.dices.filter(f => f.isImmutable)
    console.log(something, 'before throw dices')
    let result = this.toRollDice(something);
    this.insertDataIntoDices(result, this.handleDices);
    this.service.setDiceNumbers(this.dices);
    setTimeout(() => {
      this.isClicked = false
    }, 150);
  }

  insertDataIntoDices(numbers: number[], dicesToPush: Dices[]){
    console.log(dicesToPush, 'DICE TO PUSH')
    this.dices = [];
    for (let i = 0; i < numbers.length; i++){
      dicesToPush.push({
        value: numbers[i],
        isGoodNumber: false,
        isChecked: false,
        isMultiple: false,
        isImmutable: false
      })
    }
    console.log(dicesToPush, ' beforeCHeck')
    checkMultipleNumbers(numbers, dicesToPush);
    console.log(dicesToPush, ' afterCheck')
    checkGoodNumbers(numbers, dicesToPush);
    this.dices = dicesToPush;
    this.handleDices = [];
  }

  private toRollDice(numberOfDices: Dices[]): number[]{
    if(this.dices.length == 0){
      return rollDice(5);
    } else {
      let toNextThrow = numberOfDices.filter(d => !d.isChecked).length;
      console.log(toNextThrow);
      return rollDice(toNextThrow)
    }
  }
}
