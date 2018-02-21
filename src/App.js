import React, { Component } from 'react';
import { HotKeys } from 'react-hotkeys';
import './App.css';
import TheStage from './TheStage';

const initialPosition = {
  x: 100,
  y: 500,
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      game: {
        gameOver: false,
        paused: true,
      },
      horizontalSpeed: 200,
      distance: 0,
      verticalSpeed: 0,
      lastAnimationTimestamp: null,
      position: initialPosition,
      verticalSpeedUp: 10,
      g: 1100, // gravitational constant
      currentFramerate: 0,
      animationRequestID: null, // use it to cancel animation; not really necessary
    }
  }

  componentDidMount() {
    this.wrapper.focus();
    this.setState((state) => ({
      ...state,
      animationRequestID: requestAnimationFrame(this.animationCallback),
    }));    
  }

  meters2px = length => Math.round(length)

  animationCallback = (time) => {
    if (this.state.game.paused || this.state.game.gameOver) {
      this.setState((state) => {
        const timeDifference = time - state.lastAnimationTimestamp;
        const newFramerate = Math.round(1000/timeDifference);          
        return {
          ...state,
          animationRequestID: requestAnimationFrame(this.animationCallback),
          currentFramerate: newFramerate,
          lastAnimationTimestamp: time,     
        };
      });
    } else {
      this.setState(
        (state) => {
          const timeDifference = time - state.lastAnimationTimestamp;
          const newFramerate = Math.round(1000/timeDifference);

          const gameOver = (state.position.y > 1000);

          const verticalSpeed = state.verticalSpeed - (state.g * timeDifference) / 1000
          const newY = Math.round(
            state.position.y - this.meters2px(verticalSpeed * timeDifference) / 1000
          );
          return {
            ...state,
            game: {
              gameOver
            },
            verticalSpeed: verticalSpeed,
            animationRequestID: requestAnimationFrame(this.animationCallback),
            position: {
              ...state.position,
              y: newY,
            },
            distance: state.distance + this.meters2px(state.horizontalSpeed * timeDifference) / 1000,
            currentFramerate: newFramerate,
            lastAnimationTimestamp: time,
          }            
        }
      );  
    }
  }

  handleKeyDown = (event) => {
    event.preventDefault();
    console.log(event.key);
    switch (event.key) {
      case " ": // space
        this.setState((state) => ({
          ...state,
          verticalSpeed: state.verticalSpeed + 700
        }));
        break;
      case "p":
        console.log(this.state.game.paused);
        this.setState((state) => ({
          ...state,
          verticalSpeed: state.game.gameOver ? 0 : state.verticalSpeed,
          position: state.game.gameOver ? initialPosition : state.position,
          game: {
            ...state.game,
            paused: state.game.gameOver ? true : !state.game.paused,
            gameOver: false
          }
        }));
        break;
      default:
    }
  }      
  
  render() {
    const keyMap = {
      arrowKeyDown: {
        sequence: ['space', 'p'],
        action: 'keydown'
      },  
    }

    const handlers = {
      arrowKeyDown: this.handleKeyDown
    };

    return (
      <HotKeys
        keyMap={keyMap}
        handlers={handlers}
      >
        <div
          tabIndex={0}
          ref={(wrapper) => { this.wrapper = wrapper; }}
          className="App"
        >
          <TheStage
            gameState={this.state.game}
            currentFramerate={this.state.currentFramerate}
            position={this.state.position}
            distance={this.state.distance}
          />
        </div>
      </HotKeys>
    );
  }
}

export default App;
