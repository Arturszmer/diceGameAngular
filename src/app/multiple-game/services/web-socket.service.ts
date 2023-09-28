import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {RollDicesDto} from "../../model/dtos";
import * as SockJS from "sockjs-client";
import {MultipleGameDataService} from "./multiple-game-data.service";
import {Stomp} from "@stomp/stompjs";

const HOST_CONNECTION: string = "http://localhost:8080/game-connection";

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  public rollDices: Subject<RollDicesDto>;
  private stompClient;

  constructor(private gameDataService: MultipleGameDataService) {
    this.rollDices = new Subject<RollDicesDto>();

    const ws = new SockJS(HOST_CONNECTION);
    this.stompClient = Stomp.over(ws);
    this.stompClient.connect({}, () => {
      this.stompClient.subscribe(`/game/${gameDataService.game.gameId}/roll`, (message: any) => {
        if (message.body) {
          console.log('MESSAGE -> ',message)
          this.rollDices.next(JSON.parse(message.body));
        }
      });
    });

  }

}
