import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PlayersTableComponent} from "./players-table/players-table.component";

const routes: Routes = [
  {path: 'mulitple-game/:id', component: PlayersTableComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MultipleGameRoutingModule { }
