import {Component, OnInit, AfterViewInit} from "@angular/core";
import {Router} from "@angular/router";
import {PlayerDto} from "../model/dtos";
import {SingleGameDataService} from "../play-single-game/main-table/services/single-game-data.service";
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";

export function uniqueNamesValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const controlsValues = (control as FormArray)?.value
      ?.map((val: any) => val.name)
      .filter((val: any) => val !== "");

    const temp = Array.from(new Set(controlsValues))
    return controlsValues.length === temp.length ? null : {unique: "Your names are not unique"};
  };
}
@UntilDestroy()
@Component({
  selector: "app-main-page",
  templateUrl: "./single-game.component.html",
  styleUrls: ["./single-game.component.css"],
})
export class SingleGameComponent implements OnInit, AfterViewInit {

  initialGameForm!: FormGroup;

  playersNumber: FormControl = new FormControl<number>(2);
  private currentPlayersInputs_: number = 0;
  private players_: PlayerDto[] = [];

  constructor(private router: Router, private dataService: SingleGameDataService, private fb: FormBuilder) {}

  ngOnInit(): void {

    this.initialGameForm = this.fb.group({
      fPlayers: this.fb.array([], uniqueNamesValidator())
    })

    this.setPlayersFieldsNumberTo(this.playersNumber.value)
    this.currentPlayersInputs_ = this.playersNumber.value;
  }

  ngAfterViewInit(): void {
    this.playersNumber.valueChanges
      .pipe(untilDestroyed(this))
      .subscribe((value) => {
      this.setPlayersFieldsNumberTo(value);
      this.currentPlayersInputs_ = value;
    })
  }

  get playersForm(): FormArray<FormGroup>{
    return this.initialGameForm?.get('fPlayers') as FormArray<FormGroup>;
  }

  onSubmit() {
    this.playersForm.controls.forEach((player) => this.players_.push({
      id: player.controls['id'].value,
      name: player.controls['name'].value,
      points: player.controls['points'].value
    }))
    this.dataService.setGamePlayers(this.players_);
    this.generateUniqueIdAndSubmit()
  }

  private generateUniqueIdAndSubmit(): void {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < 8; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    this.router.navigate(["/game", result]);
  }

  private setPlayersFieldsNumberTo(val: number) {
    let delta = val - this.currentPlayersInputs_;

    while (delta !== 0){
      if(delta > 0){
        const player = this.fb.group({
          id: this.playersForm.length + 1,
          name: ['', [Validators.required, Validators.minLength(3)]],
          points: 0
        })
        this.playersForm.push(player);
        delta--;
      }
      if (delta < 0){
        this.pop();
        delta++;
      }
    }
  }

  private pop(){
    this.remove(this.playersForm.length -1)
  }

  private remove(index: number){
    this.playersForm.removeAt(index)
  }

}
