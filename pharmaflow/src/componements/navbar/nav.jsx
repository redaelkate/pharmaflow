import React,{useState} from "react";
import man from "../assets/man.png";
const Nav= ({setPage}) => {
    
    const [activeLink, setActiveLink] = useState('');
    let [login, setLogin] = useState(true);
    
    let handleLinkClick = (linkName) => 
    {
        setActiveLink(linkName);
        setPage(linkName);
        console.log(linkName);
        
    };

    return (
        <>
            <nav className="bg-gray-200 shadow shadow-gray-300 w-100 px-8 md:px-auto">
                <div className="md:h-16 h-28 mx-auto md:px-4 container flex items-center justify-between flex-wrap md:flex-nowrap">
                    <div className="text-indigo-500 md:order-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                        </svg>
                    </div>
                    <div className="text-gray-500 order-3 w-full md:w-auto md:order-2">
                        <ul className="flex font-semibold justify-between">
                            {['Dashboard', 'Inventory Management', 'Stock Forecasting', 'Order Management', 'Reports', 'Settings'].map(linkName => (
                                <li key={linkName} className={`md:px-4 md:py-2 ${activeLink === linkName ? 'text-sky-500/75' : 'hover:text-sky-800/75'}`}>
                                    <a href="" onClick={(e) => { e.preventDefault(); handleLinkClick(linkName); }}>{linkName}</a>

                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="order-2 md:order-3">
                         
                            {login && <button onClick={()=>{setLogin(false)}} className="px-4 py-2 bg-sky-500/75 hover:bg-indigo-600 text-gray-50 rounded-xl flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z" clip-rule="evenodd" />
                                </svg>
                                <span>Login</span>
                            </button>}
                            {!login && <img onClick={()=>{setLogin(true)}} src={man} width={50} style={{borderColor:'black',borderWidth:'2px',borderRadius:'100px'}}/>}
                        
                    </div>
                </div>
            </nav>
        </>
    )};


export default Nav;