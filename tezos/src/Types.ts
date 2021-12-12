export interface TFarkleGameStorage {
    creator: TOption<TAddress>;
    gameState: TNat;
    currentSeed: TNat;
    dices: TList<TNat>;
}

export interface TFarkleGameFactoryStorage {
    activeGames: TSet<TAddress>;
}
