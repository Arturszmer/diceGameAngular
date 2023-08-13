import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SingleGameComponent } from './single-game/single-game.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { PlayGameComponent } from './play-game/play-game.component';
import { MainTableComponent } from './play-game/main-table/main-table.component';
import { AppRoutingModule } from './app-routing.module';
import { RollerDiceComponent } from './play-game/main-table/roller-dice/roller-dice.component';
import { WinnerModalComponent } from './play-game/main-table/roller-dice/winner-modal/winner-modal.component';
import { WinnerModalContentComponent } from './play-game/main-table/roller-dice/winner-modal/winner-modal-content/winner-modal-content.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {PlayerModule} from "./play-game/main-table/player/player.module";
import { StartPageComponent } from './start-page/start-page.component';
import {MultipleGameModule} from "./multiple-game/multiple-game.module";

@NgModule({
  declarations: [
    AppComponent,
    SingleGameComponent,
    PlayGameComponent,
    MainTableComponent,
    RollerDiceComponent,
    WinnerModalComponent,
    WinnerModalContentComponent,
    StartPageComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    PlayerModule,
    MultipleGameModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [
    ReactiveFormsModule
  ]
})
export class AppModule { }
