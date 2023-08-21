import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import Maps from './Maps';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
// eslint-disable-next-line react-hooks/rules-of-hooks
const GlobalCasesGraph: React.FC = () => {
  const { data } = useQuery('globalCases', async () => {
    const response = await axios.get('https://disease.sh/v3/covid-19/historical/all?lastdays=all');
    return response.data;
  });
  if (!data) {
    return <div>Loading...</div>;
  }
  const casesData = data.cases;

  const dataForChart = Object.keys(casesData).map(date => ({
    date,
    cases: casesData[date],
  }));
  
  return (
    <div className="w-full">
  <div className="mb-8 md:mb-10">
    <h2 className="text-lg md:text-xl">Global COVID-19 Cases Over Time</h2>
    <div className="h-96 md:h-500px w-full overflow-overlay">
    <LineChart width={window.innerWidth < 768?340:800} height={400} data={dataForChart}>
        <XAxis dataKey="date" />
        <YAxis />
        <CartesianGrid stroke="#eee" />
        <Line type="monotone" dataKey="cases" stroke="#8884d8" />
        <Tooltip />
        <Legend />
      </LineChart>
    </div>
  </div>
  <div className="mb-8 md:mb-10">
    <h2 className="text-lg md:text-xl">COVID-19 Cases by World</h2>
    <div className="h-96 md:h-500px w-full">
      <Maps />
    </div>
  </div>
</div>
  );
};
  

export default GlobalCasesGraph;
