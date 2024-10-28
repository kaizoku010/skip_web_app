import React, { useState } from 'react';
import { Radio, Tabs } from 'antd';

function TabbedEvents() {

    const [size, setSize] = useState('small');
    const onChange = (e) => {
      setSize(e.target.value);
    };


    return (
    <div>TabbedEvents</div>
  )
}

export default TabbedEvents