import type * as Types from './Types';
// import * as Utils from './Utils';

export const GameState = {
    Created: 'created',
    Started: 'started',
    Finished: 'finished',
};

@Contract
export class DummyContract {
    storage = {
        dummy: '',
    };
}

@Contract
export class FarkleGame {
    storage: Types.TFarkleGameStorage = {
        creator: '',
        gameState: GameState.Created,
        currentSeed: 0,
    };

    bytesToNatMap: TMap<TBytes, TNat> = [
        ['0x00', 0],
        ['0x01', 1],
        ['0x02', 2],
        ['0x03', 3],
        ['0x04', 4],
        ['0x05', 5],
        ['0x06', 6],
        ['0x07', 7],
        ['0x08', 8],
        ['0x09', 9],
        ['0x0a', 10],
        ['0x0b', 11],
        ['0x0c', 12],
        ['0x0d', 13],
        ['0x0e', 14],
        ['0x0f', 15],
        ['0x10', 16],
        ['0x11', 17],
        ['0x12', 18],
        ['0x13', 19],
        ['0x14', 20],
        ['0x15', 21],
        ['0x16', 22],
        ['0x17', 23],
        ['0x18', 24],
        ['0x19', 25],
        ['0x1a', 26],
        ['0x1b', 27],
        ['0x1c', 28],
        ['0x1d', 29],
        ['0x1e', 30],
        ['0x1f', 31],
        ['0x20', 32],
        ['0x21', 33],
        ['0x22', 34],
        ['0x23', 35],
        ['0x24', 36],
        ['0x25', 37],
        ['0x26', 38],
        ['0x27', 39],
        ['0x28', 40],
        ['0x29', 41],
        ['0x2a', 42],
        ['0x2b', 43],
        ['0x2c', 44],
        ['0x2d', 45],
        ['0x2e', 46],
        ['0x2f', 47],
        ['0x30', 48],
        ['0x31', 49],
        ['0x32', 50],
        ['0x33', 51],
        ['0x34', 52],
        ['0x35', 53],
        ['0x36', 54],
        ['0x37', 55],
        ['0x38', 56],
        ['0x39', 57],
        ['0x3a', 58],
        ['0x3b', 59],
        ['0x3c', 60],
        ['0x3d', 61],
        ['0x3e', 62],
        ['0x3f', 63],
        ['0x40', 64],
        ['0x41', 65],
        ['0x42', 66],
        ['0x43', 67],
        ['0x44', 68],
        ['0x45', 69],
        ['0x46', 70],
        ['0x47', 71],
        ['0x48', 72],
        ['0x49', 73],
        ['0x4a', 74],
        ['0x4b', 75],
        ['0x4c', 76],
        ['0x4d', 77],
        ['0x4e', 78],
        ['0x4f', 79],
        ['0x50', 80],
        ['0x51', 81],
        ['0x52', 82],
        ['0x53', 83],
        ['0x54', 84],
        ['0x55', 85],
        ['0x56', 86],
        ['0x57', 87],
        ['0x58', 88],
        ['0x59', 89],
        ['0x5a', 90],
        ['0x5b', 91],
        ['0x5c', 92],
        ['0x5d', 93],
        ['0x5e', 94],
        ['0x5f', 95],
        ['0x60', 96],
        ['0x61', 97],
        ['0x62', 98],
        ['0x63', 99],
        ['0x64', 100],
        ['0x65', 101],
        ['0x66', 102],
        ['0x67', 103],
        ['0x68', 104],
        ['0x69', 105],
        ['0x6a', 106],
        ['0x6b', 107],
        ['0x6c', 108],
        ['0x6d', 109],
        ['0x6e', 110],
        ['0x6f', 111],
        ['0x70', 112],
        ['0x71', 113],
        ['0x72', 114],
        ['0x73', 115],
        ['0x74', 116],
        ['0x75', 117],
        ['0x76', 118],
        ['0x77', 119],
        ['0x78', 120],
        ['0x79', 121],
        ['0x7a', 122],
        ['0x7b', 123],
        ['0x7c', 124],
        ['0x7d', 125],
        ['0x7e', 126],
        ['0x7f', 127],
        ['0x80', 128],
        ['0x81', 129],
        ['0x82', 130],
        ['0x83', 131],
        ['0x84', 132],
        ['0x85', 133],
        ['0x86', 134],
        ['0x87', 135],
        ['0x88', 136],
        ['0x89', 137],
        ['0x8a', 138],
        ['0x8b', 139],
        ['0x8c', 140],
        ['0x8d', 141],
        ['0x8e', 142],
        ['0x8f', 143],
        ['0x90', 144],
        ['0x91', 145],
        ['0x92', 146],
        ['0x93', 147],
        ['0x94', 148],
        ['0x95', 149],
        ['0x96', 150],
        ['0x97', 151],
        ['0x98', 152],
        ['0x99', 153],
        ['0x9a', 154],
        ['0x9b', 155],
        ['0x9c', 156],
        ['0x9d', 157],
        ['0x9e', 158],
        ['0x9f', 159],
        ['0xa0', 160],
        ['0xa1', 161],
        ['0xa2', 162],
        ['0xa3', 163],
        ['0xa4', 164],
        ['0xa5', 165],
        ['0xa6', 166],
        ['0xa7', 167],
        ['0xa8', 168],
        ['0xa9', 169],
        ['0xaa', 170],
        ['0xab', 171],
        ['0xac', 172],
        ['0xad', 173],
        ['0xae', 174],
        ['0xaf', 175],
        ['0xb0', 176],
        ['0xb1', 177],
        ['0xb2', 178],
        ['0xb3', 179],
        ['0xb4', 180],
        ['0xb5', 181],
        ['0xb6', 182],
        ['0xb7', 183],
        ['0xb8', 184],
        ['0xb9', 185],
        ['0xba', 186],
        ['0xbb', 187],
        ['0xbc', 188],
        ['0xbd', 189],
        ['0xbe', 190],
        ['0xbf', 191],
        ['0xc0', 192],
        ['0xc1', 193],
        ['0xc2', 194],
        ['0xc3', 195],
        ['0xc4', 196],
        ['0xc5', 197],
        ['0xc6', 198],
        ['0xc7', 199],
        ['0xc8', 200],
        ['0xc9', 201],
        ['0xca', 202],
        ['0xcb', 203],
        ['0xcc', 204],
        ['0xcd', 205],
        ['0xce', 206],
        ['0xcf', 207],
        ['0xd0', 208],
        ['0xd1', 209],
        ['0xd2', 210],
        ['0xd3', 211],
        ['0xd4', 212],
        ['0xd5', 213],
        ['0xd6', 214],
        ['0xd7', 215],
        ['0xd8', 216],
        ['0xd9', 217],
        ['0xda', 218],
        ['0xdb', 219],
        ['0xdc', 220],
        ['0xdd', 221],
        ['0xde', 222],
        ['0xdf', 223],
        ['0xe0', 224],
        ['0xe1', 225],
        ['0xe2', 226],
        ['0xe3', 227],
        ['0xe4', 228],
        ['0xe5', 229],
        ['0xe6', 230],
        ['0xe7', 231],
        ['0xe8', 232],
        ['0xe9', 233],
        ['0xea', 234],
        ['0xeb', 235],
        ['0xec', 236],
        ['0xed', 237],
        ['0xee', 238],
        ['0xef', 239],
        ['0xf0', 240],
        ['0xf1', 241],
        ['0xf2', 242],
        ['0xf3', 243],
        ['0xf4', 244],
        ['0xf5', 245],
        ['0xf6', 246],
        ['0xf7', 247],
        ['0xf8', 248],
        ['0xf9', 249],
        ['0xfa', 250],
        ['0xfb', 251],
        ['0xfc', 252],
        ['0xfd', 253],
        ['0xfe', 254],
        ['0xff', 255],
    ];

    @Inline
    getNextRandomValue = (seed: TNat) => (seed * 16807) % 2147483647;

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
        this.storage.gameState = GameState.Started;
    }

    @EntryPoint
    throwDices() {
        // Set contract state
        this.storage.currentSeed = this.getNextRandomValue(this.storage.currentSeed);
    }

    @OffChainView({
        pure: true,
        description: 'Returns game creator',
    })
    getCreator = () => {
        return this.storage.creator;
    };
}

@Contract
export class FarkleGameFactory {
    storage: Types.TFarkleGameFactoryStorage = {
        activeGames: [],
    };

    @EntryPoint
    createNewGame() {
        const newContractAddress = Sp.createContract(FarkleGame, {
            creator: Sp.sender,
            gameState: GameState.Created,
            currentSeed: 0,
        });

        this.storage.activeGames.add(newContractAddress);
    }

    @EntryPoint
    stopGame() {}

    @OffChainView({
        pure: true,
        description: 'Returns list of active games',
    })
    getActiveGames = () => {
        return this.storage.activeGames;
    };
}

Dev.test({ name: 'FarkleGame' }, () => {
    Scenario.h1('Originating Contract');
    const c1 = Scenario.originate(new FarkleGame());
    
    Scenario.transfer(c1.startGame());
});

Dev.compileContract('farkleGame', new FarkleGame());
Dev.compileContract('farkleGameFactory', new FarkleGameFactory());
