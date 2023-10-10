import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";
import {Dice, DiceMessage, GameMessage, JoinMessage, MessageTypes} from "../../model/dtos";
import * as SockJS from "sockjs-client";
import {CompatClient, Stomp} from "@stomp/stompjs";
import {environment} from "../../../environments/environment";

const WS_CONNECTION: string = "/ws";

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  public gameMessageSubject: Subject<GameMessage>;
  private stompClient?: CompatClient;
  private socketFactory: () => WebSocket;

  constructor() {
    this.gameMessageSubject = new Subject<GameMessage>();
    this.socketFactory = () => new SockJS(environment.apiUrl + WS_CONNECTION);
  }

  get gameMessage$(): Observable<GameMessage> {
    return this.gameMessageSubject.asObservable();
  }

  connectNewGame(gameId: string, playerName: string){
    const joinMessage: JoinMessage = {
        type: 'game.connected',
        gameId: gameId,
        content: '',
        playerName: playerName
    }
    this.stompClient = Stomp.over(this.socketFactory);
    this.stompClient.connect({}, () => {
      this.stompClient!.subscribe(environment.topicPath + gameId, (message: any) => {
        if (message.body) {
          console.log(message.body)
          this.gameMessageSubject.next(JSON.parse(message.body));
        }
      });
      this.stompClient!.send('/app/game.connect', {}, JSON.stringify(joinMessage))
    });

  }

  closeConnection(gameId: string) {
    if (this.stompClient) {
      try {
        this.stompClient?.send('/app/game.leave', {}, JSON.stringify({
            type: 'game.leaved',
            gameId: gameId,
            content: '',
        }))
        this.stompClient.disconnect(() => {
          console.log(`Stomp client disconnected successfully. Player is disconnected`);
        });
      } catch (error) {
        console.error('Error while disconnecting Stomp client:', error);
      }
    }
  }

  rollDices(gameId: string, dicesFromRoll: Dice[]){
    const dicesMessage: DiceMessage = {
      type: MessageTypes.GAME_ROLL,
      content: '',
      gameId: gameId,
      dices: dicesFromRoll
    }
    this.stompClient!.send('/app/game.roll', {}, JSON.stringify(dicesMessage));
  }
}
