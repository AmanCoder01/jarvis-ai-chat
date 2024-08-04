import "./ChatPage.css";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import Markdown from "react-markdown";
import { IKImage } from "imagekitio-react";
import NewPrompt from "../../components/newPrompt/NewPrompt";
import { useEffect, useState } from "react";
import axios from "axios";

export const ChatPage = () => {
    const path = useLocation().pathname;
    const chatId = path.split("/").pop();



    const { isPending, error, data } = useQuery({
        queryKey: ["chat", chatId],

        queryFn: () =>
            fetch(`${import.meta.env.VITE_API_URL}/api/chats/${chatId}`, {
                method: "GET",
                credentials: "include"
            }).then((res) => res.json()),
    });


    return (
        <div className="chatPage">
            <div className="wrapper">
                <div className="flex flex-col gap-[15px] w-[90%] md:w-[50%] ">
                    {isPending
                        ? "Loading..."
                        : data?.history?.map((message, i) => (
                            <div key={i} className="mt-4 ">
                                {message.img && (
                                    <IKImage
                                        urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
                                        path={message.img}
                                        height="250"
                                        width="300"
                                        transformation={[{ height: 250, width: 300 }]}
                                        loading="lazy"
                                        lqip={{ active: true, quality: 20 }}
                                    />
                                )}
                                <div
                                    className={`${message.role === "user" ? "message user" : "message"} overflow-x-auto`}
                                >
                                    <Markdown>{message.role === "user" ? "Q . " + message?.parts[0]?.text : message?.parts[0]?.text}</Markdown>
                                </div>
                            </div>
                        ))}

                    {data && <NewPrompt data={data} />}
                </div>
            </div>
        </div>
    );
};

