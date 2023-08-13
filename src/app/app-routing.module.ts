import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {SingleGameComponent} from "./single-game/single-game.component";
import {PlayGameComponent} from "./play-game/play-game.component";
import {StartPageComponent} from "./start-page/start-page.component";
import {MultipleGameComponent} from "./multiple-game/multiple-game.component";

const routes: Routes = [
  { path: '', component: StartPageComponent},
  { path: 'single-game', component: SingleGameComponent},
  { path: 'multiple-game', component: MultipleGameComponent},
  { path: 'game/:id', component: PlayGameComponent}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
