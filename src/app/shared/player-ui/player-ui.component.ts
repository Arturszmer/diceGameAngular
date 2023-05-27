import {Component, Input, OnInit} from '@angular/core';
import {Player} from "../../model/player";

@Component({
  selector: 'scc-player-ui',
  templateUrl: './player-ui.component.html',
  styleUrls: ['./player-ui.component.css']
})
export class PlayerUiComponent implements OnInit {

  @Input() player!: Player;
  @Input() playerTurn!: number;

  constructor() { }

  ngOnInit(): void {
    console.log(this.player, ' player in dumnp component');
    console.log(this.playerTurn, ' turn in dumnp component')

  }

}
