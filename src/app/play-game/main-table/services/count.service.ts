import { Injectable } from '@angular/core';
import {Dice} from "../../../model/dice";
import {count} from "../diceLogic/count";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CountService {

  private dPoints: number = 0;
  private pointsSource = new Subject<number>();
  points$ = this.pointsSource.asObservable();
  private handlePoints: number = 0;

  constructor() { }

  setPoints(points: number){
    this.dPoints! = points + this.handlePoints;
    this.pointsSource.next(this.dPoints);
  }

  setHandlePoints(points: number){
    this.handlePoints = points;
  }

  getPoints(){
    return this.dPoints;
  }

  countFromDices(dices: Dice[]){
    let number = count(dices);
    this.setPoints(number)
  }
}
