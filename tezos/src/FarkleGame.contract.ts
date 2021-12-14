import * as Constants from './Constants';
import type * as Types from './Types';

type CalculatePointsParams = TRecord<{
    size: TNat;
    maxPoints: TNat;
    regularPoints: TNat;
}>;

type GetAtIndexParams = TRecord<{
    list: TList<TNat>;
    index: TNat;
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

//@ts-ignore
export const getDiceValue: TLambda<TNat, TNat> = (seed: TNat): TNat => {
    // Sets dice value based on random seed
    let diceValue = 0;
    if (seed > 0 && seed <= 357913941) {
        diceValue = 1;
    }
    if (seed > 357913941 && seed <= 715827882) {
        diceValue = 2;
    }
    if (seed > 715827882 && seed <= 1073741823) {
        diceValue = 3;
    }
    if (seed > 1073741823 && seed <= 1431655764) {
        diceValue = 4;
    }
    if (seed > 1431655764 && seed <= 1789569705) {
        diceValue = 5;
    }
    if (seed > 1789569705 && seed <= 2147483646) {
        diceValue = 6;
    }
    return diceValue;
};

//@ts-ignore
export const getNextRandomValue: TLambda<TNat, TNat> = (seed: TNat): TNat => (seed * 16807) % 2147483647;

//@ts-ignore
export const getAtIndex: TLambda<GetAtIndexParams, TNat> = (params: GetAtIndexParams): TNat => {
    let index = 0;
    let foundItem = 0;
    for (const li of params.list) {
        if (index == params.index) {
            foundItem = li;
        }
        index = index + 1;
    }
    return foundItem;
};

//@ts-ignore
export const calculateTotalPoints: TLambda<TList<TNat>, TNat> = (dices: TList<TNat>): TNat => {
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

    return totalPoints;
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
        currentPlayerDices: [],
        currentPlayerLeavedDices: [],
        player1Points: 0,
        player2Points: 0,
        currentPlayer: 0,
        moveStage: 0,
        winner: Sp.none,
        movePoints: 0,
    };

    diceCount: TNat = 6;
    maxPointsToWin: TNat = 2000;

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
    throwDices(leaveDiceIndexes: TOption<TSet<TNat>>) {
        // Sp.verify(this.storage.state == Constants.GameState.Started, 'Game is not started yet!');
        if (this.storage.moveStage == 0 && leaveDiceIndexes.isSome() && leaveDiceIndexes.openSome().size() > 0) {
            Sp.failWith('You cant leave dices at current stage!');
        }
        if (this.storage.currentPlayer == 1) {
            Sp.verify(Sp.sender == this.storage.player1.openSome(), 'Is not your turn!');
        } else {
            Sp.verify(Sp.sender == this.storage.player2.openSome(), 'Is not your turn!');
        }

        const dices: TList<TNat> = [];
        const leavedDices: TList<TNat> = [];
        let seed: TNat = this.storage.seed;
        let diceCount = this.diceCount;

        if (this.storage.currentPlayerDices.size() > 0) {
            diceCount = this.storage.currentPlayerDices.size();
        }

        for (let i = 0; i < diceCount; i = i + 1) {
            if (leaveDiceIndexes.isSome() && leaveDiceIndexes.openSome().contains(i)) {
                const leavedDice = getAtIndex({
                    list: this.storage.currentPlayerDices,
                    index: i,
                });
                leavedDices.push(leavedDice);
            } else {
                const currentDice = getDiceValue(seed);
                seed = getNextRandomValue(seed);
                dices.push(currentDice);
            }
        }
        this.storage.currentPlayerDices = dices;
        this.storage.currentPlayerLeavedDices = leavedDices;
        this.storage.seed = seed;

        const currentDicesPoints = calculateTotalPoints(dices);

        if (currentDicesPoints == 0) {
            // TODO: add end move logic
            this.storage.movePoints = 0;
        } else {
            const leavedDicesPoints = calculateTotalPoints(leavedDices);
            this.storage.movePoints = leavedDicesPoints + currentDicesPoints;
        }

        if (
            this.storage.movePoints + this.storage.player1Points >= this.maxPointsToWin ||
            this.storage.movePoints + this.storage.player2Points >= this.maxPointsToWin
        ) {
            this.storage.state = Constants.GameState.Finished;
            this.storage.winner = Sp.some(Sp.sender);
        } else {
            this.storage.moveStage = this.storage.moveStage + 1;
        }
    }

    @EntryPoint
    endMove() {
        // Sp.verify(this.storage.state == Constants.GameState.Started, 'Game is not started yet!');
        if (this.storage.currentPlayer == 1) {
            Sp.verify(Sp.sender == this.storage.player1.openSome(), 'Is not your turn!');
        } else {
            Sp.verify(Sp.sender == this.storage.player2.openSome(), 'Is not your turn!');
        }

        if (this.storage.currentPlayer == 1) {
            this.storage.currentPlayer = 2;
            this.storage.player1Points = this.storage.player1Points + this.storage.movePoints;
        } else {
            this.storage.currentPlayer = 1;
            this.storage.player2Points = this.storage.player2Points + this.storage.movePoints;
        }
        this.storage.moveStage = 0;
        this.storage.movePoints = 0;
        this.storage.currentPlayerDices = [];
        this.storage.currentPlayerLeavedDices = [];
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
            player1Points: 0,
            player2Points: 0,
            currentPlayer: 1,
            currentPlayerDices: [],
            currentPlayerLeavedDices: [],
            moveStage: 0,
            winner: Sp.none,
            movePoints: 0,
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
