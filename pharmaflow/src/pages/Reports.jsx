import React, { useState } from 'react';
import { FileText, Download, Search, Filter, ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from 'lucide-react';

const Card = ({ title, value, icon: Icon, change }) => (
  <div className="bg-white rounded-lg shadow p-6">
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
      <Icon size={24} className="text-blue-500" />
    </div>
    <p className="text-2xl font-bold text-blue-600">{value}</p>
    {change && (
      <p className={`text-sm ${change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
        {change >= 0 ? '+' : ''}{change}% from last month
      </p>
    )}
  </div>
);

const DocumentRow = ({ doc, onDownload }) => (
  <div className="bg-white even:bg-gray-50 p-4 flex items-center justify-between">
    <div className="flex items-center">
      <FileText size={24} className={`mr-4 ${doc.type === 'invoice' ? 'text-blue-500' : 'text-green-500'}`} />
      <div>
        <h3 className="font-semibold text-gray-800">{doc.name}</h3>
        <p className="text-sm text-gray-600">{doc.date}</p>
      </div>
    </div>
    <div className="flex items-center">
      <p className="mr-6 font-semibold text-gray-700">${doc.amount.toFixed(2)}</p>
      <button 
        onClick={() => onDownload(doc.id)} 
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded flex items-center"
      >
        <Download size={18} className="mr-2" />
        Download
      </button>
    </div>
  </div>
);

const FinancialReportsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('desc');
  const [filterType, setFilterType] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const documents = [
    { id: 1, name: 'Invoice #1001', date: '2024-10-01', amount: 1234.56, type: 'invoice' },
    { id: 2, name: 'Receipt #R2001', date: '2024-10-02', amount: 567.89, type: 'receipt' },
    { id: 3, name: 'Invoice #1002', date: '2024-10-05', amount: 2345.67, type: 'invoice' },
    { id: 4, name: 'Receipt #R2002', date: '2024-10-07', amount: 890.12, type: 'receipt' },
    { id: 5, name: 'Invoice #1003', date: '2024-10-10', amount: 3456.78, type: 'invoice' },
    { id: 6, name: 'Receipt #R2003', date: '2024-10-12', amount: 1234.56, type: 'receipt' },
    { id: 7, name: 'Invoice #1004', date: '2024-10-15', amount: 4567.89, type: 'invoice' },
    { id: 8, name: 'Receipt #R2004', date: '2024-10-17', amount: 2345.67, type: 'receipt' },
    { id: 9, name: 'Invoice #1005', date: '2024-10-20', amount: 5678.90, type: 'invoice' },
    { id: 10, name: 'Receipt #R2005', date: '2024-10-22', amount: 3456.78, type: 'receipt' },
  ];

  const handleDownload = (id) => {
    console.log(`Downloading document with id: ${id}`);
    // Implement actual download logic here
  };

  const filteredDocuments = documents
    .filter(doc => doc.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(doc => filterType === 'all' ? true : doc.type === filterType)
    .sort((a, b) => sortOrder === 'desc' ? b.amount - a.amount : a.amount - b.amount);

  const pageCount = Math.ceil(filteredDocuments.length / itemsPerPage);
  const paginatedDocuments = filteredDocuments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Financial Reports</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card title="Total Invoices" value="15" icon={FileText} change={5.2} />
        <Card title="Total Receipts" value="12" icon={FileText} change={-2.1} />
        <Card title="Total Amount" value="$12,345.67" icon={FileText} change={7.8} />
      </div>

      <div className="bg-white rounded-lg shadow mb-8">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center mb-4">
            <div className="relative w-full md:w-auto mb-4 md:mb-0">
              <input
                type="text"
                placeholder="Search documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Types</option>
                <option value="invoice">Invoices</option>
                <option value="receipt">Receipts</option>
              </select>
              <button
                onClick={toggleSortOrder}
                className="flex items-center bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded"
              >
                Amount {sortOrder === 'desc' ? <ChevronDown size={18} className="ml-2" /> : <ChevronUp size={18} className="ml-2" />}
              </button>
            </div>
          </div>
        </div>
        <div className="divide-y divide-gray-200">
          {paginatedDocuments.map(doc => (
            <DocumentRow key={doc.id} doc={doc} onDownload={handleDownload} />
          ))}
        </div>
        <div className="p-6 border-t border-gray-200 flex justify-between items-center">
          <p className="text-sm text-gray-600">
            Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredDocuments.length)} of {filteredDocuments.length} entries
          </p>
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, pageCount))}
              disabled={currentPage === pageCount}
              className="p-2 rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialReportsPage;