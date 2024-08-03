import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import "./Dashboard.css"

export const DashboardPage = () => {


    const queryClient = useQueryClient();

    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: (text) => {
            return fetch(`${import.meta.env.VITE_API_URL}/api/chats`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ text }),
            }).then((res) => res.json());
        },
        onSuccess: (id) => {
            // Invalidate and refetch
            console.log(id);
            queryClient.invalidateQueries({ queryKey: ["userChats"] });
            navigate(`/dashboard/chats/${id}`);
        },
    });


    const handleSubmit = async (e) => {
        e.preventDefault();
        const text = e.target.text.value;
        if (!text) return;

        mutation.mutate(text);
    };




    return (
        <div className="dashboardPage">
            <div className="texts">
                <div className="logo">
                    <img src="/logo.png" alt="" />
                    <h1>JARVIS AI</h1>
                </div>
                <div className="options">
                    <div className="option">
                        <img src="/chat.png" alt="" />
                        <Link to="/dashboard">Create a New Chat</Link>
                    </div>
                    <div className="option">
                        <img src="/image.png" alt="" />
                        <span>Analyze Images</span>
                    </div>
                    <div className="option">
                        <img src="/code.png" alt="" />
                        <span>Help me with my Code</span>
                    </div>
                </div>
            </div>
            <div className="formContainer">
                <form onSubmit={handleSubmit}>
                    <input type="text" name="text" placeholder="Ask me anything..." />
                    <button>
                        <img src="/arrow.png" alt="" />
                    </button>
                </form>
            </div>
        </div>
    )
}