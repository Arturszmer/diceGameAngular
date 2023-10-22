import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-join-game-modal',
  templateUrl: './join-game-modal.component.html',
  styleUrls: ['./join-game-modal.component.css']
})
export class JoinGameModalComponent {

  initialGameForm: FormGroup = new FormGroup<any>({
    playerName: new FormControl(''),
  });
  @Output() playerName: EventEmitter<string> = new EventEmitter<string>();
  @Input() adminName: string = '';
  @Input() gameId: string = '';
  constructor(private activeModal: NgbActiveModal) { }

  close(){
    this.activeModal.close();
  }

  joinGame(){
    this.playerName.emit(this.initialGameForm.get('playerName')?.value)
  }

}
