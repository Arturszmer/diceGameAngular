export interface PlayerDto {
  id: number;
  name: string;
  points: number;
  validations?: Validations;
}

export interface NewPlayer{
  playerName: string;
}

export interface GameDto {
  gameId: string;
  gameStatus: GameStatus;
  players: PlayerDto[];
  adminPlayer: PlayerDto;
  currentTurn: number;
  startGameTime: Date;
  dices: Dice[];
}

export enum GameStatus {
  OPEN,
  STARTED,
  FINISHED
}

export interface OpenGamesResponse {
  content: GameDto[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    totalElements: number;
  };
}

interface Validations {
  isNextPlayer: boolean;
  isRolling: boolean;
  isSaved: boolean;
  isWinner: boolean;
}

export interface Dice {
  value: number;
  isGoodNumber: boolean;
  isChecked: boolean;
  isMultiple: boolean;
  isImmutable: boolean;
}

export interface RollDto{
  dices: Dice[],
  gameId: string
}

export interface RollDicesDto {
  dices: Dice[],
  temporaryPoints: number,
  allPointsFromRoll: number,
  player: PlayerDto;
}
