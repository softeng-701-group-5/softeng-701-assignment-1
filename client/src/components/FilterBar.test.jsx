import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import { FilterBar } from './FilterBar';
import renderer from 'react-test-renderer';

describe('<FilterBar />', () => {
  let subject;

  beforeEach(() => {
    subject = mount(<FilterBar />);
  });

  afterEach(() => {
    subject.unmount();
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<FilterBar />, div);
  });

  it('matches snapshot', () => {
    const tree = renderer.create(<FilterBar />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
