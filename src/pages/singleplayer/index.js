/*
 * Copyright 2017 The boardgame.io Authors.
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import Async from 'react-promise';
import React from 'react';
import { render } from 'react-dom';

import bindingsPromise from '../../../core/client/';
import createProxyBuilder from 'oasis-game-client-proxy';
import { Client } from 'oasis-game-components';

import Board from '../../components/board';

window.bindingsPromise = bindingsPromise;

const Singleplayer = () => {
  let proxiesPromise = async (resolve, reject) => {
    let bindings = await bindingsPromise;
    let proxyBuilder = createProxyBuilder(bindings);

    return Promise.all([
      proxyBuilder([1,2], null, 1).ready(),
      proxyBuilder([1,2], null, 2).ready()
    ])
  }

  return (
    <Async promise={proxiesPromise()} then={([proxy1, proxy2]) => {
      // This simplifies local testing.
      let tee = (function (d1, d2) {
        return (action) => {
          console.log('DISPATCHING TO BOTH PROXIES: action: ', action)
          d1(action);
          d2(action);
        }
      })(proxy1.dispatch.bind(proxy1), proxy2.dispatch.bind(proxy2));

      proxy1.dispatch = tee;
      proxy2.dispatch = tee;

      let PlayerOne = Client({
        board: Board,
        proxy: proxy1,
        playerId: 1,
        players: [1, 2],
        multiplayer: null,
        debug: true
      });

      let PlayerTwo = Client({
        board: Board,
        proxy: proxy2,
        playerId: 2,
        players: [1, 2],
        multiplayer: null,
        debug: false
      });

      return (
        <div style={{ padding: 50 }}>
          <h1>Two Players (Local)</h1>
          <PlayerOne />
          <br/>
          <PlayerTwo />
        </div>
      );
    }} />
  );
}

render(
    <Singleplayer />,
    document.getElementById('app')
);
