export interface TFarkleGameStorage {
    creator: TOption<TAddress>;
    state: TNat;
    seed: TNat;
    dices: TList<TNat>;
    player1: TOption<TAddress>;
    player2: TOption<TAddress>;
}

export interface TFarkleGameFactoryStorage {
    activeGames: TSet<TAddress>;
    inactiveGames: TSet<TAddress>;
}
