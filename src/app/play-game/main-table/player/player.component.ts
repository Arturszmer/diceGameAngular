import {Component, OnInit} from '@angular/core';
import {DataService} from "../../dataService";
import {Subscription} from "rxjs";
import {Dices} from "../../../model/dices";

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

  diceNumbers: Dices[] = [];
  subscription?: Subscription;

  constructor(private service: DataService) { }

  ngOnInit(): void {
    this.subscription = this.service.diceNumbers$.subscribe(
      (diceNumbers) => {
        this.diceNumbers = diceNumbers;
        console.log('dice numbers COME TO ME', this.diceNumbers);
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  diceCheck(index: number, dice: Dices) {
    dice.isChecked = !dice.isChecked;
    console.log(index, dice, ' action')
  }
}
