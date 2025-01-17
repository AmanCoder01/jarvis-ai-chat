import React, { useEffect, useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import "./RootLayout.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserContext } from '../../context/userContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Loader } from '../../components/Loader';
import { HiMenuAlt2 } from "react-icons/hi";
import { MobileChatList } from '../../components/chatList/MobileChatList';



const queryClient = new QueryClient();

export const RootLayout = () => {
    const [user, setUser] = useState(null);
    const [menu, setMenu] = useState(false);
    const [userRawData, setUserRawData] = useState(null);
    const [Loading, setLoading] = useState(false);


    const fetchUser = async () => {

        try {
            setLoading(true);
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/user`, { withCredentials: true });

            setUser(res.data.rest);

            setLoading(false);

        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };


    useEffect(() => {
        !user && fetchUser();
    }, [user])



    return (
        <UserContext.Provider value={{ user, setUser, userRawData, setUserRawData, menu, setMenu }}>
            <QueryClientProvider client={queryClient}>
                <div className="rootLayout">
                    <header>
                        <Link to="/" className="logo">
                            <img src="/logo.png" alt="" />
                            <span>JARVIS AI</span>
                        </Link>

                        <div className="user flex items-center gap-2">
                            {user && <img src={user?.img} alt='profile' className='h-8 w-8 rounded-full' />}
                            {user && <div onClick={() => setMenu(!menu)} className='block md:hidden'>
                                <HiMenuAlt2 size={28} />
                            </div>}
                        </div>
                    </header>
                    {
                        menu && user && <MobileChatList />
                    }
                    <main>
                        {Loading ? <Loader /> : <Outlet />}
                    </main>
                </div>
            </QueryClientProvider>
        </UserContext.Provider>
    )
}
