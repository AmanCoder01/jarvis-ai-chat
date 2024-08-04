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
                <div className="flex items-center gap-[30px] md:gap-[50px] justify-center opacity-20 ">
                    <img src="/logo.png" alt="" className="w-[64px] h-[64px]" />
                    <h1 className="logoText whitespace-nowrap">JARVIS AI</h1>
                </div>
                <div className="flex items-center gap-[10px] md:gap-[50px] justify-center">
                    <div className="border p-4 rounded-2xl h-[10rem] md:h-[12rem] min-w-[7rem] flex flex-col justify-center items-center gap-2 border-gray-600 text-center">
                        <img src="/chat.png" alt="" />
                        <Link to="/dashboard" className="text-sm md:text-md ">Create a New Chat</Link>
                    </div>
                    <div className="border p-4 rounded-2xl h-[10rem] md:h-[12rem]  min-w-[7rem] flex flex-col justify-center items-center gap-2 border-gray-600 text-center">
                        <img src="/image.png" alt="" />
                        <span className="text-sm md:text-md ">Analyze Images</span>
                    </div>
                    <div className="border p-4 rounded-2xl h-[10rem] md:h-[12rem]  min-w-[7rem] flex flex-col justify-center items-center gap-2 border-gray-600 text-center">
                        <img src="/code.png" alt="" />
                        <span className="text-sm md:text-md ">Help me with my Code</span>
                    </div>
                </div>
            </div>
            <div className="w-full md:w-[50%] ">
                <form onSubmit={handleSubmit} className="flex items-center relative">
                    <input type="text" name="text" placeholder="Ask me anything..."
                        className="py-4 md:py-5 px-6 bg-[#2c2937] rounded-2xl pr-16 w-full  outline-none border-none text-md  md:text-lg"
                    />
                    <button>
                        <img src="/arrow.png" alt="" className="w-9 p-2 h-9 bg-[#605e68] rounded-full absolute bottom-2 md:bottom-4  right-3" />
                    </button>
                </form>
            </div>
        </div>
    )
}
