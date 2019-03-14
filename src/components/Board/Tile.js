import React from 'react';
import PropTypes from 'prop-types';
import Token from './Token';

import './Tile.css';

const Tile = function({ tile, isWinner }) {
  let token = null;

  if (tile === 1) {
    token = <Token color="yellow" highlight={isWinner} />
  } else if (tile === 2) {
    token = <Token color="red" highlight={isWinner}/>
  }

  return (
    <div className="Tile">
      {token}
    </div>
  );
};

Tile.propTypes = {
  tile: PropTypes.any.isRequired,
  isWinner: PropTypes.bool.isRequired
};

export default Tile;
