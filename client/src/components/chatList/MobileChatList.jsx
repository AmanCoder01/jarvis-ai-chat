import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { UserData } from '../../context/userContext';

export const MobileChatList = () => {
    const { isPending, error, data } = useQuery({
        queryKey: ["userChats"],
        queryFn: () =>
            fetch(`${import.meta.env.VITE_API_URL}/api/all-chats`, {
                credentials: "include",
            }).then((res) => res.json()),
    });
    const { user, setUser, userRawData, setUserRawData, menu, setMenu } = UserData();
    const navigate = useNavigate()

    return (
        <div className='relative bg-black h-full w-[60%] rounded-md md:hidden'>
            <div className='p-2 pl-4 flex flex-col justify-center'>
                <div >
                    Jarvis Ai
                </div>

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
                            : data?.length === 0 ? <p>Search Something</p> : data?.map((chat) => (
                                <Link to={`/dashboard/chats/${chat.chat}`} onClick={() => {
                                    setMenu(false)
                                }} key={chat._id}>
                                    <h1 className='text-[17px]'> {chat?.title}</h1>
                                </Link>
                            ))}
                </div>
            </div>
        </div>
    )
}
