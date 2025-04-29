"use client";

import Image from "next/image";
import { HiDotsVertical } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import { ScrollArea } from "@/components/ui/scroll-area";
import React, { useEffect, useRef, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import "animate.css";
import Loading1 from "./Loading1";
import { IoSendOutline } from "react-icons/io5";

export default function PopupChatBotC1m() {
  const [styleParams, setStyleParams] = useState({
    fontSize: "14px",
    fontColor: "#ffffff",
    bgColor: "",
    bgColor1: "",
    bubbleColor: "#3730a3",
    botColor: "#6b21a8",
  });

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isSecondPage, setIsSecondPage] = useState(false);
  const [closing, setClosing] = useState(false);
  const [iconAnimation, setIconAnimation] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<
    { user: string; bot: string | null; time: string }[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const messageScrollRef = useRef<HTMLDivElement | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setStyleParams({
      fontSize: params.get("fontSize") || "24px",
      fontColor: params.get("fontColor") || "#ffffff",
      bgColor: params.get("bgColor") || "",
      bgColor1: params.get("bgColor1") || "",
      bubbleColor: params.get("bubbleColor") || "#4338ca",
      botColor: params.get("botColor") || "#6b21a8",
    });
  }, []);

  useEffect(() => {
    messageScrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const date = new Date().toLocaleTimeString([], {
    month: "long", // Full month name
    day: "numeric", // Day of the month
    year: "numeric", // Full year
    hour: "numeric", // Hour in 12-hour format
    minute: "2-digit", // Minutes with leading zero if necessary
    hour12: true, // 12-hour format with AM/PM
  });

  const handleMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      const currentTime = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      const newMessage = { user: message, bot: null, time: currentTime };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setMessage("");
      await chatBotResponse(newMessage);
    }
  };

  const chatBotResponse = async (newMessage: {
    user: string;
    bot: string | null;
  }) => {
    setIsLoading(true);
    try {
      const res = await fetch(
        "https://n8n.c1m.ai/webhook/02e84451-d545-48a3-96c9-3e56c5c8c9b0",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ input: {question: newMessage.user, sessionid: 'exco22'} }),
        }
      );

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      const botResponse = data.output;
      //   console.log(botResponse);
      // res.data[0].output

      // Update the bot response for the latest user message
      setMessages((prevMessages) =>
        prevMessages.map((msg, index) =>
          index === prevMessages.length - 1 ? { ...msg, bot: botResponse } : msg
        )
      );
    } catch (error) {
      console.error(error);
      // Handle error response for the bot
      setMessages((prevMessages) =>
        prevMessages.map((msg, index) =>
          index === prevMessages.length - 1
            ? { ...msg, bot: "Sorry, something went wrong." }
            : msg
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // const userInfo = {
    //   name: name,
    //   email: email,
    //   phone_no: number,
    // };
    // console.log(userInfo);

    setName("");
    setEmail("");
    setNumber("");
  };

  const handleOpen = () => {
    setIconAnimation(true); // Trigger fade-out animation for the icon
    setIsPopoverOpen(true);
    setIconAnimation(false); // Reset the animation state
    setIsSecondPage(false);
  };

  const handleClose = () => {
    setClosing(true); // Trigger popover close animation
    setTimeout(() => {
      setIsPopoverOpen(false);
      setClosing(false); // Reset the closing state
    }, 300); // Matches the animation duration
  };

  // const formatMessage = (message: string) => {
  //   return message
  //     .replace(/(\*\*)(.*?)(\*\*)/g, "<strong>$2</strong>") // Remove ** and make text bold
  //     .replace(/### (.*?)(?=\s|$)/g, "<h2><strong>$1</strong></h2>") // Convert ### to heading 2 and make it bold
  //     .replace(/[\[(](https?:\/\/[^\s\])]+)[\])]/g, "$1") // Remove () or [] around URLs
  //     .replace(
  //       /(https?:\/\/[^\s]+)/g,
  //       '<br/><a href="$1" target="_blank" class="text-blue-400 underline block">$1</a>' // Add a line break before the URL
  //     );
  // };

  const formatMessage = (message: string) => {
    return message
      // Convert double line breaks to paragraphs
      .replace(/\n{2,}/g, '</p><p>')
      // Wrap entire message in <p> to start properly
      .replace(/^/, '<p>')
      .replace(/$/, '</p>')
      // Replace bullet-style bold headings with proper formatting
      .replace(/\*\*(.*?)\*\*:/g, '<strong>$1</strong>:')
      // Replace remaining bold syntax
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      // Handle ### as bullets too
      .replace(/### (.*?)(?=\s|$)/g, '<p>• <strong>$1</strong></p>')
      // Convert markdown-style links
      .replace(/[\[(](https?:\/\/[^\s\])]+)[\])]/g, '$1')
      // Convert plain links to anchor tags
      .replace(
        /(https?:\/\/[^\s]+)/g,
        '<br/><a href="$1" target="_blank" class="text-blue-400 underline block">$1</a>'
      );
  };
  const { fontSize, fontColor, bgColor, bgColor1, bubbleColor, botColor } =
    styleParams;

  return (
    <div className="relative">
      <div className="flex justify-center relative">
        <button
          className={`bg-indigo-900 p-1 rounded-full fixed z-50 bottom-4 right-4 ${
            isPopoverOpen
              ? "opacity-0 pointer-events-none"
              : iconAnimation
              ? "animate__animated animate__fadeInTopLeft opacity-0 pointer-events-none "
              : "animate__animated animate__fadeInBottomRight animate__faster"
          }`}
          onClick={handleOpen}
        >
          <Image
            src={"/chatbot.jpeg"}
            alt={"chatbot"}
            height={80}
            width={80}
            priority
            className="rounded-full h-12 w-12 cursor-pointer"
          />
        </button>
        {isPopoverOpen && (
          <div
            className={`p-0 border-none w-[360px] lg:h-[480px] md:h-[445px] h-[440px] lg:bottom-12 md:bottom-6 bottom-8 sm:right-8 right-[6px] fixed z-40 rounded-3xl ${
              bgColor1 ? "" : "bg-gradient-to-r from-indigo-900 to-purple-900"
            } ${
              closing
                ? "animate__animated animate__fadeOutBottomRight"
                : "animate__animated animate__fadeInBottomRight animate__faster"
            }`}
            style={bgColor1 ? { backgroundColor: bgColor1 } : {}}
          >
            {!isSecondPage ? (
              <div
                className={`${
                  bgColor ? "" : "bg-indigo-800"
                } rounded-t-3xl px-5 flex justify-between items-center h-16`}
                style={bgColor ? { backgroundColor: bgColor } : {}}
              >
                {/* <div>
                  <Image
                    src={"/logo-tagline.jpg"}
                    alt="logo"
                    height={40}
                    width={40}
                    className="rounded-full h-12 w-12"
                    priority
                  />
                </div> */}
                <p
                  className="text-white font-bold text-xl"
                  style={{ color: fontColor, fontSize: fontSize }}
                >
                  C1M Presales
                </p>
                <div className="flex space-x-2 text-white">
                  <span>
                    <HiDotsVertical
                      size={32}
                      className="cursor-pointer hover:bg-black/25 rounded-full p-1"
                      onClick={() => setIsSecondPage(true)}
                    />
                  </span>

                  <span>
                    <IoMdClose
                      size={32}
                      onClick={handleClose}
                      className="cursor-pointer hover:bg-black/25 rounded-full p-1"
                    />
                  </span>
                </div>
              </div>
            ) : (
              <div
                className={`${
                  bgColor ? "" : "bg-indigo-800"
                } rounded-t-3xl px-5 flex justify-between items-center h-16`}
                style={bgColor ? { backgroundColor: bgColor } : {}}
              >
                <div className="flex space-x-4 items-center">
                  <span>
                    <FaArrowLeft
                      size={24}
                      onClick={() => setIsSecondPage(false)}
                      className="cursor-pointer hover:bg-black/25 rounded-full p-1 text-white"
                    />
                  </span>
                  {/* <div>
                  <Image
                    src={"/logo-tagline.jpg"}
                    alt="logo"
                    height={40}
                    width={40}
                    className="rounded-full h-12 w-12"
                    priority
                  />
                  </div> */}
                  <p
                    className="text-white font-bold text-xl"
                    style={{ color: fontColor, fontSize: fontSize }}
                  >
                    C1M Presales
                  </p>
                </div>
                <span>
                  <IoMdClose
                    size={32}
                    onClick={handleClose}
                    className="cursor-pointer hover:bg-black/25 rounded-full p-1 text-white"
                  />
                </span>
              </div>
            )}
            <ScrollArea className="lg:w-[360px] w-[350px] lg:h-[350px] h-[300px] rounded-md">
              {isSecondPage ? (
                <div className="px-8 py-5">
                  <p
                    className="text-white text-sm"
                    style={{ color: fontColor }}
                  >
                    Sync your conversation and continue messaging us through your favorite app.
                  </p>
                  <div className="flex items-center space-x-3">
                    <div
                      className="hover:bg-indigo-400 h-8 w-8 rounded-full flex items-center justify-center my-4 cursor-pointer"
                      //   onClick={() => {
                      //     const phoneNumber = "923224944833";
                      //     const message = encodeURIComponent(
                      //       "Hello, I would like to chat with you!"
                      //     );
                      //     window.location.href = `https://wa.me/${phoneNumber}?text=${message}`;
                      //   }}
                    >
                      {/* <Image
                        src={"/whatsapp.svg"}
                        alt="whatsapp"
                        height={24}
                        width={24}
                        priority
                      /> */}
                    </div>
                    {/* <p className="text text-white" style={{ color: fontColor }}>
                      WhatsApp
                    </p> */}
                  </div>
                </div>
              ) : (
                <div>
                  <div className="px-12 py-10">
                    <p
                      className="text-white text-[12px]"
                      style={{ color: fontColor }}
                    >
                      Sync your conversation and continue messaging us through
                      your favorite app.
                    </p>
                    {/* <div
                      className="hover:bg-indigo-400 h-8 w-8 rounded-full flex items-center justify-center mx-auto my-4 cursor-pointer"
                      //   onClick={() => {
                      //     const phoneNumber = "923224944833";
                      //     const message = encodeURIComponent(
                      //       "Hello, I would like to chat with you!"
                      //     );
                      //     const whatsappURI = `https://wa.me/${phoneNumber}?text=${message}`;
                      //     window.open(whatsappURI, "_blank");
                      //   }}
                    >
                      <Image
                        src={"/whatsapp.svg"}
                        alt="whatsapp"
                        height={24}
                        width={24}
                        priority
                      />
                    </div> */}
                    <p className="text-center text-white text-sm py-10">
                      {date}
                    </p>
                    <div className="max-w-[80%]">
                      <p
                        className="text-[12px] text-white"
                        style={{ color: fontColor }}
                      >
                        C1M Presales Representative
                      </p>
                      <div className="bg-purple-600 rounded-2xl p-3">
                        <p className="text-[13px] text-white">
                          Hello , thank you for contacting C1M Presales!
                        </p>
                      </div>
                      {/* <div className="bg-purple-600 rounded-r-2xl rounded-b-2xl p-3 mt-1">
                        <p className="text-[13px] text-white">
                          Please confirm your contact information in case we get
                          disconnected, and we will transfer you to a
                          FinanceForFounder representative.
                        </p>
                      </div> */}
                    </div>
                  </div>

                  <div className="flex items-center justify-center space-x-2 mb-5">
                    <div className="h-[14px] w-6 rounded-t-full bg-purple-600"></div>
                    <p className="text-[14px] text-white pl-1">
                      Powered by{" "}
                    </p>
                    <a href="https://c1m.ai/" target="_blank">
                      <Image
                        src={"/logo-tagline.jpg"}
                        alt="logo"
                        height={20}
                        width={20}
                        priority
                        className="h-7 w-7 rounded-full"
                      />
                      </a>
                  </div>
                  <div className="ms-4 me-9 flex flex-col">
                    {messages.map((msg, index) => (
                      <div key={index} className="my-2 space-y-3">
                        {/* User Message */}
                        <div className="flex justify-end">
                          <div
                            className="flex flex-col text-sm px-3 pt-3 pb-1 rounded-3xl max-w-[70%]"
                            style={{
                              backgroundColor: bubbleColor,
                              // fontSize,
                              color: fontColor,
                            }}
                          >
                            <p>{msg.user}</p>
                            <span className="text-[9px] text-end">
                              {msg.time}
                            </span>
                          </div>
                        </div>
                        {/* Bot Response */}
                        {msg.bot && (
                          <div className="flex justify-start">
                            {msg.bot === "Show form." ? (
                              <div className="flex space-x-11 relative max-w-[80%]">
                                <div className="absolute bottom-1">
                                  <Image
                                    src={"/chatbot.jpeg"}
                                    alt={"chatbot"}
                                    height={40}
                                    width={40}
                                    priority
                                    className="rounded-full h-7 w-7"
                                  />
                                </div>
                                <form
                                  onSubmit={handleSubmit}
                                  className="p-5 shadow-xl rounded-3xl border bg-gradient-to-r from-indigo-900 to-purple-900 max-w-[80%]"
                                >
                                  <div className="flex flex-col space-y-1">
                                    <label>Full Name</label>
                                    <input
                                      type="text"
                                      className="px-3 py-[6px] rounded-full my-2 outline-none bg-indigo-800/70 text-white placeholder:text-indigo-400 border border-indigo-600"
                                      value={name}
                                      onChange={(e) => {
                                        setName(e.target.value);
                                      }}
                                      required
                                    />
                                  </div>
                                  <div className="flex flex-col space-y-1 my-3">
                                    <label>Email</label>
                                    <input
                                      type="email"
                                      className="px-3 py-[6px] rounded-full my-2 outline-none bg-indigo-800/70 text-white placeholder:text-indigo-400 border border-indigo-600"
                                      value={email}
                                      onChange={(e) => {
                                        setEmail(e.target.value);
                                      }}
                                      required
                                    />
                                  </div>
                                  <div className="flex flex-col space-y-1">
                                    <label>Phone</label>
                                    <input
                                      type="number"
                                      className="px-3 py-[6px] rounded-full my-2 outline-none bg-indigo-800/70 text-white placeholder:text-indigo-400 border border-indigo-600"
                                      value={number}
                                      onChange={(e) => {
                                        setNumber(e.target.value);
                                      }}
                                      required
                                    />
                                  </div>
                                  <button
                                    type="submit"
                                    className="border mt-3 bg-indigo-600 hover:bg-indigo-500 text-white flex justify-center items-center font-medium duration-200 px-3 py-1 rounded-lg mx-auto"
                                  >
                                    Submit
                                  </button>
                                </form>
                              </div>
                            ) : (
                              <div className="flex relative">
                                <div className="absolute bottom-0">
                                  <Image
                                    src={"/chatbot.jpeg"}
                                    alt={"chatbot"}
                                    height={40}
                                    width={40}
                                    priority
                                    className="rounded-full h-7 w-7"
                                  />
                                </div>

                                <div
                                  className=" flex flex-col px-3 pt-3 pb-1 rounded-3xl max-w-[80%] ms-7"
                                  style={{
                                    backgroundColor: botColor,
                                    // fontSize,
                                    color: fontColor,
                                  }}
                                >
                                  <p
                                    className="text-white text-sm break-words overflow-hidden"
                                    dangerouslySetInnerHTML={{
                                      __html: formatMessage(msg.bot),
                                    }}
                                  >
                                    {/* {msg.bot} */}
                                  </p>
                                  <span className="text-[9px] text-end text-white">
                                    {msg.time}
                                  </span>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  <div ref={messageScrollRef}></div>
                </div>
              )}
            </ScrollArea>
            {!isSecondPage && (
              <div
                className={`flex items-center space-x-3 ${
                  bgColor ? "" : "bg-indigo-800"
                } h-16 rounded-b-3xl px-4 fixed bottom-0 w-full`}
                style={bgColor ? { backgroundColor: bgColor } : {}}
              >
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleMessage(e); // Trigger search on Enter
                    }
                  }}
                  disabled={isLoading}
                  placeholder="Type a message..."
                  className="px-4 py-2 rounded-full text-sm w-full outline-none placeholder:text-indigo-400 border border-indigo-600"
                  style={{
                    backgroundColor: "#4f46e5",
                    color: fontColor,
                    // fontSize,
                  }}
                />
                {isLoading ? (
                  <Loading1 />
                ) : (
                  <span>
                    <IoSendOutline
                      onClick={handleMessage}
                      className="text-white h-7 w-7 cursor-pointer"
                    />
                  </span>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
