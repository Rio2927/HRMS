import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 500 },
  { name: 'Apr', value: 200 },
];

function Graph() {
  return (
    <ResponsiveContainer>
      <LineChart data={data}>
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="value" stroke="#1976d2" />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default Graph;
