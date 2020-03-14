import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { mount } from 'enzyme';
import { FeedPage } from './FeedPage';
import renderer from 'react-test-renderer';

describe('<FeedPage />', () => {
  let subject;

  beforeEach(() => {
    subject = mount(
      <Router>
        <FeedPage />
      </Router>
    );
  });

  afterEach(() => {
    subject.unmount();
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Router>
        <FeedPage />
      </Router>,
      div
    );
  });

  it('renders correctly', () => {
    const tree = renderer
      .create(
        <Router>
          <FeedPage />
        </Router>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
