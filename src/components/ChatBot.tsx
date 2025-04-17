"use client"
import Loading1 from "@/components/Loading1";
import { ScrollArea } from "@/components/ui/scroll-area";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
// import { IoMdClose } from "react-icons/io";

export default function ChatBot() {
  const [loading, setLoading] = useState(false);
  const [userMessage, setUserMessage] = useState("");
  // const [open, setOpen] = useState(true);
  const [messages, setMessages] = useState<
    { user: string; botRes: string | null; time: string }[]
  >([]);
  const messageRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    messageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (userMessage.trim()) {
      const currentTime = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      const newMessage = { user: userMessage, botRes: null, time: currentTime };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setUserMessage("");
      await sendMessage(newMessage);
    }
  };

  const sendMessage = async (newMessage: {
    user: string;
    botRes: string | null;
  }) => {
    setLoading(true);
    try {
      const payload = { chatInput: newMessage.user };
      // console.log(payload);
      const res = await axios.post(
        `https://agent1.c1m.ai/webhook/a9f23ed9-0a2f-4ea0-b64c-0b166e32b296`,
        payload
      );
      // console.log(res.data);
      const botResponse = res.data[0].output;

    //   const token = localStorage.getItem("usertoken");
    //   if (!token) return;
    //   const payload = {id: video.id, start_time: "00:02:0.0", end_time: "00:04:0.0"};
    //   // console.log(payload);
    //   const res = await axios.post(
    //     `${process.env.NEXT_PUBLIC_VIDEOCHAT_API_URL}/api/timestamp/`,
    //     payload,
    //     {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //         "Content-Type": "multipart/form-data",
    //       },
    //     }
    //   );
    //   console.log(res.data);
    //   const botResponse = res.data.video_path;
    // update the bot response for the latest user message
      setMessages((prevMessages) =>
        prevMessages.map((msg, index) =>
          index === prevMessages.length - 1
            ? { ...msg, botRes: botResponse }
            : msg
        )
      );
    } catch (error) {
      console.error("Failed to send message:", error);
      setMessages((prevMessages) =>
        prevMessages.map((msg, index) =>
          index === prevMessages.length - 1
            ? { ...msg, botRes: "Sorry, something went wrong." }
            : msg
        )
      );
    } finally {
      setLoading(false);
    }
  };
  
  const formatMessage = (message: string) => {
    return message
      .replace(/(\*\*)(.*?)(\*\*)/g, "<strong>$2</strong>") // Remove ** and make text bold
      .replace(/### (.*?)(?=\s|$)/g, "<h2><strong>$1</strong></h2>") // Convert ### to heading 2 and make it bold
      .replace(/[\[(](https?:\/\/[^\s\])]+)[\])]/g, "$1") // Remove () or [] around URLs
      .replace(
        /(https?:\/\/[^\s]+)/g,
        '<br/><a href="$1" target="_blank" class="text-blue-400 underline block">$1</a>' // Add a line break before the URL
      );
  };
  

  return (
    <div className="max-w-screen-sm mx-auto pt-20">
      <div className="pt-1 rounded-xl pb-10 bg-gradient-to-br from-purple-950 to bg-indigo-900 border border-indigo-700">
        <div className="flex justify-between items-center pr-10">
          <p className="font-extrabold text-2xl capitalize mx-auto text-white pb-2">
          Finance For Founders
          </p>
          {/* <span className="cursor-pointer">
            <IoMdClose onClick={() => setOpen(false)} size={24} />
          </span> */}
        </div>
        <div className="mt-2 border border-purple-400 rounded-xl max-w-xl h-[330px] overflow-y-auto mx-auto p-3 flex flex-col relative">
          <ScrollArea className="h-[250px]">
            {messages.map((msg, index) => (
              <div key={index} className="space-y-3 p-2 ">
                <div className="flex justify-end">
                  <div className="max-w-[60%]">
                    <p className="text-white rounded-xl px-3 py-[6px] bg-indigo-700 text-sm mr-3">
                      {msg.user}
                    </p>
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="max-w-[60%]">
                    {msg.botRes && (
                      <p
                        className="text-white rounded-xl px-3 py-[6px] bg-purple-800 text-sm break-words overflow-hidden"
                        dangerouslySetInnerHTML={{
                          __html: formatMessage(msg.botRes),
                        }}
                      ></p>
                    )}
                    {/* {msg.botRes && (
                      <video
                        className="rounded-xl px-3 py-[6px] bg-purple-800 text-sm break-words overflow-hidden"
                        controls
                        src={msg.botRes}
                        width="300"
                      ></video>
                    )} */}
                  </div>
                </div>
                <div ref={messageRef}></div>
              </div>
            ))}
          </ScrollArea>
          <div className="flex items-center space-x-2 ml-1 w-[95%] absolute bottom-2">
            <input
              type="text"
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleMessage(e); // Trigger search on Enter
                }
              }}
              disabled={loading}
              placeholder="Type a message..."
              className="rounded-lg px-3 py-2 w-full outline-none bg-indigo-800/70 text-white placeholder:text-indigo-400 border border-indigo-600"
              required
            />
            {loading ? (
              <Loading1 />
            ) : (
              <button
                onClick={handleMessage}
                className="rounded-lg px-3 py-2 font-semibold w-24 bg-indigo-600 hover:bg-indigo-500 text-white cursor-pointer"
              >
                Send
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
