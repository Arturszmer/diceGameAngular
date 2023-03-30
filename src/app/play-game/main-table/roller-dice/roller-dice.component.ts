import { Component, OnInit } from '@angular/core';
import {rollDice} from "../diceLogic/throwingDice";
import {checkMultipleNumbers, checkGoodNumbers} from "../diceLogic/validators"
import {Dice} from "../../../model/dice";
import {DataService} from "../services/dataService";
import {CountService} from "../services/count.service";
import {Subscription} from "rxjs";
import {Player} from "../../../model/player";

@Component({
  selector: 'app-roller-dice',
  templateUrl: './roller-dice.component.html',
  styleUrls: ['./roller-dice.component.css']
})
export class RollerDiceComponent implements OnInit {

  dices: Dice[] = [];
  isClicked: boolean = false;
  handleDices: Dice[] = [];
  points: number = 0;
  subscription?: Subscription;
  player?: Player;

  constructor(private service: DataService, private countService: CountService) { }

  ngOnInit(): void {
    this.subscription = this.countService.points$.subscribe((p) => {
      this.points = p;
      console.log(' co to jest p: ', p)
    })
    this.player = this.service.getPlayer();
    console.log(this.player, ' PLAYER!!')
  }

  diceThrow() {
    this.isClicked = true;
    let something = this.dices.filter(f => f.isImmutable)
    let result = this.toRollDice(something);
    this.insertDataIntoDices(result, this.handleDices);
    this.service.setDiceNumbers(this.dices);
    setTimeout(() => {
      this.isClicked = false
    }, 150);
  }

  insertDataIntoDices(numbers: number[], dicesToPush: Dice[]){
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

  private toRollDice(numberOfDices: Dice[]): number[]{
    if(this.dices.length == 0){
      return rollDice(5);
    } else {
      let toNextThrow = numberOfDices.filter(d => !d.isChecked).length;
      console.log(toNextThrow);
      return rollDice(toNextThrow)
    }
  }

  isSaveValid(): boolean {
    if(this.player?.points! <= 100){
      return this.points >= 100;
    } else {
      return this.points >= 25;
    }
  }
}
