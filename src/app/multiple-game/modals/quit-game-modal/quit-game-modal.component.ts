import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-quit-game-modal',
  templateUrl: './quit-game-modal.component.html',
  styleUrls: ['./quit-game-modal.component.css']
})
export class QuitGameModalComponent implements OnInit {

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  close(){
    this.activeModal.close()
  }

  quit(){
    this.activeModal.close('quit')
  }

}
