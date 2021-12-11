export interface TFarkleGameStorage {
    creator: TAddress;
    gameState: TString;
    currentSeed: TNat;
}

export interface TFarkleGameFactoryStorage {
    activeGames: TSet<TAddress>;
}