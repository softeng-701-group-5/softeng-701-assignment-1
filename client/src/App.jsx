import React from 'react';
import Card from './components/Card'

export const App = () => {
  return <div>
    Welcome to Feeder client.
    <Card title="Card 1" 
      username="John Smith" 
      user_icon="" 
      date_time="17/05/19" 
      text="This is a post from John" 
      image_link="http://2.bp.blogspot.com/-8ms4E7aH4w8/UMztXOsniqI/AAAAAAAAIW0/qql0GcspDzs/s1600/2298.jpg"
      // image="" 
      media="Twitter" />
    </div>;
};
