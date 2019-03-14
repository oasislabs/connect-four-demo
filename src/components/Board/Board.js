/*
 * Copyright 2017 The boardgame.io Authors.
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { GameInfo } from 'oasis-game-components';

import Background from './Background';
import Grid from './Grid';

import './Board.css';

class Board extends React.Component {
  static propTypes = {
    G: PropTypes.any.isRequired,
    ctx: PropTypes.any.isRequired,
    moves: PropTypes.any.isRequired,
    playerID: PropTypes.number,
    isSpectating: PropTypes.bool,
    isActive: PropTypes.bool,
    isMultiplayer: PropTypes.bool,
  };

  onClick(col) {
    if (this.isClickable(col)) {
      this.props.moves.click_slot(col);
    }
  }

  isWinner(row, col) {
    const { gameover } = this.props.ctx;
    return gameover !== null && gameover.winning_cells.findIndex(winner => winner.join(',') === [row, col].join(',')) > -1
  }

  isClickable(col) {
    let { ctx, playerID } = this.props;

    let myTurn = playerID && (
      ctx.current_player === playerID ||
      (typeof ctx.active_players !== 'undefined' && ctx.active_players.indexOf(playerID) !== -1)
    )

    let hasOpenSlots = this.props.G.grid.some(row => row[col] === -1)

    return !ctx.gameover && myTurn && hasOpenSlots;
  }

  getVictoryInfo () {
    let gameover = this.props.ctx.gameover
    if (gameover) {
      let victoryInfo = {};
      if (!gameover.winner) {
        var color = 'orange'
        var text = 'It\'s a draw!'
      } else {
        color = (gameover.winner == this.props.playerID || this.props.isSpectating) ? 'green' : 'red'
        text = `Player ${gameover.winner} won!`
      }
      victoryInfo.winner = <div className={color} id="winner">{text}</div>;
      victoryInfo.color = color
      victoryInfo.cells = new Set(gameover.winning_cells)
      return victoryInfo
    }
    return null
  }

  render() {
    let victoryInfo = this.getVictoryInfo()

    return (
      <React.Fragment>
        <Background>
          <Grid
            player={this.props.playerID}
            board={this.props.G.grid}
            isClickable={this.isClickable.bind(this)}
            onClick={this.onClick.bind(this)}
            isWinner={this.isWinner.bind(this)}
          />
        </Background>
        <GameInfo
          winner={victoryInfo ? victoryInfo.winner : null}
          {...this.props}
        />
      </React.Fragment>
    )
  }
}

export default Board;
