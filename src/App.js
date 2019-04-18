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
    let updatedRolls = this.state.rolls.concat(pin);
    this.setState({rolls: updatedRolls});
  }  

  score = () => {
    let score = 0;
    for(let roll = 0; roll < this.state.rolls.length; roll++){
      score += this.state.rolls[roll];
    }
    this.setState({score: score});
    return this.state.score;
  }

  rollPins = () => {
    for(let i = 0; i < 20; i++){
      this.roll(0);
    }
    this.score();
  }

  render() {
    return (
      <div className="App">
        <input type ="button" onClick={this.rollPins} value = "Start game"/>
        <p> Your score is : {this.state.score} </p>
      </div>
    );
  }
}

export default App;
