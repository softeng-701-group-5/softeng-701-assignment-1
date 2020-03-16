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

  it.each(
    'REDDIT',
    'GITHUB',
    'TWITTER',
    'HACKERNEWS',
    'default'
  )('matches each snapshots', media => {
    const mediaProps = [
      {
        media: media,
      },
    ];
    const tree = renderer.create(<MediaCard {...mediaProps} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
