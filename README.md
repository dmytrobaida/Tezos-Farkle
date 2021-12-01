# Tezos Farkle Game

Simple dice game built on Tezos network

## Game rules

Farkle is played by two or more players, with each player in succession having a turn at throwing the dice. Each player's turn results in a score, and the scores for each player accumulate to some winning total (usually 10,000).

- At the beginning of each turn, the player throws all the dice at once.
- After each throw, one or more scoring dice must be set aside (see sections on scoring below).
- The player may then either end their turn and bank the score accumulated so far, or continue to throw the remaining dice.
- If the player has scored all six dice, they have "hot dice" and may continue their turn with a new throw of all six dice, adding to the score they have already accumulated. There is no limit to the number of "hot dice" a player may roll in one turn.
- If none of the dice score in any given throw, the player has "farkled" and all points for that turn are lost.
- At the end of the player's turn, the dice are handed to the next player in succession (usually in clockwise rotation, viewing the table from above), and they have their turn.

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
