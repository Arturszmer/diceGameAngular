import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {ApiService} from "./services/api.service";
import {GameDataService} from "./services/game-data.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {JoinGameModalComponent} from "./join-game-modal/join-game-modal.component";
import {Observable} from "rxjs";
import {NewPlayer} from "../model/dtos";

export const GAME_ID_STORAGE = 'GAME_ID';

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

  constructor(private router: Router,
              private api: ApiService,
              private dataService: GameDataService,
              private modalService: NgbModal) { }

  ngOnInit(){
    this.fetchGames()
  }

  get games(){
    return this.dataService.games;
  }

  createGame(){
    this.dataService.adminPlayer = {
      id: 0,
      name: this.initialGameForm.get('playerName')?.value,
      points: 0
    };
    this.api.createGame(this.dataService.adminPlayer).subscribe(response => {
      this.dataService.game = response;
      localStorage.setItem(GAME_ID_STORAGE, response.gameId)
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

  joinGame(event: Event, existGameId: string, adminPlayerName: string){
    event.stopPropagation();
    let modalRef = this.modalService.open(JoinGameModalComponent, {centered: true});
    modalRef.componentInstance.gameId = existGameId;
    modalRef.componentInstance.adminName = adminPlayerName;
    const str: Observable<String> = modalRef.componentInstance.playerName;
    str.subscribe(response => {
      console.log(response, ' --> resp')
      newPlayer = {
        playerName: response.toString()
      }
      console.log(newPlayer, ' --> new player')
      this.api.joinGameWithName(existGameId, newPlayer).subscribe(game => {
        console.log('Game: --> ', game)
        this.dataService.game = game;
        this.dataService.players = (game.players);
        localStorage.setItem(GAME_ID_STORAGE, existGameId);

          this.router.navigate(["/mulitple-game", existGameId])
              .catch(error => console.error("error: ", error));
      }
    )

    })
    let newPlayer: NewPlayer = {
      playerName: ''
    }
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
