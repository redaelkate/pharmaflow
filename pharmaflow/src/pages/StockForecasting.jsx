import React, { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const StockForecasting = () => {
  // Mock historical data (in a real app, this would come from an API or database)
  const [historicalData, setHistoricalData] = useState([
    { month: 'Jan', sales: 1000, inventory: 1200 },
    { month: 'Feb', sales: 1500, inventory: 1000 },
    { month: 'Mar', sales: 1200, inventory: 1100 },
    { month: 'Apr', sales: 1800, inventory: 900 },
    { month: 'May', sales: 2000, inventory: 800 },
    { month: 'Jun', sales: 2200, inventory: 1000 },
  ]);

  const months= ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  const [forecastMonths, setForecastMonths] = useState(3);
  
  const forecast = useMemo(() => {
    const lastMonthData = historicalData[historicalData.length - 1];
    const avgSalesGrowth = historicalData.slice(1).reduce((acc, curr, index) => 
      acc + (curr.sales - historicalData[index].sales) / historicalData[index].sales, 0
    ) / (historicalData.length - 1);

    const forecastData = [];
    let lastSales = lastMonthData.sales;
    let lastInventory = lastMonthData.inventory;

    for (let i = 1; i <= forecastMonths; i++) {
      const forecastSales = Math.round(lastSales * (1 + avgSalesGrowth));
      const forecastInventory = Math.max(0, lastInventory - lastSales + forecastSales);
      
      forecastData.push({
        month: months[(new Date().getMonth() + i) % 12],
        sales: forecastSales,
        inventory: forecastInventory,
      });

      lastSales = forecastSales;
      lastInventory = forecastInventory;
    }

    return forecastData;
  }, [historicalData, forecastMonths]);

  const chartData = [...historicalData, ...forecast];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Store Forecast</h1>
      
      <div className="mb-4">
        <label htmlFor="forecastMonths" className="mr-2">Forecast Months:</label>
        <input
          id="forecastMonths"
          type="number"
          min="1"
          max="12"
          value={forecastMonths}
          onChange={(e) => setForecastMonths(Math.min(12, Math.max(1, parseInt(e.target.value) || 1)))}
          className="border border-gray-300 p-2 rounded"
        />
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="sales" stroke="#8884d8" name="Sales" />
          <Line type="monotone" dataKey="inventory" stroke="#82ca9d" name="Inventory" />
        </LineChart>
      </ResponsiveContainer>

      <div className="mt-4">
        <h2 className="text-xl font-bold mb-2">Forecast Summary</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2">Month</th>
              <th className="border border-gray-300 p-2">Forecasted Sales</th>
              <th className="border border-gray-300 p-2">Forecasted Inventory</th>
            </tr>
          </thead>
          <tbody>
            {forecast.map((item, index) => (
              <tr key={index}>
                <td className="border border-gray-300 p-2">{item.month}</td>
                <td className="border border-gray-300 p-2">{item.sales}</td>
                <td className="border border-gray-300 p-2">{item.inventory}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StockForecasting;