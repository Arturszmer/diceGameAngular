import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {Dice, DiceMessage, GameDto, GameMessage, MessageTypes} from "../../model/dtos";
import * as SockJS from "sockjs-client";
import {MultipleGameDataService} from "./multiple-game-data.service";
import {Stomp} from "@stomp/stompjs";
import {MultipleGameDicesService} from "./multiple-game-dices.service";

const HOST_CONNECTION: string = "http://localhost:8080/ws";

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  public gameMessage: Subject<GameMessage>;
  // public gameData: Subject<GameDto>;
  private stompClient;
  private socket = new SockJS(HOST_CONNECTION);

  constructor(private gameDataService: MultipleGameDataService,
              private dicesService: MultipleGameDicesService) {
    this.gameMessage = new Subject<GameMessage>();
    console.log('CONSTRUCTOR')
    this.stompClient = Stomp.over(this.socket);

  }

  set game(game: GameDto){
    this.gameDataService.game = game;
  }

  set dices(dices: Dice[]){
    this.dicesService.diceNumbers = dices;
  }

  connectNewGame(){
    this.stompClient.connect({}, () => {
      // this.stompClient.subscribe(`/topic/game.${this.gameDataService.game.gameId}`, (message: any) => {
      this.stompClient.subscribe(`/topic/game.state`, (message: any) => {
        console.log('HAPPEN')
        if (message.body) {
          console.log('MESSAGE -> ', JSON.parse(message.body))
          this.gameMessage.next(JSON.parse(message.body));
        }
      });
      this.stompClient.send('/app/game.create', {}, JSON.stringify({
        type: 'game.created',
        gameId: this.gameDataService.game.gameId,
        content: '',
        playerName: this.gameDataService.player.name
      }))
    });

  }

  connectExistingGame(){
    this.stompClient.connect({}, () => {
      this.stompClient.subscribe(`/topic/game.state`, (message: any) => {
        console.log('HAPPEN EXIST GAME')
        if (message.body) {
          console.log('MESSAGE -> ', JSON.parse(message.body))
          this.gameMessage.next(JSON.parse(message.body));
        }
      });
      this.stompClient.send('/app/game.join', {}, JSON.stringify({
        type: 'game.joined',
        gameId: this.gameDataService.game.gameId,
        content: '',
        playerName: this.gameDataService.player.name
      }))
    });

  }

  closeConnection() {
    if (this.stompClient) {
      try {
        this.stompClient.disconnect(() => {
          // Disconnect callback
          console.log('Stomp client disconnected successfully.');
        });
      } catch (error) {
        // Handle any errors that occur during disconnect
        console.error('Error while disconnecting Stomp client:', error);
      }
    }
  }

  rollDices(dicesFromRoll: Dice[]){
    const dicesMessage: DiceMessage = {
      type: MessageTypes.GAME_ROLL,
      content: '',
      gameId: this.gameDataService.game.gameId,
      dices: dicesFromRoll
    }
    this.stompClient.send('/app/game.roll', {}, JSON.stringify(dicesMessage));
  }

  // getGameData(message: JoinMessage){
  //   console.log("SEND GAME")
  //   this.stompClient.send("/app/game.create", {}, JSON.stringify(message))
  // }

  // connect(){
  //   this.stompClient = Stomp.over(this.ws);
  //   this.stompClient.connect({}, () => {
  //     this.stompClient.subscribe(`app/topic/game.create`, (message: any) => {
  //       if (message.body) {
  //         console.log('MESSAGE -> ',message)
  //         this.gameMessage.next(JSON.parse(message.body));
  //       }
  //     });
  //   });
  // }

  // getGameData(){
  //   this.stompClient.connect({}, () => {
  //     this.stompClient.subscribe(`/game/${this.gameDataService.game.gameId}/getGameData`, (message: any) => {
  //       if(message.body){
  //         console.log('GAME --> ', message);
  //         this.gameData.next(JSON.parse(message.body));
  //       }
  //     })
  //   })
  // }

  // sendMessage(message: GameMessage)
}
