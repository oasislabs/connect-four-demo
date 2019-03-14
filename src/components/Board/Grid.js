import React from 'react';
import PropTypes from 'prop-types';
import Tile from './Tile';
import Token from './Token';

import './Grid.css';

class Grid extends React.Component {
  state = {
    activeCol: null
  }

  handleMouseEnter = (col) => {
    if (this.props.isClickable(col)) {
      this.setState(state => ({
        activeCol: col
      }))
    }
  }

  handleMouseLeave = (col) => {
    if (this.state.activeCol !== null) {
      this.setState(state => ({
        activeCol: null
      }))
    }
  }

  render() {
    const { activeCol } = this.state;
    const {
      player,
      board,
      onClick = () => {},
      isClickable = () => false,
      isWinner = () => false,
    } = this.props;

    // Transpose the board so it's easier to render columns,
    // and also keep reference to original board coordinates
    // in order to check if it is a winning tile

    const transposed = board[0].map((col, i) => board.map((row, j) => {
      return ({
        value: row[i],
        isWinner: isWinner(j, i)
      })
    }));

    return (
      <div className="Grid">
        {transposed.map((rows, col) => (
          <div
            key={col}
            className={`Grid__col ${activeCol === col ? 'Grid__col--active' : ''}`}
            onMouseEnter={() => this.handleMouseEnter(col)}
            onMouseLeave={this.handleMouseLeave}
            onClick={() => onClick(col)}
          >
            {activeCol === col && (
              <div className="Grid__col__token">
                <Tile tile={player} isWinner={false}/>
              </div>
              )}
            {/* Reverse the row so it's easier to map over */}
            {rows.slice().reverse().map((tile, row) => (
              <div key={[row,col].join(',')} className="Grid__row">
                <Tile tile={tile.value} isWinner={tile.isWinner}/>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }
}

Grid.propTypes = {
  player: PropTypes.oneOf([1,2]).isRequired,
  board: PropTypes.any.isRequired,
  isClickable: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  isWinner: PropTypes.func.isRequired,
};

export default Grid;
