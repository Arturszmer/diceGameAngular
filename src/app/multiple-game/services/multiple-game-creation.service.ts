import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";
import {Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {GAME_ID_STORAGE, MultipleGameDataService} from "./multiple-game-data.service";
import {JoinGameModalComponent} from "../join-game-modal/join-game-modal.component";
import {Observable} from "rxjs";
import {GameDto, NewPlayer, PlayerDto} from "../../model/dtos";

export const GAME_OWNER: string = 'GAME_OWNER'

@Injectable({
  providedIn: 'root'
})
export class MultipleGameCreationService {

  private _joinedPlayer!: PlayerDto;
  private _games: GameDto[] = [];

  constructor(private api: ApiService,
              private router: Router,
              private modalService: NgbModal,
              private gameDataService: MultipleGameDataService) { }

  get games(): GameDto[] {
    return this._games;
  }

  set games(game: GameDto[]) {
    this._games = game;
  }

  fetchGames(currentPage: number, pageSize: number){
    this.api.findOpenGamesPage(currentPage, pageSize).subscribe(
      response => {
        this.games = response.content;
      },
      (error) => {
        console.error('Error fetching open games:', error);
      }
    );
  }

  createGame(name: string) {
    this._joinedPlayer = {
      id: 0,
      name: name,
      points: 0,
    }
    this.api.createGame(this._joinedPlayer).subscribe(response => {
      this.gameDataService.game = response;
      this.gameDataService.setCurrentPlayer();
      this.gameDataService.gameOwner = this._joinedPlayer;
      localStorage.setItem(GAME_OWNER, JSON.stringify(this._joinedPlayer))
      localStorage.setItem(GAME_ID_STORAGE, response.gameId)
      this.router.navigate(["/mulitple-game", response.gameId]);
    });
  }

  joinGame(existGameId: string, adminPlayerName: string){
    let modalRef = this.modalService.open(JoinGameModalComponent, {centered: true});
    modalRef.componentInstance.gameId = existGameId;
    modalRef.componentInstance.adminName = adminPlayerName;
    const nameFromModal: Observable<String> = modalRef.componentInstance.playerName;
    nameFromModal.subscribe(response => {
      let newPlayer: NewPlayer = {
        playerName: response.toString()
      }
      this.api.joinGameWithName(existGameId, newPlayer).subscribe(game => {
        console.log('Game: --> ', game)
        this.gameDataService.game = game;
        this.gameDataService.players = game.players;
        this._joinedPlayer = game.players.filter(player => player.name === newPlayer.playerName)[0];
        this.gameDataService.gameOwner = this._joinedPlayer;

        localStorage.setItem(GAME_OWNER, JSON.stringify(this._joinedPlayer))
        localStorage.setItem(GAME_ID_STORAGE, existGameId);

        this.router.navigate(["/mulitple-game", existGameId])
          .catch(error => console.error("error: ", error));
      })
    })
  }

}
