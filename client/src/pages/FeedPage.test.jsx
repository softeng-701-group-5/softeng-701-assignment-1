import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import { FeedPage } from './FeedPage';

describe('<FeedPage />', () => {
  let subject;

  beforeEach(() => {
    subject = mount(<FeedPage />);
  });

  afterEach(() => {
    subject.unmount();
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<FeedPage />, div);
  });
});
