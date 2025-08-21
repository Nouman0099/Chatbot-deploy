"use client";

import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Loading1 from "@/components/Loading1";
import { ScrollArea } from "@/components/ui/scroll-area";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";
import { IoMdArrowUp } from "react-icons/io";

export default function ChatBot() {
  const [styleParams, setStyleParams] = useState({
    fontSize: "30px",
    fontColor: "#111827",
    bgColor: "#F9FAFB",
    bubbleColor: "#E5E7EB",
    botColor: "#E5E7EB",
    inputBgColor: "#FFFFFF",
    inputTextColor: "#111827",
    inputPlaceHolderColor: "#9CA3AF",
    userMessageFontColor: "",
    chatbotResponseFontColor: "",
    submitTextColor: "#111827",
    inputBorderColor: "#D1D5DB",
    loaderColor: "#ffffff",
    fontColorDate: "#111827",
    bgColorMessage: "#E5E7EB",
    fontColorMessage: "#111827",
    fontColorPoweredBy: "#111827",
    //  bgColorPoweredByIcon: "",
    messageBorderColor: "#6B7280",
    submitBgColor: "#ffffff",
    welcomeMessage: "Hello , thank you for contacting FinanceForFounder!",
  });
  const [loading, setLoading] = useState(false);
  const [userMessage, setUserMessage] = useState("");
  const [messages, setMessages] = useState<
    { user: string; botRes: string | null; time: string }[]
  >([]);
  const [randomId, setRandomId] = useState("");
  const [hasUserSentMessage, setHasUserSentMessage] = useState(false);

  const messageRef = useRef<HTMLDivElement | null>(null);

  const date = new Date().toLocaleTimeString([], {
    month: "long", // Full month name
    day: "numeric", // Day of the month
    year: "numeric", // Full year
    hour: "numeric", // Hour in 12-hour format
    minute: "2-digit", // Minutes with leading zero if necessary
    hour12: true, // 12-hour format with AM/PM
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    console.log("inputBgColor:", params.get("inputBgColor"));
    setStyleParams({
      fontSize: params.get("fontSize") || "30px",
      fontColor: params.get("fontColor") || "#111827",
      bgColor: params.get("bgColor") || "#F9FAFB",
      bubbleColor: params.get("bubbleColor") || "#E5E7EB",
      botColor: params.get("botColor") || "#E5E7EB",
      inputBgColor: params.get("inputBgColor") || "#FFFFFF",
      inputTextColor: params.get("inputTextColor") || "#111827",
      submitTextColor: params.get("submitTextColor") || "#ffffff",
      inputBorderColor: params.get("inputBorderColor") || "#D1D5DB",
      inputPlaceHolderColor: params.get("inputPlaceHolderColor") || "#9CA3AF",
      loaderColor: params.get("loaderColor") || "#ffffff",
      userMessageFontColor: params.get("userMessageFontColor") || "#111827",
      fontColorDate: params.get("fontColorDate") || "#111827",
      bgColorMessage: params.get("bgColorMessage") || "#E5E7EB",
      fontColorMessage: params.get("fontColorMessage") || "#111827",
      fontColorPoweredBy: params.get("fontColorPoweredBy") || "#111827",
      // bgColorPoweredByIcon: params.get("bgColorPoweredByIcon") || "#202123",
      chatbotResponseFontColor:
        params.get("chatbotResponseFontColor") || "#111827",
      messageBorderColor: params.get("messageBorderColor") || "#6B7280",
      submitBgColor: params.get("submitBgColor") || "#111827",
      welcomeMessage:
        params.get("welcomeMessage") ||
        "Hello , thank you for contacting FinanceForFounder!",
    });
  }, []);

  // console.log(styleParams);

  useEffect(() => {
    messageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const id = uuidv4();
    setRandomId(id);
  }, []);

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
    setHasUserSentMessage(true);
    try {
      // console.log(randomId)
      const history = messages.flatMap((mes) => [
        { role: "userMessage", content: mes.user },
        ...(mes.botRes ? [{ role: "apiMessage", content: mes.botRes }] : []),
      ]);
      // console.log(history)
      const payload = {
        input: {
          question: newMessage.user,
          sessionid: randomId,
          history: history,
        },
      };
      console.log(payload);
      const res = await axios.post(
        `https://agent1.c1m.ai/webhook/6e0bd33a-9fe7-45e8-92f0-35d4999a93c7`,
        payload
      );
      console.log(res.data);
      const botResponse = res.data.text;
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
      .replace(/(\*\*)(.*?)(\*\*)/g, "<strong>$2</strong>")
      .replace(/### (.*?)(?=\s|$)/g, "<h2><strong>$1</strong></h2>")
      .replace(/[\[(](https?:\/\/[^\s\])]+)[\])]/g, "$1")
      .replace(
        /(https?:\/\/[^\s]+)/g,
        '<br/><a href="$1" target="_blank" class="text-blue-400 underline block">$1</a>'
      );
  };

  const {
    fontSize,
    fontColor,
    // bgColor,
    bubbleColor,
    // botColor,
    inputBgColor,
    inputTextColor,
    submitBgColor,
    submitTextColor,
    // messageBorderColor,
    inputBorderColor,
    // inputPlaceHolderColor,
    loaderColor,
    chatbotResponseFontColor,
    userMessageFontColor,
    // fontColorDate,
    // bgColorMessage,
    // fontColorMessage,
    // bgColorPoweredByIcon,
    fontColorPoweredBy,
    // welcomeMessage,
  } = styleParams;

return (
  <div
    className={`${
      hasUserSentMessage
        ? "max-w-screen-md mx-auto pt-20"
        : "flex justify-center items-center h-screen"
    }`}
  >
    <div className="w-full">
      {/* Title */}
        <p
          className="font-extrabold text-2xl capitalize text-center mb-4"
          style={{ color: fontColor, fontSize: fontSize }}
        >
          Finance For Founders
        </p>
     

      {/* Chat container */}
     <div
  className={`rounded-xl mx-auto px-3 flex flex-col relative transition-all duration-300
    ${hasUserSentMessage ? "h-[350px] max-w-3xl" : "h-auto max-w-screen-md"}`}
  // style={{ backgroundColor: bgColor }}
>
        {hasUserSentMessage && (
          <ScrollArea className="h-[270px]">
            {messages.map((msg, index) => (
              <div key={index} className="space-y-3 p-2">
                {/* user bubble */}
                <div className="flex justify-end">
                  <div className="max-w-[60%]">
                    <p
                      className="rounded-xl px-3 py-[6px] mr-3 break-words"
                      style={{
                        backgroundColor: bubbleColor,
                        color: userMessageFontColor,
                      }}
                    >
                      {msg.user}
                    </p>
                  </div>
                </div>
                {/* bot bubble */}
                <div className="flex justify-start">
                  <div>
                    {msg.botRes && (
                      <p
                        className="rounded-xl pe-3 py-[6px] break-words"
                        style={{ color: chatbotResponseFontColor }}
                        dangerouslySetInnerHTML={{
                          __html: formatMessage(msg.botRes),
                        }}
                      ></p>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messageRef}></div>
          </ScrollArea>
        )}

        {/* Input with arrow inside */}
        <div className="w-[95%] mx-auto mt-3 relative">
          <textarea
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleMessage(e);
              }
            }}
            rows={1}
            disabled={loading}
            placeholder="Ask anything..."
            className="rounded-full p-3 w-full outline-none border resize-none overflow-hidden pr-10 shadow-lg"
            style={{
              backgroundColor: inputBgColor,
              color: inputTextColor,
              borderColor: inputBorderColor,
            }}
            required
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement;
              target.style.height = "auto";
              target.style.height = `${target.scrollHeight}px`;
            }}
          />
          <button
            onClick={handleMessage}
            disabled={loading}
            className="absolute right-3 top-6 -translate-y-1/2 rounded-full p-1 cursor-pointer"
            style={{
              backgroundColor: submitBgColor,
              color: submitTextColor,
            }}
          >
            {loading ? <Loading1 color={loaderColor} /> : <IoMdArrowUp size={24} />}
          </button>
        </div>
      </div>

      {/* Powered by */}
      <div className="flex items-center justify-center space-x-2 mt-2">
        <a href="https://c1m.ai/" target="_blank">
          <Image src={"/logo.png"} alt="logo" height={35} width={60} priority />
        </a>
        <p
          className="font-semibold text-lg"
          style={{ color: fontColorPoweredBy }}
        >
          Powered by C1M
        </p>
      </div>
    </div>
  </div>
);

}
