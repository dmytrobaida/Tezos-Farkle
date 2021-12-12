import * as Constants from './Constants';
import type * as Types from './Types';

@Contract
export class DummyContract {
    storage = {
        dummy: 0,
    };
}

@Contract
export class FarkleGame {
    storage: Types.TFarkleGameStorage = {
        creator: Sp.none,
        gameState: Constants.GameState.Created,
        currentSeed: 0,
        dices: [],
    };

    diceCount: TNat = 6;
    bytesToNatMap: TMap<TBytes, TNat> = Constants.BytesToNatMap;

    @Inline
    getNextRandomValue = (seed: TNat): TNat => (seed * 16807) % 2147483647;

    @Inline
    getRandomInRange = (min: TNat, max: TNat): TNat =>
        (((this.storage.currentSeed - 1) as TNat) / 2147483646) * ((max - min) as TNat) + min;

    @EntryPoint
    startGame() {
        // Calculate seed for random
        const randomBytes: TBytes = Sp.sha256(Sp.pack(Sp.createContractOperation(DummyContract).address as TString));
        let x: TNat = 0;
        let totalValue: TNat = 0;
        while (x < randomBytes.size()) {
            totalValue = totalValue + this.bytesToNatMap.get(randomBytes.slice(x, 1).openSome()) * 256;
            x = x + 1;
        }
        if (totalValue <= 0) {
            totalValue = totalValue + 2147483646;
        }

        // Set contract state
        this.storage.currentSeed = totalValue;
        this.storage.gameState = Constants.GameState.Created;
    }

    @EntryPoint
    throwDices() {
        const dices: TList<TNat> = [];
        // Set contract state
        for (let i = 0; i < this.diceCount; i = i + 1) {
            dices.push(this.getRandomInRange(1 as TNat, 6 as TNat));
            this.storage.currentSeed = this.getNextRandomValue(this.storage.currentSeed);
        }
        this.storage.dices = dices;
    }
}

@Contract
export class FarkleGameFactory {
    storage: Types.TFarkleGameFactoryStorage = {
        activeGames: [],
    };

    @EntryPoint
    createNewGame() {
        const newContractAddress = Sp.createContract(FarkleGame, {
            creator: Sp.some(Sp.sender),
            gameState: Constants.GameState.Created,
            currentSeed: 0,
            dices: [],
        });

        this.storage.activeGames.add(newContractAddress);
    }

    @EntryPoint
    stopGame() {}
}

Dev.test({ name: 'FarkleGame' }, () => {
    Scenario.h1('Originating Contract');
    const c1 = Scenario.originate(new FarkleGame());

    Scenario.transfer(c1.startGame());
});

Dev.compileContract('farkleGameFactory', new FarkleGameFactory());
