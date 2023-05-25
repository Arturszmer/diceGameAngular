import {Component, OnInit, AfterViewInit} from "@angular/core";
import {Router} from "@angular/router";
import {Player} from "../model/player";
import {DataService} from "../play-game/main-table/services/dataService";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";

/**
 * - brakuje walidacji co do unikalnosci nazw graczy.
 * - tworzenie i przechowywanie danych graczy powinno odbywac sie w serwisie
 */
@UntilDestroy()
@Component({
  selector: "app-main-page",
  templateUrl: "./main-page.component.html",
  styleUrls: ["./main-page.component.css"],
})
export class MainPageComponent implements OnInit, AfterViewInit {

  myForm!: FormGroup;

  playersNumber: FormControl = new FormControl<number>(2);
  private currentPlayersInputs_: number = 0;
  private players_: Player[] = [];
  names: string[] = [];

  constructor(private router: Router, private data: DataService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.myForm = this.fb.group({
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

  get pForms(): FormArray<FormGroup>{
    return this.myForm?.get('fPlayers') as FormArray<FormGroup>;
  }

  onSubmit() {
    //Dodać własnego validatora który sprawdza unikalność imion
    for (let pName of this.pForms.controls){
      if (!this.names.includes(pName.controls['name'].value)){
        this.names.push(pName.controls['name'].value)
        this.players_.push({
          id: pName.controls['id'].value,
          name: pName.controls['name'].value,
          points: pName.controls['points'].value
        })
      } else {
        pName.setErrors({'unique' : 'your names isnt unique'})
        this.myForm.setErrors({'unique' : 'your names isnt unique'})
        this.names = [];
        return
      }
    }
    this.names = []
    this.data.setGameData(this.players_);


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

    /**
     *  osobna metoda. i to w niej by mdal generowanie uniqueId.
     *  Wtedy spokojnie moze to byc zmienna istniejaca tylko w scope metody
     *  zamiast w scope calego komponentu.
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
          id: this.pForms.length + 1,
          name: ['', [Validators.required, Validators.minLength(3)]],
          points: 0
        })
        this.pForms.push(player);
        delta--;
      }
      if (delta < 0){
        this.pop();
        delta++;
      }
    }
  }

  private pop(){
    this.remove(this.pForms.length -1)
  }

  private remove(index: number){
    this.pForms.removeAt(index)
  }

}
