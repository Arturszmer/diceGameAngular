import {Dice, PlayerDto} from "../model/dtos";

export interface DataService {

  _players: PlayerDto[];
  playerTurn_: number;
  _player: PlayerDto;
  diceNumbers_: Dice[];

  get players(): PlayerDto[];
  set players(value: PlayerDto[]);
  changeTurn(): number
  addPoints(points: number): void;
  get playerTurn(): number;
  set playerTurn(playerTurn: number);
  nextPlayer(playerTurn: number): void;
  set diceNumbers(dices: Dice[]);
  get diceNumbers(): Dice[];
  set player(playerDto: PlayerDto);
  get player();

}

export abstract class GameDataService implements DataService {
  abstract _player: PlayerDto;
  abstract _players: PlayerDto[];
  abstract diceNumbers_: Dice[];
  abstract playerTurn_: number;

  abstract addPoints(points: number): void;

  abstract changeTurn(): number;

  abstract set diceNumbers(dices: Dice[]);

  abstract nextPlayer(playerTurn: number): void;

  abstract set player(playerDto: PlayerDto);
  abstract get player();

  abstract get playerTurn(): number;

  abstract get players(): PlayerDto[];

}

