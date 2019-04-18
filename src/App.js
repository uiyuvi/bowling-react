import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rolls: [],
      score: null
    }
  };

  roll = (pin) => {
    //let updatedRolls = this.state.rolls.concat(pin);
    this.setState((prevState) => ({
      rolls: prevState.rolls.concat(pin)
    }));
  }  

  score = () => {
    let score = 0;
    for(let roll = 0; roll < this.state.rolls.length; roll++){
      score += this.state.rolls[roll];
    }
    this.setState({score: score});
    return this.state.score;
  }

  startGame = () => {
    this.resetGame();    
    for(let i = 0; i < 20; i++){
      this.roll(1);
    }
    setTimeout(() => {
      this.score();
    },20);
  }

  resetGame() {
    this.setState({ rolls: [] });
  }

  render() {
    return (
      <div className="App">
        <input type ="button" onClick={this.startGame} value = "Start game"/>
        <p> Your score is : {this.state.score} </p>
      </div>
    );
  }
}

export default App;
