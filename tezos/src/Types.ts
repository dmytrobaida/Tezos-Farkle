export interface TFarkleGameStorage {
    creator: TOption<TAddress>;
    state: TNat;
    seed: TNat;
    player1: TOption<TAddress>;
    player2: TOption<TAddress>;
    player1Points: TNat;
    player2Points: TNat;
    currentPlayer: TNat;
    moveStage: TNat;
    movePoints: TNat;
    winner: TOption<TAddress>;
    currentPlayerDices: TList<TNat>;
    currentPlayerLeavedDices: TList<TNat>;
}

export interface TFarkleGameFactoryStorage {
    activeGames: TSet<TAddress>;
    inactiveGames: TSet<TAddress>;
}
