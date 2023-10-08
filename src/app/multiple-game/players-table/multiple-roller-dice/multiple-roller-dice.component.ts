import {
  Component, DoCheck,
  EventEmitter,
  HostListener,
  OnInit,
  Output
} from '@angular/core';
import {Dice} from "../../../model/dtos";
import {Subscription} from "rxjs";
import {CountService} from "../../../play-single-game/main-table/services/count.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {
  WinnerModalComponent
} from "../../../play-single-game/main-table/roller-dice/winner-modal/winner-modal.component";
import {MultipleGameDataService} from "../../services/multiple-game-data.service";
import {MultipleGameDicesService} from "../../services/multiple-game-dices.service";
import {WebSocketService} from "../../services/web-socket.service";

@Component({
  selector: 'app-multiple-roller-dice',
  templateUrl: './multiple-roller-dice.component.html',
  styleUrls: ['./multiple-roller-dice.component.css']
})
export class MultipleRollerDiceComponent implements OnInit, DoCheck {


  isClicked: boolean = false;
  handleDices: Dice[] = [];
  points: number = 0;
  pointsSubscription?: Subscription;
  pointsFromRoll: number = 0;
  pointsFromRollSubscription?: Subscription;
  playerTurn: number = 0;
  isRolling: boolean = true;
  isNextPlayer: boolean = false;
  isSaved: boolean = false;
  isWinner: boolean = false;
  @Output() changeTurn = new EventEmitter<number>();

  constructor(private dataService: MultipleGameDataService,
              private dicesService: MultipleGameDicesService,
              private countService: CountService,
              private modalService: NgbModal,
              private webSocketService: WebSocketService) {
  }

  get diceNumbers(){
    return this.dicesService.diceNumbers;
  }

  set diceNumbers(dices: Dice[]){
    this.dicesService.diceNumbers = dices
  }

  get player(){
    return this.dataService.player;
  }

  ngOnInit(): void {
    this.diceNumbers = this.dataService.dicesFromGame;
    this.playerTurn = this.dataService.playerTurn;
    this.pointsSubscription = this.countService.points$.subscribe((p) => this.points = p)
    this.pointsFromRollSubscription = this.countService.pointsFromRoll$.subscribe((p) => this.pointsFromRoll = p)
    this.diceNumbers;
  }

  ngDoCheck() {
    this.isSaved = false;
    this.getCheckedDiceArr(this.diceNumbers);
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
    this.toRollDice();
    setTimeout(() => {
      this.isClicked = false
    }, 150);
  }

  private toRollDice(){
      this.dicesService.rollDices();
      this.webSocketService.rollDices([])
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

  private getCheckedDiceArr(dices: Dice[]) {
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
    this.dataService.nextPlayer()
    this.diceNumbers = this.dataService.dicesFromGame;
  }

  winGame(){
    let modalRef = this.modalService.open(WinnerModalComponent, {centered: true});
    this.isWinner = false;
    modalRef.componentInstance.playerData = this.player;
    modalRef.componentInstance.players = this.dataService.players;
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
