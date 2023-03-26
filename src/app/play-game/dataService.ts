import { Injectable } from '@angular/core';
import {Player} from "../player";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private gameData: Player[] = [];

  constructor() {}

  setGameData(data: Player[]) {
    this.gameData = data;
  }

  getGameData() {
    return this.gameData;
  }
}
