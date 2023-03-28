import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import {FormsModule} from "@angular/forms";
import { PlayGameComponent } from './play-game/play-game.component';
import { MainTableComponent } from './play-game/main-table/main-table.component';
import { AppRoutingModule } from './app-routing.module';
import { PlayerComponent } from './play-game/main-table/player/player.component';
import { RollerDiceComponent } from './play-game/main-table/roller-dice/roller-dice.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    PlayGameComponent,
    MainTableComponent,
    PlayerComponent,
    RollerDiceComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
