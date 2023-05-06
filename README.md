# "One Thousand" dice game

Description:
This is old game which I played with my grandfather, it has very good logic, and nice to play. A little bit of risk and strategy.
You are throwing 5 dicess and try to get 1000 points to win.

Rules:
- two or more players (in this version not more than 4)
- you have 5 dices
- you have to get 1000 points to win a game (In last roll you must have exactly 1000 points, not more, not less)
- this is turn-based game
- detailes of throwing logic:
  - first throw you are throwing 5 dices and check the numbers if one of dices will give you 1, 5 or 3 of the same value (ex. 4, 4, 4) - "triple" -
    you can do make next throw but:
    - you can chose between 1, 5, or triple, where no less than one will be constant in next throw, and the rest dices will be thrown until you:
      1. to start geting points you have to collect 100 points in one round, on the next rounds limit is only 25 to save the points.
      2. if your throw won't give you any of correct numbers you loose your turn - next player start to throwing
      3. if you decide to save the points, you are end your round, and next player will throw
      4. if all of dices were correct numbers you can throw all dices until you have situation from point 2 or 3.
  - How to count:
    - [1] - 10 points
    - [2] - bad
    - [3] - bad
    - [4] - bad
    - [5] - 5 points
    - [6] - bad
    - [1],[1],[1] - 100 points / if there is fourth [1] you have to multiply by 2, if the fifth you have to multiply one more time by 2
    - [2],[2],[2] - 20 points / as above
    - [3],[3],[3] - 30 points / as above
    - [4],[4],[4] - 40 points / as above
    - [5],[5],[5] - 50 points / as above
    - [6],[6],[6] - 60 points / as above

Example:
Player1 first throw: [1, 4, 2, 2, 5]
- you have 15 points if you make constant [1], and [5]
- next throw you can throw by 3 or 4 dice for ex I made only [1] constant, so I have to throw 4 dices: [2, 2, 2, 4]:
- I have 30 points (10 points from first throw, and 20 points from the second ([2], [2], [2])), I have left only 1 dice to throw (big risk):
  if it't begin of the game and I have less than 100 points I have to keep throwing, if I have more than 100 points I could save my points, and end
  my round.
- I decide to keep throwing: [3]
- I loose my points, player 2 start to throwing:
  Player2 first throw: [2, 3, 3, 6, 4]
- player2 end his round because there was no [1], [5], or triple

quite simple :)

# CubeGameAng

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


