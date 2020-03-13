import React from 'react';
import MediaCard from './components/materialUI_card';

export const App = () => {
  return <div>
    <MediaCard
          media="reddit"
          title="What was normal to have in 2010 but not 2020?"
          main_text="Top comment: Cellphone with a physical keyboard."
          image_link="https://images.techhive.com/images/article/2015/11/old_nokia_phones-100625503-large.jpg"
          avatar_link="http://2.bp.blogspot.com/-8ms4E7aH4w8/UMztXOsniqI/AAAAAAAAIW0/qql0GcspDzs/s1600/2298.jpg"
          relative_time="10 mins ago"
          media_source_link=""
      /> 
      <MediaCard
          media="twitter"
          title="Donald J. Trump"
          main_text="Hoping to get the payroll tax cut approved by both Republicans and Democrats, and please remember, very important for all countries & businesses to know that trade will in no way be affected by the 30-day restriction on travel from Europe. The restriction stops people not goods."
          image_link="https://www.motherjones.com/wp-content/uploads/2020/03/trump-coronavirus-3-11-20.jpg?w=990"
          avatar_link="http://2.bp.blogspot.com/-8ms4E7aH4w8/UMztXOsniqI/AAAAAAAAIW0/qql0GcspDzs/s1600/2298.jpg"
          relative_time="4 hours ago"
          media_source_link=""
      />  

  </div>;
};
