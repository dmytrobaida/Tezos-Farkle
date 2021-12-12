import * as Constants from './Constants';
import type * as Types from './Types';

type CalculatePointsParams = TRecord<{
    size: TNat;
    maxPoints: TNat;
    regularPoints: TNat;
}>;

//@ts-ignore
export const calculatePoints: TLambda<CalculatePointsParams, TNat> = (params: CalculatePointsParams): TNat => {
    if (params.size == 3) {
        return params.maxPoints;
    } else if (params.size == 6) {
        return params.maxPoints * 2;
    } else if (params.size > 3) {
        return params.maxPoints + ((5 - params.size) as TNat) * params.regularPoints;
    } else {
        return params.size * params.regularPoints;
    }
};

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
        player1Points: 0,
        player2Points: 0,
        currentPlayer: 0,
    };

    diceCount: TNat = 6;
    maxPointsToWin: TNat = 1000;

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

    // logic: TLambda<TNat, TNat> = (x: TNat): TNat => x + 3;

    @EntryPoint
    throwDices() {
        // Sp.verify(this.storage.state == Constants.GameState.Started, 'Game is not started yet!');

        const dices: TList<TNat> = [];
        let seed = this.storage.seed;
        for (let i = 0; i < this.diceCount; i = i + 1) {
            let currentDice = 0;
            seed = this.getNextRandomValue(seed);

            // Sets dice value based on random seed
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
        this.storage.seed = seed;
        // Calculates points
        let totalPoints = 0;
        const ones: TList<TNat> = [];
        const twos: TList<TNat> = [];
        const threes: TList<TNat> = [];
        const fours: TList<TNat> = [];
        const fives: TList<TNat> = [];
        const sixes: TList<TNat> = [];

        for (const dice of dices) {
            if (dice == 1) {
                ones.push(dice);
            }
            if (dice == 2) {
                twos.push(dice);
            }
            if (dice == 3) {
                threes.push(dice);
            }
            if (dice == 4) {
                fours.push(dice);
            }
            if (dice == 5) {
                fives.push(dice);
            }
            if (dice == 6) {
                sixes.push(dice);
            }
        }

        totalPoints = totalPoints + calculatePoints({ size: ones.size(), regularPoints: 100, maxPoints: 1000 });
        totalPoints = totalPoints + calculatePoints({ size: twos.size(), regularPoints: 0, maxPoints: 200 });
        totalPoints = totalPoints + calculatePoints({ size: threes.size(), regularPoints: 0, maxPoints: 300 });
        totalPoints = totalPoints + calculatePoints({ size: fours.size(), regularPoints: 0, maxPoints: 400 });
        totalPoints = totalPoints + calculatePoints({ size: fives.size(), regularPoints: 50, maxPoints: 500 });
        totalPoints = totalPoints + calculatePoints({ size: sixes.size(), regularPoints: 0, maxPoints: 600 });

        if (this.storage.currentPlayer == 1) {
            this.storage.player1Points = this.storage.player1Points + totalPoints;
        }
        if (this.storage.currentPlayer == 2) {
            this.storage.player2Points = this.storage.player2Points + totalPoints;
        }
        this.storage.dices = dices;
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
            player1Points: 0,
            player2Points: 0,
            currentPlayer: 1,
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
