import {Component, Input, OnInit} from '@angular/core';
import {PlayerDto} from "../../../../model/playerDto";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-winner-modal',
  templateUrl: './winner-modal.component.html',
  styleUrls: ['./winner-modal.component.css'],
})
export class WinnerModalComponent implements OnInit {

  @Input() playerData?: PlayerDto;
  @Input() players?: PlayerDto[];

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  close(){
    this.activeModal.close();
  }
  restartGame(){
    this.players?.forEach(pl => {
      pl.points = 0;
    })
  }


}
