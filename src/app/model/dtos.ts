export interface PlayerDto {
  id: number;
  name: string;
  points: number;
  active?: boolean;
  validations?: Validations;
}

export interface NewPlayer{
  playerName: string;
}

export interface Points {
  points: number;
  temporaryPoints: number;
  pointsFromRoll: number;
}

export interface GameDto {
  gameId: string;
  gameStatus: GameStatus;
  players: PlayerDto[];
  adminPlayer: PlayerDto;
  currentTurn: number;
  points: Points;
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

export interface SimpMessage {
  type: string;
  gameId: string;
  content: string;
}

export interface GameMessage extends SimpMessage {
  game: GameDto;
  currentPlayer: PlayerDto;
}

export interface WinnerMessage extends SimpMessage {
  isReplay: boolean;
}

export enum MessageTypes {
  ERROR = "error",
  GAME_CREATED = "game.created",
  GAME_JOINED = "game.joined",
  GAME_LEAVE = "game.leave",
  GAME_ROLL = "game.roll",
  GAME_CHECK = "game.check",
  GAME_TURN_CHANGED = "game.game.turn-changed",
  GAME_SAVED = "game.points-saved",
}

export interface JoinMessage extends SimpMessage{
  playerName: string;
}

export interface DiceMessage extends SimpMessage {
  dices: Dice[];
}
