import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerUiComponent } from './player-ui.component';
import {RouterLinkWithHref} from "@angular/router";
import {PlayerModule} from "../../play-game/main-table/player/player.module";



@NgModule({
  declarations: [
    PlayerUiComponent
  ],
  imports: [
    CommonModule,
    RouterLinkWithHref,
    PlayerModule
  ],
  exports: [
    PlayerUiComponent
  ]
})
export class PlayerUiModule { }
