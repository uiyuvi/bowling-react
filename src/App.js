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
    let roll = 0;
    let scoreBoardComponent = [],
        firstRollScore,
        secondRollScore,
        thirdRollScore;
    if(this.state.score){      
      for(let frame = 0; frame < 10; frame++){
        if(frame !== 9){
          if(this.isStrike(roll)){
            firstRollScore='X';
            secondRollScore='-';
            roll +=1;
          } else if(this.isSpare(roll)){            
            firstRollScore= this.state.rolls[roll];
            secondRollScore='/';
            roll += 2;
          } else {
            firstRollScore= this.state.rolls[roll];
            secondRollScore=this.state.rolls[roll+1];
            roll += 2;
          }
        } else {
          firstRollScore= (this.state.rolls[roll] === 10 ? 'X' : this.state.rolls[roll]);
          secondRollScore=((this.state.rolls[roll] + this.state.rolls[roll+1]) === 10 ? '/' : this.state.rolls[roll+1]);
          thirdRollScore=this.state.rolls[roll+2];          
          roll+=2;
        }
        scoreBoardComponent.push( <Frame key={frame}
                                  frameIndex={frame+1}
                                  firstRollScore={firstRollScore}
                                  secondRollScore={secondRollScore}
                                  thirdRollScore={thirdRollScore}
                                  frameScore={this.state.frameScore[frame]}
                                  />
                                );
      }
    }  

    return (
      <div className="App">
        <input type ="button" onClick={this.startGame} value = "Start game"/>
        <p>Score board:</p>
        <div className="scoreBoard">{scoreBoardComponent}</div>
        <p> Your score is : {this.state.score} </p>
      </div>
    );
  }
}


export default App;  


let Pins = ({firstRollScore,secondRollScore,thirdRollScore}) => {
  let thirdPin;
  if(thirdRollScore !== undefined){
    thirdPin = <Pin score = {thirdRollScore}/>;
  }
  return (
    <p className='pins'>
      <Pin score = {firstRollScore}/>
      <Pin score = {secondRollScore}/>
      {thirdPin}
    </p>
  )
}

let Pin = ({score}) => {
  let pinClass = '';
  if(score === 'X' || score === '-'){
    pinClass = 'strike';
  } else if (score === '/'){
    pinClass = 'spare';
  }
  return <span className={pinClass}>{score}</span>;
}
  
  
let Frame = ({frameIndex, firstRollScore, secondRollScore, thirdRollScore, frameScore}) => {  
  return (
    <div className='frame'> 
      <span> Frame - {frameIndex} </span>
      <Pins firstRollScore={firstRollScore} secondRollScore={secondRollScore} thirdRollScore={thirdRollScore}/>
      {frameScore}  
    </div>
  )
}