import React, { useState, useEffect } from 'react';
import { Search, ChevronUp, ChevronDown, Edit, Trash2, Save, X } from 'lucide-react';

const StockInventory = () => {
  const [inventory, setInventory] = useState([
    {
      id: 1,
      sku: 'WA001',
      name: 'Widget A',
      quantity: 50,
      price: 9.99,
      category: 'Widgets',
      location: 'Warehouse A',
      supplier: 'WidgetCo',
      reorderPoint: 20,
      lastRestocked: '2024-10-01',
      expirationDate: '2025-10-01',
      description: 'A high-quality widget',
      barcode: '123456789',
      imageUrl: '/api/placeholder/100/100'
    },
    // Add more items here for testing
  ]);

  const [newItem, setNewItem] = useState({
    sku: '',
    name: '',
    quantity: '',
    price: '',
    category: '',
    location: '',
    supplier: '',
    reorderPoint: '',
    lastRestocked: '',
    expirationDate: '',
    description: '',
    barcode: '',
    imageUrl: ''
  });

  const [editingId, setEditingId] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [filterConfig, setFilterConfig] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Sorting function
  const sortedInventory = React.useMemo(() => {
    let sortableItems = [...inventory];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [inventory, sortConfig]);

  // Filtering function
  const filteredInventory = React.useMemo(() => {
    return sortedInventory.filter(item => {
      return Object.entries(filterConfig).every(([key, value]) => {
        if (!value) return true;
        return item[key].toString().toLowerCase().includes(value.toLowerCase());
      });
    });
  }, [sortedInventory, filterConfig]);

  // Searching function
  const searchedInventory = React.useMemo(() => {
    return filteredInventory.filter(item => 
      Object.values(item).some(val => 
        val.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [filteredInventory, searchTerm]);

  // Pagination
  const pageCount = Math.ceil(searchedInventory.length / itemsPerPage);
  const paginatedInventory = searchedInventory.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const handleFilter = (key, value) => {
    setFilterConfig(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const addItem = () => {
    if (newItem.sku && newItem.name) {
      setInventory([...inventory, { id: Date.now(), ...newItem }]);
      setNewItem({
        sku: '',
        name: '',
        quantity: '',
        price: '',
        category: '',
        location: '',
        supplier: '',
        reorderPoint: '',
        lastRestocked: '',
        expirationDate: '',
        description: '',
        barcode: '',
        imageUrl: ''
      });
    }
  };

  const startEditing = (id) => {
    setEditingId(id);
  };

  const cancelEditing = () => {
    setEditingId(null);
  };

  const saveEdit = (id) => {
    setInventory(inventory.map(item => item.id === id ? { ...item, ...newItem } : item));
    setEditingId(null);
    setNewItem({
      sku: '',
      name: '',
      quantity: '',
      price: '',
      category: '',
      location: '',
      supplier: '',
      reorderPoint: '',
      lastRestocked: '',
      expirationDate: '',
      description: '',
      barcode: '',
      imageUrl: ''
    });
  };

  const deleteItem = (id) => {
    setInventory(inventory.filter(item => item.id !== id));
  };

  const TableHeader = ({ column }) => (
    <th
      className="border border-gray-300 p-2 cursor-pointer"
      onClick={() => requestSort(column)}
    >
      {column.charAt(0).toUpperCase() + column.slice(1)}
      {sortConfig.key === column && (
        sortConfig.direction === 'ascending' ? <ChevronUp className="inline ml-1" /> : <ChevronDown className="inline ml-1" />
      )}
    </th>
  );

  const FilterInput = ({ column }) => (
    <input
      type="text"
      placeholder={`Filter ${column}`}
      value={filterConfig[column] || ''}
      onChange={(e) => handleFilter(column, e.target.value)}
      className="w-full border border-gray-300 p-1 rounded"
    />
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Advanced Stock Inventory Management</h1>
      
      <div className="mb-4 flex justify-between items-center">
        <div className="relative">
          <input
            type="text"
            placeholder="Search inventory..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-8 pr-2 py-1 border border-gray-300 rounded"
          />
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        </div>
        <div>
          <span>Page {currentPage} of {pageCount}</span>
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="ml-2 px-2 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, pageCount))}
            disabled={currentPage === pageCount}
            className="ml-2 px-2 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              {Object.keys(inventory[0]).map(column => (
                <TableHeader key={column} column={column} />
              ))}
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
            <tr>
              {Object.keys(inventory[0]).map(column => (
                <td key={column} className="border border-gray-300 p-1">
                  <FilterInput column={column} />
                </td>
              ))}
              <td className="border border-gray-300 p-1"></td>
            </tr>
          </thead>
          <tbody>
            {paginatedInventory.map((item) => (
              <tr key={item.id} className={item.quantity <= item.reorderPoint ? "bg-yellow-100" : ""}>
                {Object.entries(item).map(([key, value]) => (
                  <td key={key} className="border border-gray-300 p-2">
                    {editingId === item.id ? (
                      <input
                        type={key === 'price' || key === 'quantity' || key === 'reorderPoint' ? 'number' : 'text'}
                        value={newItem[key] || value}
                        onChange={(e) => setNewItem({ ...newItem, [key]: e.target.value })}
                        className="w-full border border-gray-300 p-1 rounded"
                      />
                    ) : key === 'imageUrl' ? (
                      <img src={value} alt={item.name} className="w-10 h-10 object-cover" />
                    ) : (
                      value
                    )}
                  </td>
                ))}
                <td className="border border-gray-300 p-2">
                  {editingId === item.id ? (
                    <>
                      <button onClick={() => saveEdit(item.id)} className="mr-2 text-green-500"><Save size={18} /></button>
                      <button onClick={cancelEditing} className="text-red-500"><X size={18} /></button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => startEditing(item.id)} className="mr-2 text-blue-500"><Edit size={18} /></button>
                      <button onClick={() => deleteItem(item.id)} className="text-red-500"><Trash2 size={18} /></button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2">
        {Object.keys(newItem).map(key => (
          <input
            key={key}
            type={key === 'price' || key === 'quantity' || key === 'reorderPoint' ? 'number' : key === 'lastRestocked' || key === 'expirationDate' ? 'date' : 'text'}
            placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
            value={newItem[key]}
            onChange={(e) => setNewItem({ ...newItem, [key]: e.target.value })}
            className="border border-gray-300 p-2 rounded"
          />
        ))}
        <button 
          onClick={addItem}
          className="col-span-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Item
        </button>
      </div>
    </div>
  );
};

export default StockInventory;