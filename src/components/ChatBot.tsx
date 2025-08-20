"use client";

import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Loading1 from "@/components/Loading1";
import { ScrollArea } from "@/components/ui/scroll-area";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";

export default function ChatBot() {
  const [styleParams, setStyleParams] = useState({
     fontSize: "14px",
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
     loaderColor: "#111827",
     fontColorDate: "#111827",
     bgColorMessage: "#E5E7EB",
     fontColorMessage: "#111827",
     fontColorPoweredBy: "#111827",
     bgColorPoweredByIcon: "",
    messageBorderColor: "#6B7280",
    submitBgColor: "#ffffff",
    welcomeMessage: 'Hello , thank you for contacting FinanceForFounder!'
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
   fontSize: params.get("fontSize") || "24px",
      fontColor: params.get("fontColor") || "#111827",
      bgColor: params.get("bgColor") || "#F9FAFB",
      bubbleColor: params.get("bubbleColor") || "#E5E7EB",
      botColor: params.get("botColor") || "#E5E7EB",
      inputBgColor: params.get("inputBgColor") || "#FFFFFF",
      inputTextColor: params.get("inputTextColor") || "#111827",
      submitTextColor: params.get("submitTextColor") || "#ffffff",
      inputBorderColor: params.get("inputBorderColor") || "#D1D5DB",
      inputPlaceHolderColor: params.get("inputPlaceHolderColor") || "#9CA3AF",
      loaderColor: params.get("loaderColor") || "#111827",
      userMessageFontColor: params.get("userMessageFontColor") || "#111827",
      fontColorDate: params.get("fontColorDate") || "#111827",
      bgColorMessage: params.get("bgColorMessage") || "#E5E7EB",
      fontColorMessage: params.get("fontColorMessage") || "#111827",
      fontColorPoweredBy: params.get("fontColorPoweredBy") || "#111827",
      bgColorPoweredByIcon: params.get("bgColorPoweredByIcon") || "#202123",
      chatbotResponseFontColor:
      params.get("chatbotResponseFontColor") || "#111827",
      messageBorderColor: params.get("messageBorderColor") || "#6B7280",
      submitBgColor: params.get("submitBgColor") || "#111827",
      welcomeMessage: params.get("welcomeMessage") || "Hello , thank you for contacting FinanceForFounder!",
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
    bgColor,
    bubbleColor,
    botColor,
    inputBgColor,
    inputTextColor,
    submitBgColor,
    submitTextColor,
    messageBorderColor,
    inputBorderColor,
    inputPlaceHolderColor,
    loaderColor,
    chatbotResponseFontColor,
    userMessageFontColor,
    fontColorDate,
    bgColorMessage,
    fontColorMessage,
    bgColorPoweredByIcon,
    fontColorPoweredBy,
    welcomeMessage,
  } = styleParams;

  return (
    <div className="max-w-screen-sm mx-auto pt-20">
      <div
        className={`pt-1 rounded-xl pb-10 ${
          bgColor ? "" : "bg-gradient-to-br from-indigo-900 to-purple-950"
        }`}
        style={bgColor ? { backgroundColor: bgColor } : {}}
      >
        <div className="flex justify-between items-center pr-10">
          <p
            className="font-extrabold text-2xl capitalize mx-auto pb-2"
            style={{ color: fontColor, fontSize: fontSize }}
          >
            Finance For Founders
          </p>
        </div>
        <div
          className="mt-2 border border-purple-400 rounded-xl max-w-xl h-[330px] overflow-y-auto mx-auto p-3 flex flex-col relative"
          style={{ borderColor: messageBorderColor }}
        >
          <ScrollArea className="h-[250px]">
            <div className="px-2 pt-3 pb-5">
              {/* <p
                className="text-white text-sm text-center"
                style={{ color: fontColor }}
              >
                Sync your conversation and continue messaging us through your
                favorite app.
              </p> */}
              <p
                className="text-center text-white text-sm pb-8"
                style={{ color: fontColorDate }}
              >
                {date}
              </p>
              <div className="max-w-[50%]">
                <p
                  className="text-[12px] text-white"
                  style={{ color: fontColor }}
                >
                 FinanceForFounder Representative
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
              <div className="flex items-center justify-center space-x-2 mb-5 mt-3">
                {/* <div
                  className="h-[14px] w-6 rounded-t-full"
                  style={{ backgroundColor: bgColorPoweredByIcon }}
                ></div> */}
               
                <a href="https://c1m.ai/" target="_blank">
                  <Image
                    src={"/logo.png"}
                    alt="logo"
                    height={35}
                    width={60}
                    priority
                    className="h-[35px] w-[60px]"
                  />
                </a>
                 <p
                  className=" text-white font-semibold text-lg"
                  style={{ color: fontColorPoweredBy }}
                >
                  Powered by C1M
                </p>
              </div>
            )}
            {messages.map((msg, index) => (
              <div key={index} className="space-y-3 p-2">
                <div className="flex justify-end">
                  <div className="max-w-[60%]">
                    <p
                      className="rounded-xl px-3 py-[6px] text-sm mr-3"
                      style={{
                        backgroundColor: bubbleColor,
                        // fontSize,
                        color: userMessageFontColor,
                      }}
                    >
                      {msg.user}
                    </p>
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="max-w-[60%]">
                    {msg.botRes && (
                      <p
                        className="rounded-xl px-3 py-[6px] text-sm break-words overflow-hidden"
                        style={{
                          backgroundColor: botColor,
                          // fontSize,
                          color: chatbotResponseFontColor,
                        }}
                        dangerouslySetInnerHTML={{
                          __html: formatMessage(msg.botRes),
                        }}
                      ></p>
                    )}
                  </div>
                </div>
                <div ref={messageRef}></div>
              </div>
            ))}
            {/* Powered by after messages */}
            {messages.length > 0 && (
              <div className="flex items-center justify-center space-x-2 mb-5 mt-3">
                {/* <div
                  className="h-[14px] w-6 rounded-t-full"
                  style={{ backgroundColor: bgColorPoweredByIcon }}
                ></div> */}
               
                <a href="https://c1m.ai/" target="_blank">
                  <Image
                    src={"/logo.png"}
                    alt="logo"
                    height={35}
                    width={60}
                    priority
                    className="h-[35px] w-[60px]"
                  />
                </a>
                 <p
                  className=" text-white font-semibold text-lg"
                  style={{ color: fontColorPoweredBy }}
                >
                  Powered by C1M
                </p>
              </div>
            )}
          </ScrollArea>
          <div className="flex items-center space-x-2 ml-1 w-[95%] absolute bottom-2">
            <input
              type="text"
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleMessage(e);
                }
              }}
              disabled={loading}
              placeholder="Ask anything"
              className="rounded-lg px-3 py-2 w-full outline-none border placeholder:text-[var(--placeholder-color)]"
              style={
                {
                  "--placeholder-color": inputPlaceHolderColor, // dynamic
                  backgroundColor: inputBgColor,
                  color: inputTextColor,
                  borderColor: inputBorderColor,
                } as React.CSSProperties
              }
              required
            />
            {loading ? (
              <Loading1 color={loaderColor} />
            ) : (
              <button
                onClick={handleMessage}
                className="rounded-lg px-3 py-2 font-semibold w-24 text-white cursor-pointer"
                style={{
                  backgroundColor: submitBgColor,
                  color: submitTextColor,
                }}
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
