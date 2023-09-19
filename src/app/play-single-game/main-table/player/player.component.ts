import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Dice} from "../../../model/dtos";

export const playerStorage = (id: number) => `player_${id}`

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent{

  @Input() points: number = 0;
  @Input() diceNumbers!: Dice[];
  @Output() diceChecked: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  diceCheck(index: number) {
    this.diceChecked.emit(index);
  }
}
