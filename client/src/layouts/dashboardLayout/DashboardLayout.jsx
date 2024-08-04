import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import ChatList from '../../components/chatList/ChatList';
import { UserData } from '../../context/userContext';
import { MobileChatList } from '../../components/chatList/MobileChatList';

export const DashboardLayout = () => {

    const { user, setUser, userRawData, setUserRawData, menu, setMenu } = UserData();


    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/sign-in")
        }
    }, [user])





    return (
        <div className="flex justify-center h-full relative">
            <div className="w-[0%] md:w-[25%] ">
                <ChatList />
            </div>

            <div className="w-full md:w-[75%] mx-auto bg-[#12101b] pt-6" >
                <Outlet />
            </div>
        </div>
    )
}
