import React, { useState } from 'react';
import { Radio, Tabs } from 'antd';

function TabbedEvents() {

    const [size, setSize] = useState('small');
    const onChange = (e) => {
      setSize(e.target.value);
    };


    return (
        <div>
          <Radio.Group
            value={size}
            onChange={onChange}
            style={{
              marginBottom: 16,
            }}
          >
            <Radio.Button value="small">Small</Radio.Button>
            <Radio.Button value="middle">Middle</Radio.Button>
            <Radio.Button value="large">Large</Radio.Button>
          </Radio.Group>
          <Tabs
            defaultActiveKey="1"
            size={size}
            style={{
              marginBottom: 32,
            }}
            items={new Array(3).fill(null).map((_, i) => {
              const id = String(i + 1);
              return {
                label: `Tab ${id}`,
                key: id,
                children: `Content of tab ${id}`,
              };
            })}
          />
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