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
