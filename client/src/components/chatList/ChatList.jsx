import { Link } from "react-router-dom";
import "./chatList.css";
import { useQuery } from "@tanstack/react-query";
import { UserData } from "../../context/userContext";

const ChatList = () => {
    const { isPending, error, data } = useQuery({
        queryKey: ["userChats"],
        queryFn: () =>
            fetch(`${import.meta.env.VITE_API_URL}/api/all-chats`, {
                credentials: "include",
            }).then((res) => res.json()),
    });

    const { user, setUser, userRawData, setUserRawData, menu, setMenu } = UserData();

    return (
        <div className="chatList">
            <span className=" text-xs font-bold">DASHBOARD</span>
            <Link to="/dashboard">Create a new Chat</Link>
            <Link to="/">Explore Lama AI</Link>
            <Link to="/">Contact</Link>
            <hr />
            <span className="text-xs font-bold">RECENT CHATS</span>
            <div className="list">
                {isPending
                    ? "Loading..."
                    : error
                        ? "Something went wrong!"
                        : data?.length === 0 ? <p>Search Something</p> : data?.map((chat) => (
                            <Link to={`/dashboard/chats/${chat.chat}`} key={chat._id}>
                                {chat?.title}
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