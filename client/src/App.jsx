import React from 'react';
import { MediaCard } from './components/materialUI_card'

export const App = () => {
  return <div>
    <MediaCard
          media="reddit"
          title="What was normal to have in 2010 but not 2020?"
          username="John Smith"
          mainText="Top comment: Cellphone with a physical keyboard."
          imageLink="https://images.techhive.com/images/article/2015/11/old_nokia_phones-100625503-large.jpg"
          avatarLink="http://2.bp.blogspot.com/-8ms4E7aH4w8/UMztXOsniqI/AAAAAAAAIW0/qql0GcspDzs/s1600/2298.jpg"
          relativeTime="10 mins ago"
          mediaSourceLink=""
      /> 
      <MediaCard
          media="twitter"
          title="Donald J. Trump"
          username="Donald Duck"
          mainText="Hoping to get the payroll tax cut approved by both Republicans and Democrats, and please remember, very important for all countries & businesses to know that trade will in no way be affected by the 30-day restriction on travel from Europe. The restriction stops people not goods."
          imageLink="https://www.motherjones.com/wp-content/uploads/2020/03/trump-coronavirus-3-11-20.jpg?w=990"
          avatarLink="http://2.bp.blogspot.com/-8ms4E7aH4w8/UMztXOsniqI/AAAAAAAAIW0/qql0GcspDzs/s1600/2298.jpg"
          relativeTime="4 hours ago"
          mediaSourceLink=""
      />  

  </div>;
};
