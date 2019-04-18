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
    let roll = 0;

    for(let frame = 0; frame < 10; frame++){
      if(this.isSpare(roll)){
        score = 10 + this.state.rolls[roll+2];
      } else {
        score += this.frameScore(roll);
      }
      roll += 2;
    }

    this.setState({score: score});
    return this.state.score;
  }

  startGame = () => {
    this.resetGame();  
    this.roll(1);
    this.roll(9); 
    this.roll(1);  
    for(let i = 0; i < 17; i++){
      this.roll(0);
    }
    setTimeout(() => {
      this.score();
    },20);
  }

  isSpare(roll) {
    return this.frameScore(roll) == 10;
  }

  frameScore(roll) {
    return this.state.rolls[roll] + this.state.rolls[roll + 1];
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
