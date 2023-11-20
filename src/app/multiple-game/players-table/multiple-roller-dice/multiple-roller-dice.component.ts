import {
  Component, DoCheck,
  EventEmitter,
  HostListener,
  OnInit,
  Output
} from '@angular/core';
import {Dice} from "../../../model/dtos";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {MultipleGameDataService} from "../../services/multiple-game-data.service";
import {MultipleGameDicesService} from "../../services/multiple-game-dices.service";
import {MultipleWinnerModalComponent} from "../../modals/winner-modal/multiple-winner-modal.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-multiple-roller-dice',
  templateUrl: './multiple-roller-dice.component.html',
  styleUrls: ['./multiple-roller-dice.component.css']
})
export class MultipleRollerDiceComponent implements OnInit, DoCheck {

  isClicked: boolean = false;
  playerTurn: number = 0;
  @Output() changeTurn = new EventEmitter<number>();

  constructor(private dataService: MultipleGameDataService,
              private dicesService: MultipleGameDicesService,
              private modalService: NgbModal,
              private router: Router
              ) {
  }

  get diceNumbers(){
    return this.dicesService.diceNumbers;
  }

  set diceNumbers(dices: Dice[]){
    this.dicesService.diceNumbers = dices
  }

  get currentPlayer(){
    return this.dataService.currentPlayer;
  }

  get gameOwner(){
    return this.dataService.gameOwner;
  }

  get points(){
    return this.dataService.points
  }

  get isRolling(){
    return this.dataService.currentPlayer.validations?.isRolling
  }

  get isSaved(){
    return this.dataService.currentPlayer.validations?.isSaved
  }

  get isNextPlayer(){
    return this.dataService.currentPlayer.validations?.isNextPlayer
  }

  ngOnInit(): void {
    this.diceNumbers = this.dataService.dicesFromGame;
    this.playerTurn = this.dataService.playerTurn;
    this.diceNumbers;
  }

  ngDoCheck() {
    this.currentPlayerCanRoll();
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

  disableButtonForWaitingPlayers():Boolean{
    return this.currentPlayer.name !== this.gameOwner.name;
  }

  currentPlayerCanRoll() {
    return this.isRolling && this.currentPlayer.name === this.gameOwner.name;
  }

  @HostListener('window:keydown.Enter', ['$event'])
  listenEnter(event: KeyboardEvent): void {
    event.preventDefault();
    if(this.isSaved){
      this.savePoints();
    }
  }

  diceRoll() {
    this.isClicked = true;
    this.toRollDice();
    setTimeout(() => {
      this.isClicked = false
    }, 150);
  }

  private toRollDice(){
      this.dicesService.rollDices();
  }

  savePoints() {
    this.dataService.savePoints();
  }

  nextPlayer() {
    this.dataService.nextPlayer()
    this.diceNumbers = this.dataService.dicesFromGame;
  }

  winGame(){
    let modalRef = this.modalService.open(MultipleWinnerModalComponent, {centered: true});
    modalRef.componentInstance.playerData = this.currentPlayer;
    modalRef.componentInstance.restartGame.subscribe((restart: boolean) => {
      if(restart){
        console.log('IOS RESTART: ', restart)
        this.dataService.winGame(restart);
      } else {
        this.dataService.winGame(restart)
        this.dataService.closeWSConnection();
        this.router.navigate([""]);
      }
    })
  }

}
