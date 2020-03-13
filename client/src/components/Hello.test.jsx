import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import { Hello } from './Hello';

describe('<Hello />', () => {
  let subject;

  beforeEach(() => {
    subject = mount(<Hello />);
  });

  afterEach(() => {
    subject.unmount();
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Hello />, div);
  });
});
