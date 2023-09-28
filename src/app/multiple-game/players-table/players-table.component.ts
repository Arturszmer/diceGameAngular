import {AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MultipleGameDataService} from "../services/multiple-game-data.service";
import {MultipleGameDicesService} from "../services/multiple-game-dices.service";
import {ActivatedRoute, Router} from "@angular/router";
import {WebSocketService} from "../services/web-socket.service";

@Component({
  selector: 'app-players-table',
  templateUrl: './players-table.component.html',
  styleUrls: ['./players-table.component.css']
})
export class PlayersTableComponent implements OnInit, AfterViewInit {

  constructor(private gameDataService: MultipleGameDataService,
              private diceService: MultipleGameDicesService,
              private router: Router,
              private cdRef: ChangeDetectorRef,
              private activeRouter: ActivatedRoute,
              private webSocket: WebSocketService
              ) {
  }

  get diceNumbers(){
    return this.diceService.diceNumbers
  }


  ngOnInit(): void {
    this.activeRouter.paramMap.subscribe(params => {
      const gameId: string | null = params.get('id')
      if (gameId){
              console.log('GAME ID: ', gameId);
              this.restoreGameData(gameId);
      }
    })
  }

  ngAfterViewInit():void {
    console.log(this.gameDataService.game)
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
    })
  }

    quit() {
        this.gameDataService.clearPlayers();
        localStorage.clear();
        this.router.navigate([""]);
    }
}
