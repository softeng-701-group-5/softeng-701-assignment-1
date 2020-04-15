import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import { Loader } from './Loader';
import renderer from 'react-test-renderer';

describe('<FeedPage />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Loader />, div);
  });

  it('matches snapshot', () => {
    const tree = renderer.create(<Loader />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
