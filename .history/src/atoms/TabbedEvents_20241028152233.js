import React, { useState } from 'react';
import { Radio, Tabs } from 'antd';
import CurrentEvent from './CurrentEvent';
import EventsAttended from './EventsAttended';

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
                    children: <FirstTabContent />, // Render FirstTabContent in the first tab
                },
                {
                    label: 'Events',
                    key: '2',
                    children: <SecondTabContent />, // Render SecondTabContent in the second tab
                },
                {
                    label: 'Third Tab',
                    key: '3',
                    children: 'Content of card tab 3', // You can keep this or add another component
                },
            ]}
          />
        </div>
</div>
        
      
    );
    };

export default TabbedEvents