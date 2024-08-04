import { useAuth } from '@clerk/clerk-react';
import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import ChatList from '../../components/chatList/ChatList';
import "./DashboardLayout.css"
import { UserData } from '../../context/userContext';

export const DashboardLayout = () => {

    const { user, setUser, userRawData, setUserRawData } = UserData();


    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/sign-in")
        }
    }, [user])





    return (
        <div className="dashboardLayout">
            <div className="menu">
                <ChatList />
            </div>
            <div className="content">
                <Outlet />
            </div>
        </div>
    )
}
