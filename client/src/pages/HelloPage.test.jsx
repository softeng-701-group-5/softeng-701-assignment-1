import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import { HelloPage } from './HelloPage';

describe('<Hello />', () => {
  let subject;

  beforeEach(() => {
    subject = mount(<HelloPage />);
  });

  afterEach(() => {
    subject.unmount();
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<HelloPage />, div);
  });
});
