import {Component, DoCheck, EventEmitter, HostListener, OnDestroy, OnInit, Output} from '@angular/core';
import {rollDice} from "../diceLogic/rollingDices";
import {checkMultipleNumbers, checkGoodNumbers} from "../diceLogic/validators"
import {Dice} from "../../../model/dice";
import {DataService} from "../services/dataService";
import {CountService} from "../services/count.service";
import {Subscription} from "rxjs";
import {Player} from "../../../model/player";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {WinnerModalComponent} from "./winner-modal/winner-modal.component";

@Component({
  selector: 'app-roller-dice',
  templateUrl: './roller-dice.component.html',
  styleUrls: ['./roller-dice.component.css']
})
export class RollerDiceComponent implements OnInit, DoCheck, OnDestroy {

  isClicked: boolean = false;
  handleDices: Dice[] = [];
  points: number = 0;
  pointsSubscription?: Subscription;
  pointsFromRoll: number = 0;
  pointsFromRollSubscription?: Subscription;
  player?: Player;
  playerTurn: number = 0;
  isRolling: boolean = true;
  isNextPlayer: boolean = false;
  isSaved: boolean = false;
  isWinner: boolean = false;
  @Output() changeTurn = new EventEmitter<number>();

  constructor(private dataService: DataService, private countService: CountService, private modalService: NgbModal) { }

  get diceNumbers(){
    return this.dataService.diceNumbers;
  }

  set diceNumbers(dices: Dice[]){
    this.dataService.diceNumbers = dices
  }

  ngOnInit(): void {
    this.playerTurn = this.dataService.playerTurn;
    this.pointsSubscription = this.countService.points$.subscribe((p) => this.points = p)
    this.pointsFromRollSubscription = this.countService.pointsFromRoll$.subscribe((p) => this.pointsFromRoll = p)
    this.player = this.dataService.player;
    this.diceNumbers;
  }

  ngDoCheck() {
    this.isSaved = false;
    this.getCheckedDiceArr();
    this.buttonValidation();
  }

  ngOnDestroy(){
    this.pointsSubscription?.unsubscribe();
    this.pointsFromRollSubscription?.unsubscribe();
  }

  @HostListener('window:keydown.space', ['$event'])
  listenSpace(event: KeyboardEvent): void {

    event.preventDefault();
    if(this.isRolling){
      this.diceRoll();
      console.log(this.playerTurn, ' player turn')
      switch (this.playerTurn){
        case 0: window.scrollTo(0, 0);
        break;
        case 1: window.scrollTo(0, 400);
        break;
      }
    } else if (this.isNextPlayer){
      this.nextPlayer();
      switch (this.playerTurn){
        case 0: window.scrollTo(0, 0);
          break;
        case 1: window.scrollTo(0, 150);
          break;
      }
    }
  }

  @HostListener('window:keydown.Enter', ['$event'])
  listenEnter(event: KeyboardEvent): void {
    event.preventDefault();
    if(this.isSaved){
      this.savePoints();
    }
  }

  diceRoll() {
    this.isRolling = false;
    this.isClicked = true;
    let result = this.toRollDice(this.diceNumbers.filter(f => f.isChecked).length);
    this.insertDataIntoDices(result, this.handleDices);
    setTimeout(() => {
      this.isClicked = false
    }, 150);
  }

  insertDataIntoDices(numbers: number[], dicesToPush: Dice[]){
    this.manageDices();
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
    if(this.diceNumbers.filter((v) => v.isImmutable).length === 5){
      this.countService.setHandlePoints(this.points);
      this.diceNumbers = dicesToPush;
    }
    this.pushDices(numbers, dicesToPush);
    this.handleDices = [];
  }

  private manageDices() {
    this.diceNumbers.filter((v) => v.isChecked).forEach((value) => {
      value.isImmutable = true
    });
  }

  private checkPossibilityToNextRoll(dicesToPush: Dice[]) {
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
    if (this.diceNumbers.length !== 0) {
      let dn: number = 0;
      for (let i = 0; i < numbers.length; i++) {
        for (dn; dn < 5; dn++) {
          if (this.diceNumbers[dn].isImmutable) {

          } else {
            this.diceNumbers[dn] = dicesToPush[i];
            dn++
            break
          }
        }
      }
    } else {
      this.diceNumbers = dicesToPush;
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
      if(this.player?.points! < 100){
        return this.points >= 100;
      } else {
        return this.points >= 25;
      }
    } else return false;
  }

  private getCheckedDiceArr() {
    if ((this.diceNumbers.filter((f) => f.isChecked && !f.isImmutable).length > 0)
      || this.diceNumbers.length == 0){
      this.isRolling = true;
      return;
    }
    if (this.diceNumbers.filter((f) => f.isChecked && !f.isImmutable).length == 0){
      this.isRolling = false;
      return;
    }
  }

  savePoints() {
    this.dataService.addPoints(this.points);
    this.nextPlayer()
  }

  nextPlayer() {
    this.points = 0;
    this.diceNumbers = [];
    this.playerTurn = this.dataService.changeTurn();
    localStorage.setItem('turn', JSON.stringify(this.playerTurn))
    this.dataService.nextPlayer(this.playerTurn)
    this.countService.setHandlePoints(0);
    this.changeTurn.emit(this.playerTurn);
    this.isRolling = true;
    this.isNextPlayer = false;
    this.isSaved = false;
    return this.diceNumbers.filter((f) => f.isChecked && !f.isImmutable);
  }

  winGame(){
    let modalRef = this.modalService.open(WinnerModalComponent, {centered: true});
    this.isWinner = false;
    modalRef.componentInstance.playerData = this.player;
    modalRef.componentInstance.players = this.dataService.gamePlayers;
    this.nextPlayer();
  }

  buttonValidation(): void {
    if(this.player?.points! + this.points + this.pointsFromRoll === 1000){
      this.isSaved = false;
      this.isWinner = true;
      this.diceNumbers.forEach(dice => {
        dice.isImmutable = true
      })
      this.points = this.pointsFromRoll + this.points;
    } else if(this.player?.points! + this.points > 1000){
      this.isSaved = false;
      this.isWinner = false;
      this.isRolling = false;
      this.isNextPlayer = true;
    } else if(this.isSaveValid() && !this.isNextPlayer && this.isRolling){
      this.isSaved = true;
    }
  }
}
