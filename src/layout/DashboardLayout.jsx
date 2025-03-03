
import { Outlet } from 'react-router-dom';
import App from '../App';
import { createContext, useState } from 'react';
import Dashboard from '../pages/Dashboard';
import useAuth from '../hooks/useAuth';

export const ViewContext = createContext(null)
const DashboardLayout = () => {
    const [view, setView] = useState(true)
    const viewInfo = {view, setView}

    return (
        <ViewContext.Provider value={viewInfo}>
            <div>
        <Dashboard/>
            <Outlet/>
            </div>
         </ViewContext.Provider>
    );
};

export default DashboardLayout;