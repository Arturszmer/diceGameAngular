import {AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MultipleGameDataService} from "../services/multiple-game-data.service";
import {MultipleGameDicesService} from "../services/multiple-game-dices.service";
import {ActivatedRoute, Router} from "@angular/router";
import {WebSocketService} from "../services/web-socket.service";
import {GAME_OWNER} from "../services/multiple-game-creation.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {QuitGameModalComponent} from "../modals/quit-game-modal/quit-game-modal.component";

@Component({
  selector: 'app-players-table',
  templateUrl: './players-table.component.html',
  styleUrls: ['./players-table.component.css']
})
export class PlayersTableComponent implements OnInit, AfterViewInit {

  invitationLink?: string;
  showMessage: boolean = false;

  constructor(private gameDataService: MultipleGameDataService,
              private diceService: MultipleGameDicesService,
              private router: Router,
              private cdRef: ChangeDetectorRef,
              private activeRouter: ActivatedRoute,
              private webSocket: WebSocketService,
              private modalService: NgbModal
              ) {
  }

  get diceNumbers(){
    return this.diceService.diceNumbers
  }

  get currentPlayer(){
    return this.gameDataService.currentPlayer;
  }

  get gameOwner(){
    return this.gameDataService.gameOwner;
  }


  ngOnInit(): void {
    this.activeRouter.paramMap.subscribe(params => {
      const gameId: string | null = params.get('id')
      if (gameId){
              this.restoreGameData(gameId);
      }
    })
  }

  ngAfterViewInit():void {
    this.gameDataService.connectGame();
    this.cdRef.detectChanges();
  }

  get players(){
    return this.gameDataService.players;
  }

  get game(){
    return this.gameDataService.game;
  }

  get currentTurn(){
    return this.gameDataService.game.currentTurn;
  }
  get points(){
    return this.gameDataService.currentPlayerPoints;
  }

  diceCheck(index: number){
    this.diceService.diceCheck(this.diceNumbers[index]);
  }

  restoreGameData(gameId: string){
   return this.gameDataService.restoreData(gameId).subscribe(response => {
      this.gameDataService.game = response
      this.gameDataService.players = response.players
      this.gameDataService.setCurrentPlayer();
      this.diceService.diceNumbers = response.dices
      this.gameDataService.gameOwner = JSON.parse(localStorage.getItem(GAME_OWNER) || "");
    })
  }

    quit() {
      let modalRef = this.modalService.open(QuitGameModalComponent, {centered: false});

      modalRef.result.then((result) => {
        if(result === 'quit'){
          this.gameDataService.clearPlayers();
          localStorage.clear();
          this.router.navigate([""]);
          this.webSocket.closeConnection(this.gameDataService.game.gameId);
        }
      })
    }

  generateInvitationLink(event: any) {
    this.gameDataService.generateInvitationLink(this.game.gameId).subscribe((response) => {
      // const link = response;
      this.invitationLink = response;
      this.onClick(event)
    });
  }

  public onClick(event: MouseEvent): void {

    event.preventDefault();
    if (!this.invitationLink)
      return;

    navigator.clipboard.writeText(this.invitationLink.toString()).then(() => {
      this.showMessage = true;
      setTimeout(() => {
        this.showMessage = false
      }, 2000)
    }).catch((error) => {
      console.error('Failed to copy text to clipboard: ' + error);
    });
  }

}
