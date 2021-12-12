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
        player1: Sp.none,
        player2: Sp.none,
        state: Constants.GameState.Created,
        seed: 0,
        dices: [],
    };

    diceCount: TNat = 6;

    @Inline
    getNextRandomValue = (seed: TNat): TNat => (seed * 16807) % 2147483647;

    @EntryPoint
    startGame() {
        // Sp.verify(this.storage.state != Constants.GameState.Started, 'Game is already started!');

        // Checks if sender is not player1
        if (Sp.sender != this.storage.player1.openSome()) {
            this.storage.player2 = Sp.some(Sp.sender);
            this.storage.state = Constants.GameState.PlayerJoined;
        }
        // Starts game if player2 joined
        if (Sp.sender == this.storage.player1.openSome() && this.storage.state == Constants.GameState.PlayerJoined) {
            this.storage.state = Constants.GameState.Started;
        }
    }

    @EntryPoint
    throwDices() {
        // Sp.verify(this.storage.state == Constants.GameState.Started, 'Game is not started yet!');

        const dices: TList<TNat> = [];
        let seed = this.storage.seed;
        for (let i = 0; i < this.diceCount; i = i + 1) {
            let currentDice = 0;
            seed = this.getNextRandomValue(seed);

            if (seed > 0 && seed <= 357913941) {
                currentDice = 1;
            }
            if (seed > 357913941 && seed <= 715827882) {
                currentDice = 2;
            }
            if (seed > 715827882 && seed <= 1073741823) {
                currentDice = 3;
            }
            if (seed > 1073741823 && seed <= 1431655764) {
                currentDice = 4;
            }
            if (seed > 1431655764 && seed <= 1789569705) {
                currentDice = 5;
            }
            if (seed > 1789569705 && seed <= 2147483646) {
                currentDice = 6;
            }
            
            dices.push(currentDice);
        }
        this.storage.dices = dices;
        this.storage.seed = seed;
    }
}

@Contract
export class FarkleGameFactory {
    storage: Types.TFarkleGameFactoryStorage = {
        activeGames: [],
        inactiveGames: [],
    };

    bytesToNatMap: TMap<TBytes, TNat> = Constants.BytesToNatMap;

    @EntryPoint
    createNewGame() {
        // Calculate seed for random
        const randomBytes: TBytes = Sp.sha256(Sp.pack(Sp.createContractOperation(DummyContract).address as TString));
        let seed: TNat = 0;
        for (let i = 0; i < randomBytes.size(); i = i + 1) {
            seed = seed + this.bytesToNatMap.get(randomBytes.slice(i, 1).openSome()) * 256;
        }
        if (seed <= 0) {
            seed = seed + 2147483646;
        }

        const newContractAddress = Sp.createContract(FarkleGame, {
            creator: Sp.some(Sp.sender),
            state: Constants.GameState.Created,
            player1: Sp.some(Sp.sender),
            player2: Sp.none,
            seed: seed,
            dices: [],
        });

        this.storage.activeGames.add(newContractAddress);
    }

    @EntryPoint
    stopGame() {}
}

Dev.test({ name: 'FarkleGameFactory' }, () => {
    Scenario.h1('Originating Contract');

    const fgf = Scenario.originate(new FarkleGameFactory());
    const bob = Scenario.testAccount('Bob');

    Scenario.transfer(fgf.createNewGame(), {
        sender: bob,
    });
    Scenario.verify(fgf.storage.activeGames.size() == 1);
});

Dev.compileContract('farkleGameFactory', new FarkleGameFactory());
