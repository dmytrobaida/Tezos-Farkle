export interface TFarkleGameStorage {
    creator: TOption<TAddress>;
    state: TNat;
    seed: TNat;
    moveStage: TNat;
    movePoints: TNat;
    winner: TOption<TAddress>;
    currentPlayerDices: TList<TNat>;
    currentPlayerLeavedDices: TList<TNat>;
    bet: TMutez
    players: TMap<TAddress, TNat>;
    currentPlayer: TOption<TAddress>;
}

export interface TFarkleGameFactoryStorage {
    activeGames: TSet<TAddress>;
    inactiveGames: TSet<TAddress>;
}
