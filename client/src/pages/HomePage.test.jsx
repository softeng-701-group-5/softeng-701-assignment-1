import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { mount } from 'enzyme';
import { HomePage } from './HomePage';
import renderer from 'react-test-renderer';

describe('<HomePage />', () => {
  let subject;

  beforeEach(() => {
    subject = mount(
      <Router>
        <HomePage />
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
        <HomePage />
      </Router>,
      div
    );
  });

  it('renders correctly', () => {
    const tree = renderer
      .create(
        <Router>
          <HomePage />
        </Router>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
