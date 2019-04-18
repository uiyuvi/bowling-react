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
    this.setState((prevState) => ({
      rolls: prevState.rolls.concat(pin)
    }));
  }  

  score = () => {
    let score = 0;
    let roll = 0;

    for(let frame = 0; frame < 10; frame++){
      if(this.isStrike(roll)){
        score += 10 + this.strikeBonus(roll);
        roll += 1;
      } else if(this.isSpare(roll)){
        score += 10 + this.spareBonus(roll);
        roll += 2;
      } else {
        score += this.frameScore(roll);
        roll += 2;
      }
    }

    this.setState({score: score});
    return this.state.score;
  }

  startGame = () => {
    this.resetGame();  
    this.roll(10);
    this.roll(9); 
    this.roll(1);  
    for(let i = 0; i < 17; i++){
      this.roll(0);
    }
    setTimeout(() => {
      this.score();
    },20);
  }

  strikeBonus(roll) {
    return this.state.rolls[roll+1] + this.state.rolls[roll+2];
  }

  spareBonus(roll) {
    return this.state.rolls[roll+2];
  }

  isStrike(roll) {
    return this.state.rolls[roll] === 10;
  }

  isSpare(roll) {
    return this.frameScore(roll) === 10;
  }

  frameScore(roll) {
    return this.state.rolls[roll] + this.state.rolls[roll + 1];
  }

  resetGame() {
    this.setState({ rolls: [] });
  }

  render() {
    let scoreBoard = document.querySelector('.scoreBoard');
    let roll = 0;
    let scoreBoardInnerHTML;
    if(scoreBoard !== null){
      for(let frame = 0; frame < 10; frame++){
        scoreBoardInnerHTML = "";
        scoreBoardInnerHTML += "<div class='frame'>";
        if(this.isStrike(roll)){
          scoreBoardInnerHTML += "<p class='pins'><span class='strike'>X</span><span class='strike'>-</span></p>";
          roll +=1;
        } else if(this.isSpare(roll)){
          scoreBoardInnerHTML += "<p class='pins'><span class='strike'>"+this.state.rolls[roll]+"</span><span class='strike'>/</span></p>";
          roll += 2;
        } else {
          scoreBoardInnerHTML += "<p class='pins'><span class='strike'>"+this.state.rolls[roll]+"</span><span class='strike'>"+this.state.rolls[roll+1]+"</span></p>";
          roll += 2;
        } 
        scoreBoardInnerHTML += "</div>";
        scoreBoard.innerHTML += scoreBoardInnerHTML;
      }
    }
    return (
      <div className="App">
        <input type ="button" onClick={this.startGame} value = "Start game"/>
        <p>Score board:</p>
        <div className="scoreBoard"></div>
        <p> Your score is : {this.state.score} </p>
      </div>
    );
  }
}

export default App;
