import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PlayerDto} from "../../../model/playerDto";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-winner-modal',
  templateUrl: './multiple-winner-modal.component.html',
  styleUrls: ['./multiple-winner-modal.component.css']
})
export class MultipleWinnerModalComponent implements OnInit {


  @Input() playerData?: PlayerDto;
  @Output() restartGame: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  close(){
    this.activeModal.close();
    this.restartGame.emit(false);
  }
  notifyToRestartGame(){
    this.restartGame.emit(true);
    this.activeModal.close();
  }

}
