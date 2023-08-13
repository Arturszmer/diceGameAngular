import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MultipleGameRoutingModule } from './multiple-game-routing.module';
import {MultipleGameComponent} from "./multiple-game.component";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";


@NgModule({
  declarations: [
    MultipleGameComponent
  ],
  imports: [
    CommonModule,
    MultipleGameRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [
    ReactiveFormsModule
  ]
})
export class MultipleGameModule { }
