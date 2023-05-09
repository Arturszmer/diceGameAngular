import {Component, Input, OnInit} from '@angular/core';
import {Player} from "../../../../model/player";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-winner-modal',
  templateUrl: './winner-modal.component.html',
  styleUrls: ['./winner-modal.component.css'],
})
export class WinnerModalComponent implements OnInit {

  @Input() playerData?: Player;
  @Input() players?: Player[];

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  close(){
    this.activeModal.close();
  }
  restartGame(){
    console.log(this.players, 'players')
    this.players?.forEach(pl => {
      pl.points = 0;
    })
  }


}
