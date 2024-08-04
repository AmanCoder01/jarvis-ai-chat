import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { UserData } from '../../context/userContext';
import toast from 'react-hot-toast';
import axios from 'axios';

export const MobileChatList = () => {
    const { isPending, error, data } = useQuery({
        queryKey: ["userChats"],
        queryFn: () =>
            fetch(`${import.meta.env.VITE_API_URL}/api/all-chats`, {
                credentials: "include",
            }).then((res) => res.json()),
    });
    const { user, setUser, userRawData, setUserRawData, menu, setMenu } = UserData();
    const navigate = useNavigate();


    const handleLogout = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/logout`, { withCredentials: true })

            toast.success(res.data.message)
            setMenu(false);
            setUser(null)
            navigate("/sign-in")
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message)
        }
    }



    return (
        <div className='absolute right-0 top-14 z-50 bg-black h-[92%] w-[60%] rounded-md md:hidden'>
            <div className='p-2 pl-4 flex flex-col justify-center'>
                <Link to="/" >
                    Jarvis Ai
                </Link>

                <span className=" text-xs font-bold">DASHBOARD</span>
                <Link to="/dashboard">Create a new Chat</Link>
                <Link to="/">Explore Lama AI</Link>
                <Link to="/">Contact</Link>

                <div></div>

                <span className="text-md font-bold ">RECENT CHATS</span>
                <div className="flex flex-col justify-center gap-2 mt-2">
                    {isPending
                        ? "Loading..."
                        : error
                            ? "Something went wrong!"
                            : data?.length === 0 ? <p>Search Something</p> : data.data?.map((chat) => (
                                <Link to={`/dashboard/chats/${chat.chat}`} onClick={() => {
                                    setMenu(false)
                                }} key={chat._id}>
                                    <h1 className='text-[17px]'> {chat?.title}</h1>
                                </Link>
                            ))}
                </div>


                <div className='mt-8'>
                    <button onClick={handleLogout}
                        className='hover:bg-gray-800 w-full py-2 rounded-lg'>Logout</button>
                </div>
            </div>
        </div>
    )
}
