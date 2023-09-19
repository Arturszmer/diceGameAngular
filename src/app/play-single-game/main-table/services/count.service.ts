import { Injectable } from '@angular/core';
import {count, countAllGoodNumbers} from "../diceLogic/count";
import {Subject} from "rxjs";
import {Dice} from "../../../model/dtos";

@Injectable({
  providedIn: 'root'
})
export class CountService {

  private points: number = 0;
  private pointsSource = new Subject<number>();
  points$ = this.pointsSource.asObservable();
  private handlePoints: number = 0;
  private pointsFromRoll: number = 0;
  private pointsFromRollSource = new Subject<number>()
  pointsFromRoll$ = this.pointsFromRollSource;

  constructor() { }

  setPoints(points: number){
    this.points! = points + this.handlePoints;
    this.pointsSource.next(this.points);
  }

  setPointsFromRoll(points: number){
    this.pointsFromRoll = points;
    this.pointsFromRollSource.next(this.pointsFromRoll);
  }

  setHandlePoints(points: number){
    this.handlePoints = points;
  }

  getPoints(){
    return this.points;
  }

  getPointsFromRoll(){
    return this.pointsFromRoll;
  }

  countFromRoll(dices: Dice[]){
    this.setPointsFromRoll(countAllGoodNumbers(dices));
  }

  countFromDices(dices: Dice[]){
    let number = count(dices);
    this.setPoints(number)
  }
}
