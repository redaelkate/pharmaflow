import React, { useState } from 'react';
import { Search, Filter, Package, DollarSign, TrendingUp } from 'lucide-react';

const Card = ({ children, className }) => (
  <div className={`bg-white shadow-lg rounded-lg p-4 ${className}`}>
    {children}
  </div>
);

const Input = ({ type, placeholder, value, onChange, className }) => (
  <input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 ${className}`}
  />
);

const Button = ({ children, onClick, className }) => (
  <button
    onClick={onClick}
    className={`py-2 px-4 rounded-md focus:outline-none focus:ring-2 ${className}`}
  >
    {children}
  </button>
);

const OrderManagementPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock data for demonstration
  const orders = [
    { id: 1, customer: 'Hospital A', product: 'Vaccine X', quantity: 1000, status: 'Pending', total: 10000 },
    { id: 2, customer: 'Pharmacy B', product: 'Antibiotic Y', quantity: 500, status: 'Shipped', total: 5000 },
    { id: 3, customer: 'Clinic C', product: 'Painkiller Z', quantity: 200, status: 'Delivered', total: 2000 },
    { id: 4, customer: 'Hospital D', product: 'Vaccine X', quantity: 1500, status: 'Pending', total: 15000 },
    { id: 5, customer: 'Pharmacy E', product: 'Antibiotic Y', quantity: 300, status: 'Shipped', total: 3000 },
  ];

  const filteredOrders = orders.filter(order => 
    (filterStatus === 'all' || order.status === filterStatus) &&
    (order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
     order.product.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const totalOrders = filteredOrders.length;
  const totalRevenue = filteredOrders.reduce((sum, order) => sum + order.total, 0);
  const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-blue-700 mb-8">Order Management</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card className="bg-blue-500 text-white">
          <div className="flex items-center">
            <Package size={24} className="mr-2" />
            <div>
              <p className="text-sm">Total Orders</p>
              <p className="text-2xl font-bold">{totalOrders}</p>
            </div>
          </div>
        </Card>
        <Card className="bg-green-500 text-white">
          <div className="flex items-center">
            <DollarSign size={24} className="mr-2" />
            <div>
              <p className="text-sm">Total Revenue</p>
              <p className="text-2xl font-bold">${totalRevenue.toLocaleString()}</p>
            </div>
          </div>
        </Card>
        <Card className="bg-purple-500 text-white">
          <div className="flex items-center">
            <TrendingUp size={24} className="mr-2" />
            <div>
              <p className="text-sm">Average Order Value</p>
              <p className="text-2xl font-bold">${averageOrderValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
            </div>
          </div>
        </Card>
      </div>
      
      <Card className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <div className="w-full md:w-1/3 mb-4 md:mb-0">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                type="text"
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex items-center">
            <Filter size={18} className="mr-2 text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 text-left">Order ID</th>
                <th className="py-2 px-4 text-left">Customer</th>
                <th className="py-2 px-4 text-left">Product</th>
                <th className="py-2 px-4 text-left">Quantity</th>
                <th className="py-2 px-4 text-left">Status</th>
                <th className="py-2 px-4 text-left">Total</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id} className="border-t">
                  <td className="py-2 px-4">{order.id}</td>
                  <td className="py-2 px-4">{order.customer}</td>
                  <td className="py-2 px-4">{order.product}</td>
                  <td className="py-2 px-4">{order.quantity}</td>
                  <td className="py-2 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      order.status === 'Pending' ? 'bg-yellow-200 text-yellow-800' :
                      order.status === 'Shipped' ? 'bg-blue-200 text-blue-800' :
                      'bg-green-200 text-green-800'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-2 px-4">${order.total.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};




export default OrderManagementPage;