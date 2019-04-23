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
    let rolls=[];
    let firstRoll, secondRoll, thirdRoll;
    for(let frame = 0; frame < 10; frame++){
      firstRoll = this.generateRandomRoll(10);
      rolls.push(firstRoll);
      if(firstRoll !== 10 && frame !== 9){
        secondRoll = this.generateRandomRoll(9);
        if((firstRoll + secondRoll) > 10){
          secondRoll = 10-firstRoll;
        }
        rolls.push(secondRoll);
      }
      if(frame === 9){
        secondRoll = this.generateRandomRoll(10);
        thirdRoll =  this.generateRandomRoll(10);
        if(firstRoll !== 10){
          if((firstRoll + secondRoll) >= 10){
            secondRoll = 10-firstRoll;
            rolls.push(secondRoll); 
            rolls.push(thirdRoll);
          } else {            
            rolls.push(secondRoll); 
          }   
        } else {
          if((firstRoll + secondRoll) >= 10){
            rolls.push(secondRoll);
            rolls.push(thirdRoll);
          } else {
            rolls.push(secondRoll);
          }
        }
      }
    }
    this.setState({
      rolls:rolls
    },() => {      
      this.score();
    });
  }

  generateRandomRoll(max){
    return Math.floor(Math.random()*(max)+1);
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
        if(frame !== 9){
          if(this.isStrike(roll)){
            scoreBoardInnerHTML += "<p class='pins'><span class='strike'>X</span><span class='strike'>-</span></p>";
            roll +=1;
          } else if(this.isSpare(roll)){
            scoreBoardInnerHTML += "<p class='pins'><span class='spare'>"+this.state.rolls[roll]+"</span><span class='spare'>/</span></p>";
            roll += 2;
          } else {
            scoreBoardInnerHTML += "<p class='pins'><span>"+this.state.rolls[roll]+"</span><span>"+this.state.rolls[roll+1]+"</span></p>";
            roll += 2;
          }
        } else {
          scoreBoardInnerHTML += "<p class='pins'><span>"+(this.state.rolls[roll] === 10 ? 'X' : this.state.rolls[roll])+"</span><span>"+((this.state.rolls[roll] + this.state.rolls[roll+1]) === 10 ? '/' : this.state.rolls[roll+1])+"</span>";
          if(this.state.rolls[roll+2]){
            scoreBoardInnerHTML += "<span>"+this.state.rolls[roll+2]+"</span>"
          }
          scoreBoardInnerHTML +=  "</p>"
          roll+=2;
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
