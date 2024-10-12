import React from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ArrowUpIcon, ArrowDownIcon, PackageIcon, AlertTriangleIcon, TruckIcon, DollarSignIcon } from 'lucide-react';

// Mock data - replace with actual data from your backend
const inventoryValueData = [
  { month: 'Jan', value: 900000 },
  { month: 'Feb', value: 950000 },
  { month: 'Mar', value: 980000 },
  { month: 'Apr', value: 1000000 },
  { month: 'May', value: 1050000 },
  { month: 'Jun', value: 1000000 },
];

const topSellingProducts = [
  { name: 'Product A', value: 500 },
  { name: 'Product B', value: 400 },
  { name: 'Product C', value: 300 },
  { name: 'Product D', value: 200 },
  { name: 'Product E', value: 100 },
];

const stockStatusData = [
  { name: 'In Stock', value: 70 },
  { name: 'Low Stock', value: 20 },
  { name: 'Out of Stock', value: 10 },
];

const salesPerformanceData = [
  { month: 'Jan', sales: 400000 },
  { month: 'Feb', sales: 450000 },
  { month: 'Mar', sales: 420000 },
  { month: 'Apr', sales: 480000 },
  { month: 'May', sales: 500000 },
  { month: 'Jun', sales: 490000 },
];

const orderStatusData = [
  { status: 'Pending', value: 25 },
  { status: 'In Transit', value: 40 },
  { status: 'Delivered', value: 100 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const MetricCard = ({ title, value, previousValue, unit, icon: Icon }) => {
  const percentageChange = previousValue ? ((value - previousValue) / previousValue) * 100 : 0;
  const isPositive = percentageChange >= 0;

  return (
    <div style={{
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '16px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
        <Icon size={20} style={{ marginRight: '8px' }} />
        <h3 style={{ margin: 0 }}>{title}</h3>
      </div>
      <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>
        {unit}{value.toLocaleString()}
      </div>
      {previousValue && (
        <div style={{
          color: isPositive ? 'green' : 'red',
          display: 'flex',
          alignItems: 'center',
          fontSize: '14px'
        }}>
          {isPositive ? <ArrowUpIcon size={16} /> : <ArrowDownIcon size={16} />}
          <span style={{ marginLeft: '4px' }}>
            {Math.abs(percentageChange).toFixed(2)}%
          </span>
        </div>
      )}
    </div>
  );
};

const ChartCard = ({ title, children }) => (
  <div style={{
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '16px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    height: '100%'
  }}>
    <h3 style={{ marginBottom: '16px' }}>{title}</h3>
    {children}
  </div>
);

const Dashboard = () => {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '16px',
      padding: '16px'
    }}>
      <MetricCard
        title="Total Inventory Value"
        value={1000000}
        previousValue={950000}
        unit="$"
        icon={PackageIcon}
      />
      <MetricCard
        title="Low Stock Alerts"
        value={15}
        previousValue={12}
        unit=""
        icon={AlertTriangleIcon}
      />
      
      <MetricCard
        title="Expiring Stock Value"
        value={50000}
        previousValue={45000}
        unit="$"
        icon={AlertTriangleIcon}
      />
      <ChartCard title="Inventory Value Trend">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={inventoryValueData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>
      <ChartCard title="Top Selling Products">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={topSellingProducts} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" />
            <Tooltip />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>
      <ChartCard title="Stock Status">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={stockStatusData}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label
            >
              {stockStatusData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </ChartCard>
      <ChartCard title="Sales Performance">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={salesPerformanceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="sales" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>
      <ChartCard title="Order Status">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={orderStatusData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="status" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#ffc658" />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>
      <MetricCard
        title="Stock Turnover Ratio"
        value={4.5}
        previousValue={4.2}
        unit=""
        icon={PackageIcon}
      />
    </div>
  );
};

export default Dashboard;