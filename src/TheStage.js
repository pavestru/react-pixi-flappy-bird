import React, { Component } from 'react';
import birdImg from './assets/capercaillie.png';
import tileImg1 from './assets/trees_1.png';
import tileImg2 from './assets/trees_2.png';

import * as PIXI from 'pixi.js';
import {
  Sprite,
  Stage,
  Text,
} from 'react-pixi-fiber';

class TheStage extends Component {

  render() {
    const {
      currentFramerate,
      position,
      gameState,
      distance,
    } = this.props;

    const text = `Current framerate: ${currentFramerate} fps`;
    return (
      <div>
        <Stage width={2400} height={1500}>
          <Sprite texture={PIXI.Texture.fromImage(tileImg1)} x={(distance % 2400) > 1200 ? 2400 - (distance % 2400) : - (distance % 2400)} scale={1} key="tile1" />
          <Sprite texture={PIXI.Texture.fromImage(tileImg2)} x={1200 - (distance % 2400)} scale={1} key="tile2" />
          <Text text={text} x={10} y={10} key="fr" />
          <Text text={`${gameState.paused ? 'Press P to play' : ''}`} x={120} y={640} anchor={{x: 0, y: 0}} key="paused" />
          <Text text={`${gameState.gameOver ? 'Game over' : ''}`} scale={2} x={75} y={480} anchor={{x: 0, y: 0}} key="gameOver" />
          <Text text={`${gameState.gameOver ? 'Press P to restart' : ''}`} x={100} y={540} anchor={{x: 0, y: 0}} key="gameOverSub" />
          <Sprite texture={PIXI.Texture.fromImage(birdImg)} scale={0.5} x={position.x} y={position.y} anchor={{x: 0.5, y: 0.5}} key="robot" />
        </Stage>
      </div>
    );
  }
}

export default TheStage;
