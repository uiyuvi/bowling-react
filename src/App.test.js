import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {configure , shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
let game;
function getScore() {
  return game.instance().score();
}

function multipleRollWithPin(rollCount,pin) {
  for(let i = 0; i < rollCount; i++){
    game.instance().roll(pin);
  }
}

beforeEach(() => {
  game = shallow(<App />);
})

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('should handle `Gutter` game', () => {
  multipleRollWithPin(20,0);
  
  expect(getScore()).toBe(0);
});

it('should return 20 for all 1', () => {  
  multipleRollWithPin(20,1);
  
  expect(getScore()).toBe(20);
});

it('should handle `Spare` game', () => {
  game.instance().roll(5);
  game.instance().roll(5);
  game.instance().roll(1);
  multipleRollWithPin(17,0);

  expect(getScore()).toBe(12);
});

it('should handle `Strike` game', () => {
  game.instance().roll(10);
  game.instance().roll(5);
  game.instance().roll(1);
  multipleRollWithPin(16,0);

  expect(getScore()).toBe(22);
});

it('should handle perfect game', () => {  
  multipleRollWithPin(12,10);
  
  expect(getScore()).toBe(300);
});

it('should handle both spare and strike in a game', () => {
  game.instance().roll(1);
  game.instance().roll(4);
  game.instance().roll(4);
  game.instance().roll(5);
  game.instance().roll(6);
  game.instance().roll(4);
  game.instance().roll(5);
  game.instance().roll(5);
  game.instance().roll(10);
  game.instance().roll(0);
  game.instance().roll(1);
  game.instance().roll(7);
  game.instance().roll(3);
  game.instance().roll(6);
  game.instance().roll(4);
  game.instance().roll(10);
  game.instance().roll(2);
  game.instance().roll(8);
  game.instance().roll(6);
  
  expect(getScore()).toBe(133);
});
