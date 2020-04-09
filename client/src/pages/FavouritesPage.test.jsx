import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { mount } from 'enzyme';
import { FavouritesPage } from './FavouritesPage';
import renderer from 'react-test-renderer';

describe('<FavouritesPage />', () => {
  let subject;

  beforeEach(() => {
    subject = mount(
      <Router>
        <FavouritesPage />
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
        <FavouritesPage />
      </Router>,
      div
    );
  });

  it('matches snapshot', () => {
    const tree = renderer
      .create(
        <Router>
          <FavouritesPage />
        </Router>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
