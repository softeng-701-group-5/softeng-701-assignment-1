import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import { MediaCard } from './MediaCard';
import renderer from 'react-test-renderer';

describe('<MediaCard />', () => {
  let subject;

  beforeEach(() => {
    subject = mount(<MediaCard />);
  });

  afterEach(() => {
    subject.unmount();
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MediaCard />, div);
  });

  const providers = [
    ['reddit'],
    ['github'],
    ['twitter'],
    ['hackernews'],
    ['default'],
  ];
  it.each(providers)('matches each snapshots', media => {
    const tree = renderer.create(<MediaCard media={media} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
