export interface Player {
  id: number,
  name: string,
  points: number
}

// import {Dices} from "./dices";
//
// export class Player {
//   private _name: string;
//   private points: number = 0;
//   private dice: Dices;
//   private playerDiv: HTMLDivElement;
//   constructor(public dices: Dices, public elements: HTMLDivElement, public playerName: string) {
//     this.dice = dices;
//     this.playerDiv = elements;
//     this._name = playerName;
//   }
//   get getPoints(): number {
//     return this.points;
//   }
//
//   set setPoints(value: number) {
//     this.points = value;
//   }
//   addPoints(gameResult: number){
//     this.points += gameResult;
//   }
//
//   get name(): string {
//     return this._name;
//   }
//
//   set name(value: string) {
//     this._name = value;
//   }
// }
