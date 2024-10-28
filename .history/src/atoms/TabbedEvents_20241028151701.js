import React, { useState } from 'react';
import { Radio, Tabs } from 'antd';

function TabbedEvents() {

    const [size, setSize] = useState('large');
    const onChange = (e) => {
      setSize(e.target.value);
    };


    return (

<div className='current_event_mobile'>

</div>
        
      
    );
    };

export default TabbedEvents