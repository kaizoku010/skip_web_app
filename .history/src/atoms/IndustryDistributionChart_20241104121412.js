// IndustryDistributionChart.js
import React from 'react';
import { PieChart, Pie, Tooltip, Cell } from 'recharts';

const IndustryDistributionChart = ({ data }) => {
  return (
    <PieChart width={400} height={400}>
      <Pie
        data={data}
        cx={200}
        cy={200}
        labelLine={false}
        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        outerRadius={80}
        fill="#8884d8"
        dataKey="value"
      >
        {data.map((_, index) => (
          <Cell key={`cell-${index}`} fill={`hsl(${(index * 60) % 360}, 100%, 50%)`} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  );
};

export default IndustryDistributionChart;
