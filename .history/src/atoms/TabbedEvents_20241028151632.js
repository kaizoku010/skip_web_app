import React, { useState } from 'react';
import { Radio, Tabs } from 'antd';

function TabbedEvents() {

    const [size, setSize] = useState('large');
    const onChange = (e) => {
      setSize(e.target.value);
    };


    return (
        <div clas>
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
      );
    };

export default TabbedEvents