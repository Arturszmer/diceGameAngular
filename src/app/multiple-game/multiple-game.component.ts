import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {GameDto, PlayerDto} from "../model/dtos";
import {ApiService} from "./services/api.service";

@Component({
  selector: 'app-multiple-game',
  templateUrl: './multiple-game.component.html',
  styleUrls: ['./multiple-game.component.css']
})
export class MultipleGameComponent implements OnInit{

  currentPage = 0;
  pageSize = 5;
  totalGames = 0;
  initialGameForm: FormGroup = new FormGroup<any>({
    playerName: new FormControl(''),
  });
  adminPlayer!: PlayerDto;
  games: GameDto[] = [];

  constructor(private router: Router, private api: ApiService) { }

  ngOnInit(){
    //   this.api.findOpenGames().subscribe(game => {
    //     this.games = game
    // });
    this.fetchGames()
  }



  onSubmit(){
    console.log('submit!');
    this.adminPlayer = {
      id: 0,
      name: this.initialGameForm.get('playerName')?.value,
      points: 0
    };
    console.log(this.adminPlayer)
    this.api.createGame(this.adminPlayer).subscribe(response => {
      console.log('response --> ', response)
      this.games.push(response);
    });
  }

  private fetchGames() {
    this.api.findOpenGamesPage(this.currentPage, this.pageSize).subscribe(
      response => {
        console.log('respo: ', response)
        this.games = response.content;

        // this.games = response
      },
      (error) => {
        console.error('Error fetching open games:', error);
      }
    );

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
