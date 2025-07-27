'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Mock data for sales analytics
const salesData = [
  { month: 'Aug 24', sales: 4000 },
  { month: 'Sep 24', sales: 3000 },
  { month: 'Oct 24', sales: 2000 },
  { month: 'Nov 24', sales: 2780 },
  { month: 'Dec 24', sales: 1890 },
  { month: 'Jan 25', sales: 2390 },
  { month: 'Feb 25', sales: 3490 },
  { month: 'Mar 25', sales: 4300 },
  { month: 'Apr 25', sales: 3100 },
  { month: 'May 25', sales: 4800 },
  { month: 'Jun 25', sales: 3800 },
  { month: 'Jul 25', sales: 4350 },
];

export default function AnalyticsChart() {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={salesData}>
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="sales" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
}