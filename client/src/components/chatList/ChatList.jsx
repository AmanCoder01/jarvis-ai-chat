import { Link } from "react-router-dom";
import "./chatList.css";
import { useQuery } from "@tanstack/react-query";


const ChatList = () => {
    const { isPending, error, data } = useQuery({
        queryKey: ["userChats"],
        queryFn: () =>
            fetch(`${import.meta.env.VITE_API_URL}/api/all-chats`, {
                credentials: "include",
            }).then((res) => res.json()),
    });

    console.log(data);
    console.log(error);


    return (
        <div className="chatList">
            <span className="text-sm font-bold">DASHBOARD</span>
            <Link to="/dashboard">Create a new Chat</Link>
            <Link to="/">Explore Lama AI</Link>
            <Link to="/">Contact</Link>
            <hr />
            <span className="text-sm font-bold">RECENT CHATS</span>
            <div className="list">
                {isPending
                    ? "Loading..."
                    : error
                        ? "Something went wrong!"
                        : data?.length === 0 ? <p>Search Something</p> : data?.map((chat) => (
                            <Link to={`/dashboard/chats/${chat.chat}`} key={chat._id}>
                                {chat?.title.slice(0, 30)}
                            </Link>
                        ))}
            </div>
            <hr />
            <div className="upgrade">
                <img src="/logo.png" alt="" />
                <div className="texts">
                    <span>Upgrade to Jarvis AI Pro</span>
                    <span>Get unlimited access to all features</span>
                </div>
            </div>
        </div>
    );
};

export default ChatList;