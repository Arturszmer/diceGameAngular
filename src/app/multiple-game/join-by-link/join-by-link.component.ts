import { Component, OnInit } from '@angular/core';
import {MultipleGameCreationService} from "../services/multiple-game-creation.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-join-by-link',
  templateUrl: './join-by-link.component.html',
  styleUrls: ['./join-by-link.component.css']
})
export class JoinByLinkComponent implements OnInit {

  constructor(private gameCreationService: MultipleGameCreationService,
              private activeRouter: ActivatedRoute) { }

  ngOnInit(): void {
    let token: string | null;
    this.activeRouter.paramMap.subscribe(params => {
      token = params.get('token')
      if (token){
          this.gameCreationService.joinGame(token!)
      }
    })
  }

}
