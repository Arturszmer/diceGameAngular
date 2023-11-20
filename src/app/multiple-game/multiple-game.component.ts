import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {MultipleGameCreationService} from "./services/multiple-game-creation.service";
import {GameStatus} from "../model/dtos";

@Component({
  selector: 'app-multiple-game',
  templateUrl: './multiple-game.component.html',
  styleUrls: ['./multiple-game.component.css'],
})
export class MultipleGameComponent implements OnInit{

  currentPage = 0;
  pageSize = 5;
  initialGameForm: FormGroup = new FormGroup<any>({
    playerName: new FormControl(''),
  });

  constructor(private gameCreationService: MultipleGameCreationService) { }

  ngOnInit(){
    this.gameCreationService.fetchGames(this.currentPage, this.pageSize)
  }

  get games(){
    return this.gameCreationService.games;
  }

  createGame(){
    let name: string = this.initialGameForm.get('playerName')?.value;
    this.gameCreationService.createGame(name)
  }

  joinGame(event: Event, existGameId: string, adminPlayerName: string){
    event.stopPropagation();
    this.gameCreationService.joinGame(existGameId, adminPlayerName);
  }

  previousPage() {
    this.currentPage--;
    this.gameCreationService.fetchGames(this.currentPage, this.pageSize)
  }

  nextPage() {
    this.currentPage++;
    this.gameCreationService.fetchGames(this.currentPage, this.pageSize)
  }

    protected readonly GameStatus = GameStatus;
}
