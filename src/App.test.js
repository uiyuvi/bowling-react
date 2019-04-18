import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {configure , shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('should handle `Gutter` game', () => {
  var game = shallow(<App />);

  for(let i = 0; i < 20; i++){
    game.instance().roll(0);
  }
  
  expect(game.instance().score()).toBe(0);
});

it('should return 20 for all 1', () => {  
  var game = shallow(<App />);

  for(let i = 0; i < 20; i++){
    game.instance().roll(1);
  }
  
  expect(game.instance().score()).toBe(20);
});


