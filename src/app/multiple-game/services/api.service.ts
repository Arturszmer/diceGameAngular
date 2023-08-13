import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GameDto, OpenGamesResponse, PlayerDto} from "../../model/dtos";
import {environment} from "../../../environments/environment";
import {Params} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private createGameApi: string = "/create-game";
  private openGamesApi: string = "/find-open-games"
  private openGamesApiPage: string = "/find-open-games-page"

  constructor(private http: HttpClient) { }

  findOpenGames(){
    return this.http.get<GameDto[]>(environment.apiUrl + this.openGamesApi).pipe();
  }
  findOpenGamesPage(page: number, size: number){
    const params: Params = { page: page.toString(), pageSize: size.toString() };
    return this.http.get<OpenGamesResponse>(environment.apiUrl + this.openGamesApiPage, {params});
  }
  createGame(adminPlayer: PlayerDto) {
    return this.http.post<GameDto>(environment.apiUrl + this.createGameApi, adminPlayer);
  }
}
