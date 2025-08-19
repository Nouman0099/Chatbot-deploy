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
import { v4 as uuidv4 } from "uuid";

export default function PopupChatBotC54() {
  const [styleParams, setStyleParams] = useState({
    fontSize: "14px",
    fontColor: "#ffffff",
    bgColor: "#303134",
    bubbleColor: "#40414F",
    botColor: "#40414F",
    inputBgColor: "#40414F",
    inputTextColor: "#ECECF1",
    inputPlaceHolderColor: "#9CA3AF",
    userMessageFontColor: "",
    chatbotResponseFontColor: "",
    submitTextColor: "#ffffff",
    inputBorderColor: "#565869",
    loaderColor: "#ffffff",
    fontColorDate: "#ffffff",
    bgColorMessage: "#40414F",
    fontColorMessage: "",
    fontColorPoweredBy: "#ffffff",
    bgColorPoweredByIcon: "",
    bgColor1: "#343541",
    fontColorHeader: "#ffffff",
    bgColorFooter: "#303134",
    welcomeMessage: 'Hello, thank you for contacting. How can I help you?'
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
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [number, setNumber] = useState("");
  const [randomId, setRandomId] = useState("");
  const [hasUserSentMessage, setHasUserSentMessage] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setStyleParams({
      fontSize: params.get("fontSize") || "24px",
      fontColor: params.get("fontColor") || "#ffffff",
      bgColor: params.get("bgColor") || "#303134",
      bubbleColor: params.get("bubbleColor") || "#40414F",
      botColor: params.get("botColor") || "#40414F",
      inputBgColor: params.get("inputBgColor") || "#40414F",
      inputTextColor: params.get("inputTextColor") || "#ECECF1",
      submitTextColor: params.get("submitTextColor") || "#ffffff",
      inputBorderColor: params.get("inputBorderColor") || "#565869",
      inputPlaceHolderColor: params.get("inputPlaceHolderColor") || "#9CA3AF",
      loaderColor: params.get("loaderColor") || "#ffffff",
      userMessageFontColor: params.get("userMessageFontColor") || "#ECECF1",
      fontColorDate: params.get("fontColorDate") || "#ffffff",
      bgColorMessage: params.get("bgColorMessage") || "#40414F",
      fontColorMessage: params.get("fontColorMessage") || "#ffffff",
      fontColorPoweredBy: params.get("fontColorPoweredBy") || "#ffffff",
      bgColorPoweredByIcon: params.get("bgColorPoweredByIcon") || "#202123",
      chatbotResponseFontColor:
      params.get("chatbotResponseFontColor") || "#ECECF1",
      fontColorHeader: params.get("fontColorHeader") || "#ffffff",
      bgColor1: params.get("bgColor1") || "#343541",
      bgColorFooter: params.get("bgColorFooter") || "#303134",
      welcomeMessage: params.get("welcomeMessage") || "Hello, thank you for contacting. How can I help you?",
    });
  }, []);

  useEffect(() => {
    messageScrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  //   useEffect(() => {
  //   const links = document.querySelectorAll(".bot-message a");

  //   links.forEach((link) => {
  //     link.addEventListener("click", (e) => {
  //       const href = (e.target as HTMLAnchorElement).getAttribute("href");
  //       console.log("Clicked link:", href);
  //     });
  //   });

  //   return () => {
  //     links.forEach((link) => {
  //       link.removeEventListener("click", () => {});
  //     });
  //   };
  // }, [messages]);

  useEffect(() => {
    const id = uuidv4();
    setRandomId(id);
  }, []);

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
    setHasUserSentMessage(true);
    try {
      const res = await fetch(
        "https://agent1.c1m.ai/webhook/ea7a9565-4c00-4ae3-9a33-1a40b56069cd",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            question: newMessage.user,
            sessionid: randomId,
          }),
        }
      );

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      // console.log(data)
      const botResponse = data[0].output;
      // console.log(botResponse);
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

    // setName("");
    // setEmail("");
    // setNumber("");
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

  // const formatMessage = (message: string) => {
  //   return (
  //     message
  //       .replace(/</g, "&lt;") // prevent XSS
  //       .replace(/>/g, "&gt;")

  //       // Paragraphs: double line breaks become new <p> blocks
  //       .replace(/\n{2,}/g, "</p><p>")

  //       // Line breaks: single \n becomes <br/>
  //       .replace(/\n/g, "<br/>")

  //       // Start and end with <p> to wrap the message
  //       .replace(/^/, "<p>")
  //       .replace(/$/, "</p>")

  //       // Make bullet point titles bold if surrounded by **
  //       .replace(/\*\*(.*?)\*\*:/g, "<strong>$1</strong>:")

  //       // Handle any other **text**
  //       .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")

  //       // Convert URLs to anchor links
  //       .replace(
  //         /(https?:\/\/[^\s]+)/g,
  //         '<a href="$1" target="_blank" class="text-blue-400 underline block">$1</a>'
  //       )
  //   );
  // };
  const formatMessage = (message: string) => {
    // Sanitize input to prevent XSS
    let safe = message.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    // Bold formatting
    safe = safe.replace(/\*\*(.*?)\*\*:/g, "<strong>$1</strong>:");
    safe = safe.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

    // Convert URLs to anchor tags (no console now)
    safe = safe.replace(
      /(https?:\/\/[^\s]+)/g,
      `<a href="$1" target="_blank" class="text-blue-400 underline block" onclick="event.stopPropagation();">$1</a>`
    );

    // Split into paragraphs using two or more newlines
    const paragraphs = safe
      .split(/\n{2,}/)
      .map((para) => `<p>${para.replace(/\n/g, "<br/>")}</p>`)
      .join("");

    return paragraphs;
  };

  const {
    fontSize,
    fontColor,
    bgColor,
    bgColor1,
    bubbleColor,
    botColor,
    inputBgColor,
    inputTextColor,
    submitTextColor,
    inputBorderColor,
    bgColorFooter,
    bgColorMessage,
    bgColorPoweredByIcon,
    fontColorDate,
    fontColorHeader,
    fontColorPoweredBy,
    fontColorMessage,
    inputPlaceHolderColor,
    loaderColor,
    chatbotResponseFontColor,
    userMessageFontColor,
    welcomeMessage,
  } = styleParams;

  return (
    <div className="relative">
      <div className="flex justify-center relative">
        <button
          className={`bg-black p-1 rounded-full fixed z-50 bottom-4 right-4 ${
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
              bgColor1 ? "" : "#343541"
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
                <p
                  className="text-white font-bold text-xl"
                  style={{ color: fontColorHeader, fontSize: fontSize }}
                >
                  COLLECTIVE 54
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

                  <p
                    className="text-white font-bold text-[20px]"
                    style={{ color: fontColorHeader, fontSize: fontSize }}
                  >
                    COLLECTIVE 54
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
                  {/* <p
                    className="text-white text-sm"
                    style={{ color: fontColor }}
                  >
                    Sync your conversation and continue messaging us through
                    your favorite app.
                  </p> */}
                  <div className="flex items-center space-x-3">
                    <div className="hover:bg-indigo-400 h-8 w-8 rounded-full flex items-center justify-center my-4 cursor-pointer"></div>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="px-12 pt-5 pb-10">
                    {/* <p
                      className="text-white text-[12px]"
                      style={{ color: fontColor }}
                    >
                      Sync your conversation and continue messaging us through
                      your favorite app.
                    </p> */}

                    <p
                      className="text-center text-white text-sm pb-10"
                      style={{ color: fontColorDate }}
                    >
                      {date}
                    </p>
                    <div className="max-w-[80%]">
                      <p
                        className="text-[12px] text-white"
                        style={{ color: fontColor }}
                      >
                        COLLECTIVE 54 Representative
                      </p>
                      <div
                        className="rounded-2xl p-3"
                        style={{
                          backgroundColor: bgColorMessage,
                          color: fontColorMessage,
                        }}
                      >
                        <p className="text-[13px]">
                         {welcomeMessage}
                        </p>
                      </div>
                    </div>
                  </div>

                  {messages.length === 0 && !hasUserSentMessage && (
                    <div className="flex items-center justify-center space-x-2 mb-5">
                      <div
                        className="h-[14px] w-6 rounded-t-full"
                        style={{ backgroundColor: bgColorPoweredByIcon }}
                      ></div>
                      <p
                        className="text-[14px] text-white pl-1"
                        style={{ color: fontColorPoweredBy }}
                      >
                        Powered by{" "}
                      </p>
                      <a href="https://c1m.ai/" target="_blank">
                        <Image
                          src={"/logo-tagline.png"}
                          alt="logo"
                          height={32}
                          width={56}
                          priority
                          className="h-8 w-14"
                        />
                      </a>
                    </div>
                  )}

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
                              color: userMessageFontColor,
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
                              <div className="flex space-x-11 relative max-w-[70%]">
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
                                  className="p-5 shadow-xl rounded-3xl border bg-gradient-to-r from-indigo-900 to-purple-900 max-w-[60%]"
                                >
                                  {/* Form fields remain unchanged */}
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
                                  className="flex flex-col px-3 pt-3 pb-1 rounded-3xl ms-7 w-fit max-w-[80%]"
                                  style={{
                                    backgroundColor: botColor,
                                    color: chatbotResponseFontColor,
                                  }}
                                >
                                  <p
                                    className="text-sm break-words whitespace-pre-wrap"
                                    style={{ wordBreak: "break-word" }}
                                    dangerouslySetInnerHTML={{
                                      __html: formatMessage(msg.bot),
                                    }}
                                  />
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

                    {/* Powered by after messages */}
                    {messages.length > 0 && (
                      <div className="flex items-center justify-center space-x-2 my-5">
                        <div
                          className="h-[14px] w-6 rounded-t-full"
                          style={{ backgroundColor: bgColorPoweredByIcon }}
                        ></div>
                        <p
                          className="text-[14px] text-white pl-1"
                          style={{ color: fontColorPoweredBy }}
                        >
                          Powered by{" "}
                        </p>
                        <a href="https://c1m.ai/" target="_blank">
                          <Image
                            src={"/logo-tagline.png"}
                            alt="logo"
                            height={32}
                            width={56}
                            priority
                            className="h-8 w-14"
                          />
                        </a>
                      </div>
                    )}
                  </div>

                  <div ref={messageScrollRef}></div>
                </div>
              )}
            </ScrollArea>
            {!isSecondPage && (
              <div
                className={`flex items-center space-x-3 ${
                  bgColorFooter ? "" : "bg-indigo-800"
                } h-16 rounded-b-3xl px-4 fixed bottom-0 w-full`}
                style={bgColorFooter ? { backgroundColor: bgColorFooter } : {}}
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
                  className="px-4 py-2 rounded-full text-sm w-full outline-none border placeholder:text-[var(--placeholder-color)]"
                  style={
                    {
                      "--placeholder-color": inputPlaceHolderColor, // dynamic
                      backgroundColor: inputBgColor,
                      color: inputTextColor,
                      borderColor: inputBorderColor,
                    } as React.CSSProperties
                  }
                />
                {isLoading ? (
                  <Loading1 color={loaderColor} />
                ) : (
                  <span>
                    <IoSendOutline
                      onClick={handleMessage}
                      className="text-white h-7 w-7 cursor-pointer"
                      style={{ color: submitTextColor }}
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
