export interface PlayerDto {
  id: number,
  name: string,
  points: number
}

export interface GameDto {
  gameId: string,
  gameStatus: GameStatus,
  players: PlayerDto[],
  adminPlayer: PlayerDto;
  currentTurn: number;
  startGameTime: Date;
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
