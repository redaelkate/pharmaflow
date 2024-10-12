import Nav from './componements/navbar/nav';
import Inventory from './pages/Inventory';
import Dashboard from './pages/Dashboard';
import StockForecasting from './pages/StockForecasting';
import UserManagement from './pages/UserManagement';
import React,{useState} from 'react';
import OrderManagement from './pages/OrderManagement';
import Reports from './pages/Reports';
import LoginPage from './pages/LoginRegister';
const App=()=>{
    let [page,setPage]=useState('Login');
    let [state,setState]=useState('login');
    
    const renderPage = () => {
        switch (page) {
            case 'Dashboard':
                return <Dashboard />;
            case 'Inventory Management':
                return <Inventory />;
            case 'Stock Forecasting':
                return <StockForecasting />;
            case 'Order Management':
                return <OrderManagement />;
            case 'Reports':
                return <Reports />;
            case 'Settings':
                return <UserManagement />;
            default:
                return <LoginPage  setState={setState} />;
        }
    };


    return (
        <>
        <Nav setPage={setPage}/>
        {renderPage()}
    
        </>
    )
}
export default App;