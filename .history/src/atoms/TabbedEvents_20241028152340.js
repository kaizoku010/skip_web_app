import React, { useState } from 'react';
import { Radio, Tabs } from 'antd';
import CurrentEvent from './CurrentEvent';
import EventsAttended from './EventsAttended';
import { AuthContext } from "../logic/AuthContext"; // Make sure the path to AuthProvider is correct

function TabbedEvents() {




    return (

<div className='current_event_mobile'>
<div className='mdx-tabs'>
          <Tabs
            defaultActiveKey="1"
            type="card"
            size="large"
            items={[
                {
                    label: 'Active Event',
                    key: '1',
                    children: <CurrentEvent />, // Render FirstTabContent in the first tab
                },
                {
                    label: 'Events Attended',
                    key: '2',
                    children: <EventsAttended />, // Render SecondTabContent in the second tab
                },
            ]}
          />
        </div>
</div>
        
      
    );
    };

export default TabbedEvents