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

type GetNextKeyParams = TRecord<{
    keys: TList<TAddress>;
    afterKey: TAddress;
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

//@ts-ignore
export const getNextKey: TLambda<GetNextKeyParams, TAddress> = (params: GetNextKeyParams): TAddress => {
    let index = 0;
    let foundIndex = 0;
    const keys: TList<TAddress> = params.keys;
    for (const key of keys) {
        if (key == params.afterKey) {
            foundIndex = index + 1;
        }
        index = index + 1;
    }
    if (foundIndex == keys.size()) {
        foundIndex = 0;
    }
    index = 0;
    let foundItem: TOption<TAddress> = Sp.none;
    for (const key of keys) {
        if (index == foundIndex) {
            foundItem = Sp.some(key);
        }
        index = index + 1;
    }
    return foundItem.openSome();
};

// Dummy contract used for random address generation
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
        state: Constants.GameState.Created,
        seed: 0,
        currentPlayerDices: [],
        currentPlayerLeavedDices: [],
        moveStage: 0,
        winner: Sp.none,
        movePoints: 0,
        bet: 0,
        currentPlayer: Sp.none,
        players: [],
    };

    diceCount: TNat = 6;
    maxPointsToWin: TNat = 2000;

    @EntryPoint
    startGame() {
        Sp.verify(
            this.storage.state == Constants.GameState.Created || this.storage.state == Constants.GameState.PlayerJoined,
            'Game is already started!',
        );
        Sp.verify(Sp.amount >= this.storage.bet, 'You must bet required amount!');

        // Checks if sender is not creator
        if (Sp.sender != this.storage.creator.openSome()) {
            this.storage.players.set(Sp.sender, 0);
            this.storage.state = Constants.GameState.PlayerJoined;
        }
        // Starts game if player2 joined
        if (Sp.sender == this.storage.creator.openSome() && this.storage.state == Constants.GameState.PlayerJoined) {
            this.storage.state = Constants.GameState.Started;
        }
    }

    @EntryPoint
    throwDices(leaveDiceIndexes: TOption<TSet<TNat>>) {
        Sp.verify(this.storage.state == Constants.GameState.Started, 'Game is not started yet!');
        Sp.verify(this.storage.currentPlayer.openSome() == Sp.sender, 'Is not your turn!');

        if (this.storage.moveStage == 0 && leaveDiceIndexes.isSome() && leaveDiceIndexes.openSome().size() > 0) {
            Sp.failWith('You cant leave dices at current stage!');
        }

        const dices: TList<TNat> = [];
        const leavedDices: TList<TNat> = [];
        let seed: TNat = this.storage.seed;
        let diceCount = this.diceCount;

        // Set dice count in case if player leaved some from previous move
        if (this.storage.currentPlayerDices.size() > 0) {
            diceCount = this.storage.currentPlayerDices.size();
        }

        for (let i = 0; i < diceCount; i = i + 1) {
            // Save leaved dice and skip random generation for this dice
            if (leaveDiceIndexes.isSome() && leaveDiceIndexes.openSome().contains(i)) {
                const leavedDice = getAtIndex({
                    list: this.storage.currentPlayerDices,
                    index: i,
                });
                leavedDices.push(leavedDice);
            } else {
                // Generate new random dice value
                const currentDice = getDiceValue(seed);
                seed = getNextRandomValue(seed);
                dices.push(currentDice);
            }
        }
        // Store seed value for next move
        this.storage.seed = seed;

        const currentDicesPoints = calculateTotalPoints(dices);

        // Check if current points is zero
        if (currentDicesPoints == 0) {
            // Player loses all move points
            this.storage.moveStage = 0;
            this.storage.movePoints = 0;
            this.storage.currentPlayerDices = [];
            this.storage.currentPlayerLeavedDices = [];
        } else {
            // Calculation of leaved dice points
            const leavedDicesPoints = calculateTotalPoints(leavedDices);
            this.storage.movePoints = leavedDicesPoints + currentDicesPoints;
            this.storage.currentPlayerDices = dices;
            this.storage.currentPlayerLeavedDices = leavedDices;
        }

        // Check if some player win
        if (this.storage.movePoints + this.storage.players.get(Sp.sender) >= this.maxPointsToWin) {
            // Game is finished!
            this.storage.state = Constants.GameState.Finished;
            this.storage.winner = Sp.some(Sp.sender);
            // Transfer money to the winner!
            Sp.transfer(Sp.unit, Sp.balance, Sp.contract<TUnit>(Sp.sender).openSome());
        } else {
            // Increment move stage
            this.storage.moveStage = this.storage.moveStage + 1;
        }
    }

    @EntryPoint
    endMove() {
        Sp.verify(this.storage.state == Constants.GameState.Started, 'Game is not started yet!');
        Sp.verify(this.storage.currentPlayer.openSome() == Sp.sender, 'Is not your turn!');

        // Set points for current user and clears state before next players move
        this.storage.players.set(Sp.sender, this.storage.players.get(Sp.sender) + this.storage.movePoints);
        this.storage.currentPlayer = Sp.some(
            getNextKey({
                keys: this.storage.players.keys(),
                afterKey: this.storage.currentPlayer.openSome(),
            }),
        );
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
    createNewGame(bet: TMutez) {
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
            seed: seed,
            currentPlayerDices: [],
            currentPlayerLeavedDices: [],
            winner: Sp.none,
            moveStage: 0,
            movePoints: 0,
            bet: bet,
            players: [[Sp.sender, 0]],
            currentPlayer: Sp.some(Sp.sender),
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

    Scenario.transfer(fgf.createNewGame(10), {
        sender: bob,
    });
    Scenario.verify(fgf.storage.activeGames.size() == 1);
});

Dev.compileContract('farkleGameFactory', new FarkleGameFactory());
