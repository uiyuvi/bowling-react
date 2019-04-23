import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rolls: [],
      frameScore:[],
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
    let framescore = [];

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
      framescore[frame] = score;
    }
    
    this.setState({
      score: score,
      frameScore : framescore
    });
    return this.state.score;
  }

  startGame = () => {
    this.resetGame();  
    this.roll(1);
    this.roll(4);
    this.roll(4);
    this.roll(5);
    this.roll(6);
    this.roll(4);
    this.roll(5);
    this.roll(5);
    this.roll(10);
    this.roll(0);
    this.roll(1);
    this.roll(7);
    this.roll(3);
    this.roll(6);
    this.roll(4);
    this.roll(10);
    this.roll(2);
    this.roll(8);
    this.roll(6);
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
    if(this.state.score && scoreBoard != null){
      scoreBoard.innerHTML = "";
      for(let frame = 0; frame < 10; frame++){
        scoreBoardInnerHTML = "";
        scoreBoardInnerHTML += "<div class='frame'> Frame - ";
        scoreBoardInnerHTML += (frame + 1);
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
        scoreBoardInnerHTML += this.state.frameScore[frame];
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
