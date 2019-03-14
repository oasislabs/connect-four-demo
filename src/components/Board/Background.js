import React from 'react';
import PropTypes from 'prop-types';
import Grid from './Grid';


import './Background.css';

const Background = function({ children }) {
  return (
    <div className="Background">
      <img className="Background__image" src={require("../../assets/2x/connect4_board.png")} alt="Background" />
      {children}
    </div>
  );
};

Background.propTypes = {
  children: function(props, propName, componentName) {
    const prop = props[propName];

    let error = null;
    React.Children.forEach(prop, function(child) {
      if (child.type !== Grid) {
        error = new Error(
          '`' + componentName + '` children should be of type `Grid`.'
        );
      }
    });
    return error;
  },
};

export default Background;
