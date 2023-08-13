import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MultipleGameRoutingModule } from './multiple-game-routing.module';
import {MultipleGameComponent} from "./multiple-game.component";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { PlayersTableComponent } from './players-table/players-table.component';
import {PlayerModule} from "../play-game/main-table/player/player.module";

@NgModule({
  declarations: [
    MultipleGameComponent,
    PlayersTableComponent
  ],
  imports: [
    CommonModule,
    MultipleGameRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    PlayerModule,
  ],
  exports: [
    ReactiveFormsModule
  ]
})
export class MultipleGameModule { }
