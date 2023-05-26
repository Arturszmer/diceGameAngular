import {Component, OnInit, AfterViewInit} from "@angular/core";
import {Router} from "@angular/router";
import {Player} from "../model/player";
import {DataService} from "../play-game/main-table/services/dataService";
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

//TODO: spróbować zrobić customowego validatora
export function forbiddenNameValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    console.log('control',control )
    const forbidden = control.value
    //validacja przypisana do pola control.parent (poziom wyżej?)
    return null;
  };
}
/**
 * - brakuje walidacji co do unikalnosci nazw graczy. //coś tam jest ale nie do końca chce działać
 * - tworzenie i przechowywanie danych graczy powinno odbywac sie w serwisie
 */
@UntilDestroy()
@Component({
  selector: "app-main-page",
  templateUrl: "./main-page.component.html",
  styleUrls: ["./main-page.component.css"],
})
export class MainPageComponent implements OnInit, AfterViewInit {

  initialGameForm!: FormGroup;

  playersNumber: FormControl = new FormControl<number>(2);
  private currentPlayersInputs_: number = 0;
  private players_: Player[] = [];

  constructor(private router: Router, private data: DataService, private fb: FormBuilder) {}

  ngOnInit(): void {

    this.initialGameForm = this.fb.group({
      fPlayers: this.fb.array([])
    })

    this.addPLayerFields(this.playersNumber.value)
    this.currentPlayersInputs_ = this.playersNumber.value;
  }

  ngAfterViewInit(): void {
    this.playersNumber.valueChanges
      .pipe(untilDestroyed(this))
      .subscribe((val) => {
      this.addPLayerFields(val);
      this.currentPlayersInputs_ = val;
    })
  }

  get playersForm(): FormArray<FormGroup>{
    return this.initialGameForm?.get('fPlayers') as FormArray<FormGroup>;
  }

  onSubmit() {
    let names: string[] = []
    //Dodać własnego validatora który sprawdza unikalność imion
    for (let pName of this.playersForm.controls){
      if (!names.includes(pName.controls['name'].value)){
        names.push(pName.controls['name'].value)
        this.players_.push({
          id: pName.controls['id'].value,
          name: pName.controls['name'].value,
          points: pName.controls['points'].value
        })
      } else {
        pName.setErrors({'unique' : 'your names isnt unique'})
        this.initialGameForm.setErrors({'unique' : 'your names isnt unique'})
        names = [];
        return
      }
    }
    this.data.setGamePlayers(this.players_);


    /**
     * to manulane iterownie przy uzyciu reactive forms w ogole by nie zachodzilo,
     * bo byś mial mozliwosc sprawdzenia poprawnosci calego formularza.
     *
     * ale co mozemy zrobic z tym podejsciem ktore tu zastosowales:
     *  - możesz stworzyc w html w <form ngForm="form"> co pozwoli zagregowac wszystkie ngModele z
     *    tego formularza w jedno i tez uzyc przeznaczonych do walidacji metod w celu sprawdzenia poprwanosci danych.
     *    https://angular.io/guide/forms
     *  -
     */

    this.generateUniqueIdAndSubmit()
  }

  // metoda powinna byc prywatna. uzywana jest tylko wewnatrz komponentu
  private generateUniqueIdAndSubmit(): void {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < 8; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    this.router.navigate(["/game", result]) // dopytać co znaczy ten promis z metody navigate
  }
//
  private addPLayerFields(val: number) {
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
