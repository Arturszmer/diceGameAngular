import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MultipleGameRoutingModule } from './multiple-game-routing.module';
import {MultipleGameComponent} from "./multiple-game.component";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { PlayersTableComponent } from './players-table/players-table.component';
import {PlayerModule} from "../play-single-game/main-table/player/player.module";
import { MultipleRollerDiceComponent } from './players-table/multiple-roller-dice/multiple-roller-dice.component';
import {JoinGameModalComponent} from "./modals/join-game-modal/join-game-modal.component";
import {QuitGameModalComponent} from "./modals/quit-game-modal/quit-game-modal.component";
import { CopyDirectiveDirective } from './directives/copy-directive.directive';
import { JoinByLinkComponent } from './join-by-link/join-by-link.component';
import { MultipleWinnerModalComponent } from './modals/winner-modal/multiple-winner-modal.component';

@NgModule({
  declarations: [
    MultipleGameComponent,
    PlayersTableComponent,
    JoinGameModalComponent,
    MultipleRollerDiceComponent,
    QuitGameModalComponent,
    CopyDirectiveDirective,
    JoinByLinkComponent,
    MultipleWinnerModalComponent
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
  ],
  providers: []
})
export class MultipleGameModule { }
