import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {ApiService} from "./services/api.service";
import {GameDataService} from "./services/game-data.service";

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

  constructor(private router: Router, private api: ApiService, private dataService: GameDataService) { }

  ngOnInit(){
    this.fetchGames()
  }

  get games(){
    return this.dataService.games;
  }

  onSubmit(){
    this.dataService.adminPlayer = {
      id: 0,
      name: this.initialGameForm.get('playerName')?.value,
      points: 0
    };
    this.api.createGame(this.dataService.adminPlayer).subscribe(response => {
      this.dataService.game = response;
      this.dataService.players.push(this.dataService.adminPlayer);
      this.router.navigate(["/mulitple-game", response.gameId]);
    });
  }

  private fetchGames() {
    this.api.findOpenGamesPage(this.currentPage, this.pageSize).subscribe(
      response => {
        this.dataService.games = response.content;
      },
      (error) => {
        console.error('Error fetching open games:', error);
      }
    );
  }

  joinGame(event: Event, existGameId: string){
    event.stopPropagation();
    this.api.findGameById(existGameId).subscribe(response => {
      this.dataService.game = response;
      this.dataService.adminPlayer = response.adminPlayer;
      this.router.navigate(["/mulitple-game", existGameId])
          .catch(error => console.error("error: ", error));
    })
  }

  previousPage() {
    this.currentPage--;
    this.fetchGames();
  }

  nextPage() {
    this.currentPage++;
    this.fetchGames();
  }
}
