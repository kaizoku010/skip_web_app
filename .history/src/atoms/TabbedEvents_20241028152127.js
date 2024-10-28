import React, { useState } from 'react';
import { Radio, Tabs } from 'antd';
import CurrentEvent from './CurrentEvent';

function TabbedEvents() {

    const [size, setSize] = useState('large');
    const onChange = (e) => {
      setSize(e.target.value);
    };


    return (

<div className='current_event_mobile'>
<div className='mdx-tabs'>
          <Tabs
            defaultActiveKey="1"
            type="card"
            size={size}
            items={new Array(3).fill(null).map((_, i) => {
              const id = String(i + 1);
              return {
                label: `Card Tab ${id}`,
                key: id,
                children: `Content of card tab ${id}`,
              };
            })}
          />
        </div>
</div>
        
      
    );
    };

export default TabbedEvents