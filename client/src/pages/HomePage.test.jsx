import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import { HomePage } from './HomePage';

describe('<HomePage />', () => {
  let subject;

  beforeEach(() => {
    subject = mount(<HomePage />);
  });

  afterEach(() => {
    subject.unmount();
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<HomePage />, div);
  });
});
