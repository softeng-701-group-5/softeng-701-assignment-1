import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import { SearchBox } from './SearchBox';

import renderer from 'react-test-renderer';

describe('<SearchBox />', () => {
  let subject;

  beforeEach(() => {
    subject = shallow(<SearchBox />);
  });

  afterEach(() => {
    subject.unmount();
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<SearchBox />, div);
  });

  it('matches snapshot', () => {
    const tree = renderer.create(<SearchBox />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
