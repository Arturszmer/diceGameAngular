import {Injectable} from '@angular/core';
import {GameDto, NewPlayer, PlayerDto} from "../../model/dtos";
import {mockDiceRoll} from "../../model/mock-models";
import {Dice} from "../../model/dice";
import {ApiService} from "./api.service";
import {Router} from "@angular/router";
import {JoinGameModalComponent} from "../join-game-modal/join-game-modal.component";
import {Observable} from "rxjs";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

export const GAME_ID_STORAGE = 'GAME_ID';

@Injectable({
  providedIn: 'root'
})
export class GameDataService {

  private _adminPlayer!: PlayerDto;
  private _players: PlayerDto[] = [];
  private _games: GameDto[] = [];
  private _game!: GameDto;

  constructor(private api: ApiService,
              private router: Router,
              private modalService: NgbModal) {}

  get currentPlayerPoints(): number {
    return this.players[this.game.currentTurn].points;
  }

  get players(): PlayerDto[] {
    return this._players;
  }

  set players(value: PlayerDto[]) {
    this._players = value;
  }

  get game(): GameDto {
    return this._game;
  }

  set game(game: GameDto) {
    this._game = game;
  }

  get games(): GameDto[] {
    return this._games;
  }

  set games(game: GameDto[]) {
    this._games = game;
  }

  get adminPlayer(): PlayerDto {
    return this._adminPlayer;
  }

  set adminPlayer(player: PlayerDto) {
    this._adminPlayer = player;
    this._players.push(player)
  }

  get diceNumbers(): Dice[] {
    return mockDiceRoll
  }

  clearPlayers(): void {
    this._players = [];
  }

  restoreData() {
    const gameId: string = localStorage.getItem(GAME_ID_STORAGE) || "";
    this.api.findGameById(gameId).subscribe(response => {
      this._game = response;
      this._players = response.players;
    })

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
    this.adminPlayer = {
      id: 0,
      name: name,
      points: 0,
    }
    this.api.createGame(this.adminPlayer).subscribe(response => {
      this.game = response;
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
          this.game = game;
          this.players = (game.players);

          localStorage.setItem(GAME_ID_STORAGE, existGameId);

            this.router.navigate(["/mulitple-game", existGameId])
                .catch(error => console.error("error: ", error));
        })
      })
  }

}
