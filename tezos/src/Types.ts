export interface TFarkleGameStorage {
    creator: TOption<TAddress>;
    state: TNat;
    seed: TNat;
    moveStage: TNat;
    movePoints: TNat;
    winner: TOption<TAddress>;
    currentPlayerDices: TList<TNat>;
    currentPlayerLeavedDices: TList<TNat>;
    bet: TMutez;
    players: TMap<TAddress, TNat>;
    currentPlayer: TOption<TAddress>;
    pointsToWin: TNat;
}

export interface TFarkleGameFactoryStorage {
    activeGames: TSet<TAddress>;
    inactiveGames: TSet<TAddress>;
}

export type CalculatePointsParams = TRecord<{
    size: TNat;
    maxPoints: TNat;
    regularPoints: TNat;
}>;

export type GetAtIndexParams = TRecord<{
    list: TList<TNat>;
    index: TNat;
}>;

export type GetNextKeyParams = TRecord<{
    keys: TList<TAddress>;
    afterKey: TAddress;
}>;
