import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PlayersTableComponent} from "./players-table/players-table.component";
import {JoinByLinkComponent} from "./join-by-link/join-by-link.component";

const routes: Routes = [
  {path: 'multiple-game/:id', component: PlayersTableComponent},
  {path: 'multiple-game/join/:token', component: JoinByLinkComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MultipleGameRoutingModule { }
