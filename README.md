# Tezos Farkle Game

Simple dice game based on Farkle rules. This project inspired by Kingdome Come Zonk minigame. 
Main purpose is to recreate game rules using Tezos network as a base for storing game state and logic and connect players between each other.

This project is build especially for `Game On! Tezos - New Frontiers Bounty` hackaton (https://gitcoin.co/issue/tezos-contrib/gitcoin-bounties/12/100027149)

- Website: https://dmytrobaida.github.io/Tezos-Farkle/
- Video presentation: https://www.youtube.com/watch?v=c0uWUT0_-ks
- Text presentation: https://www.icloud.com/keynote/041M7krQ8buzGuVhxTtuCH2lA#Tezos_Farkle
- Contract address: KT1W2BZZdaT668oqW5aEKG2sKsB3FFh4BaPm
- Link to contract explorer: https://smartpy.io/explorer.html?address=KT1W2BZZdaT668oqW5aEKG2sKsB3FFh4BaPm
- Network: Hangzhounet

## Game rules

Farkle is played by two or more players, with each player in succession having a turn at throwing the dice. Each player's turn results in a score, and the scores for each player accumulate to some winning total (2,000).

- Each player makes a bet in XTZ.
- At the beginning of each turn, the player throws all the dice at once.
- After each throw, one or more scoring dice must be set aside (see sections on scoring below).
- The player may then either end their turn and bank the score accumulated so far, or continue to throw the remaining dice.
- If none of the dice score in any given throw, the player has "farkled" and all points for that turn are lost.
- At the end of the player's turn, the dice are handed to the next player in succession (usually in clockwise rotation, viewing the table from above), and they have their turn.
- Winner of the game takes all bank into his wallet.

## Scoring

| Dice combination | Score |
|:----------------:|:-----:|
| Each 1           | 100   |
| Each 5           | 50    |
| Three 1s         | 1000  |
| Three 2s         | 200   |
| Three 3s         | 300   |
| Three 4s         | 400   |
| Three 5s         | 500   |
| Three 6s         | 600   |

### Development status

Development currently in progress

[![Build and Deploy](https://github.com/dmytrobaida/Tezos-Farkle/actions/workflows/main.yml/badge.svg?branch=main)](https://github.com/dmytrobaida/Tezos-Farkle/actions/workflows/main.yml)

### Used technologies
- Tezos blockchain: https://tezos.com/
- Smartpy with typescript template: https://smartpy.io/docs/
- Flextesa: https://tezos.gitlab.io/flextesa/
- React with typescript template: https://reactjs.org/docs/create-a-new-react-app.html

### Useful links
- List of Tezos testnets: https://teztnets.xyz/