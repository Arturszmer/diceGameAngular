import {Component, EventEmitter, OnInit, Output} from '@angular/core';
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
  pointsSubscription?: Subscription;
  diceSubscription?: Subscription;
  player?: Player;
  isRolling: boolean = true;
  isNextPlayer: boolean = false;
  playerTurn: number = 0;
  @Output() changeTurn = new EventEmitter<number>();

  constructor(private dataService: DataService, private countService: CountService) { }

  ngOnInit(): void {
    this.pointsSubscription = this.countService.points$.subscribe((p) => {
      this.points = p;
    })
    this.player = this.dataService.getPlayer();
    this.diceSubscription = this.dataService.diceNumbers$.subscribe(
      (diceNumbers) => {
        this.dices = diceNumbers;
        if(this.getCheckedDiceArr().length > 0){
          console.log('ROLLIN')
          this.isRolling = true;
        } else if (this.getCheckedDiceArr().length == 0){
          this.isRolling = false;
        }
      })
  }

  ngOnDestroy(){
    this.diceSubscription?.unsubscribe();
  }

  diceThrow() {
    this.isRolling = false;
    this.isClicked = true;
    console.log(this.dices.filter(f => !f.isChecked).length, ' --> LICZBY DO RZUTU')
    let result = this.toRollDice(this.dices.filter(f => f.isChecked).length);
    console.log(result, ' --> WYRZUCONE KOŚCI')
    this.insertDataIntoDices(result, this.handleDices);
    this.dataService.setDiceNumbers(this.dices);
    setTimeout(() => {
      this.isClicked = false
    }, 150);
  }

  insertDataIntoDices(numbers: number[], dicesToPush: Dice[]){
    this.manageDices();
    console.log(this.dices, ' KOSTKI PO RZUCIE I WYBRANIU PRZED KOLEJNYM RZUTEM')
    // this.dices = [];
    for (let i = 0; i < numbers.length; i++){
        dicesToPush.push({
          value: numbers[i],
          isGoodNumber: false,
          isChecked: false,
          isMultiple: false,
          isImmutable: false
        })
      }

    checkMultipleNumbers(numbers, dicesToPush);
    checkGoodNumbers(numbers, dicesToPush);
    this.checkPossibilityToNextRoll(dicesToPush);
    if(this.dices.filter((v) => v.isImmutable).length === 5){
      this.countService.setHandlePoints(this.points);
      this.dices = dicesToPush;
    }
    this.pushDices(numbers, dicesToPush);
    this.handleDices = [];
  }

  private manageDices() {
    this.dices.filter((v) => v.isChecked).forEach((value) => {
      value.isImmutable = true
    });


  }


  private checkPossibilityToNextRoll(dicesToPush: Dice[]) {
    console.log(dicesToPush, ' --> CHECK POSSIBILITY TO NEXT ROLL')
    this.isNextPlayer = true;
    this.isRolling = false;

    dicesToPush.forEach((value) => {
      if(value.isGoodNumber){
        this.isNextPlayer = false;
        this.isRolling = false;
      } else {
        this.isRolling = false;
      }
    })
  }

  private pushDices(numbers: number[], dicesToPush: Dice[]) {
    if (this.dices.length !== 0) {
      let dn: number = 0;
      for (let i = 0; i < numbers.length; i++) {
        for (dn; dn < 5; dn++) {
          if (this.dices[dn].isImmutable) {

          } else {
            this.dices[dn] = dicesToPush[i];
            dn++
            break
          }
        }
      }
    } else {
      this.dices = dicesToPush;
    }
  }

  private toRollDice(numberOfDices: number): number[]{
    if(numberOfDices === 0){
      return rollDice(5);
    } else {
      return rollDice(numberOfDices)
    }
  }

  isSaveValid(): boolean {
    if(!this.isNextPlayer){

      if(this.player?.points! <= 100){
        return this.points >= 25;
      } else {
        return this.points >= 25;
      }

    } else return false;
  }

  private getCheckedDiceArr() {
    console.log(this.dices.filter((f) => f.isChecked && !f.isImmutable), ' GET CHECKED DICE ARR' )
    return this.dices.filter((f) => f.isChecked && !f.isImmutable);
  }

  savePoints() {
    console.log(this.player, ' PLAYER?')
    this.dataService.addPoints(this.points);
    this.nextPlayer()
  }

  nextPlayer() {
    console.log(this.player, ' PLAYER?')
    this.points = 0;
    this.dices = [];
    this.playerTurn = this.dataService.chaneTurn();
    this.dataService.setPlayer(this.playerTurn)
    this.countService.setPoints(this.points);
    // console.log(this.playerTurn)
    this.changeTurn.emit(this.playerTurn);
    this.isRolling = true;
    this.player = this.dataService.getPlayer();
    console.log(this.player, ' PLAYER później')

  }
}
