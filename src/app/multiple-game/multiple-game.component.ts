import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {MultipleGameDataService} from "./services/multiple-game-data.service";

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

  constructor(private gameDataService: MultipleGameDataService) { }

  ngOnInit(){
    this.gameDataService.fetchGames(this.currentPage, this.pageSize)
  }

  get games(){
    return this.gameDataService.games;
  }

  createGame(){
    let name: string = this.initialGameForm.get('playerName')?.value;
    this.gameDataService.createGame(name)
  }

  joinGame(event: Event, existGameId: string, adminPlayerName: string){
    event.stopPropagation();
    this.gameDataService.joinGame(existGameId, adminPlayerName);
  }

  previousPage() {
    this.currentPage--;
    this.gameDataService.fetchGames(this.currentPage, this.pageSize)
  }

  nextPage() {
    this.currentPage++;
    this.gameDataService.fetchGames(this.currentPage, this.pageSize)
  }
}
