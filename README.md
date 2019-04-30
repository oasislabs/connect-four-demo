# Connect Four on Oasis
A demo Connect Four game built using the Oasis game framework's Truffle box.

This example game was made using the [Oasis game box](https://github.com/oasislabs/game-box).  
Please also take a look at some of our other examples:
* [Tic Tac Toe](https://github.com/oasislabs/game-box): This Truffle box gives a more detailed overview of the game project, and describes how to get started with your own game.
* [Battleship](https://github.com/oasislabs/battleship-demo): This game shows an example of how secret state and initial randomness can be incorporated into your game.
* [Poker](https://github.com/oasislabs/poker-demo): Our most complicated game, this repository provides an example of how the game framework's Truffle box can be extended and uses all of its features.

## Installation
This game is designed to be used from within your Contract Kit container. If you haven't already, pull the `oasislabs/contract-kit` image from Docker Hub.

1. Launch your Contract Kit container: 
   * `docker run -v "$PWD":/project -p8545:8545 -p8546:8546 -p8080:8080 -it oasislabs/contract-kit:latest /bin/bash`
   
The remaining steps are meant to be run in a shell inside your new `oasislabs/contract-kit` container.
1. Install `wasm-bindgen`: `cargo install wasm-bindgen-cli --vers=0.2.37` (this can take some time).
2. Clone this repository: `git clone https://github.com/oasislabs/connect-four-demo`
3. NPM installation: `cd poker-demo && npm i`

### Specifying credentials
If you want to deploy on Oasis, make sure your mnemonic is defined in `secrets.json`. This file is not tracked by your repo, but it's imported by Truffle during migration and frontend compilation. The default Contract Kit mnemonic is already there, ready to use.

## Building + Migrating

Please refer to our most up to date documentation in the [Oasis Game Box](https://github.com/oasislabs/game-box#building--migrating) repository. 
