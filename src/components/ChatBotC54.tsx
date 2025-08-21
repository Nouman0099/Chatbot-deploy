"use client";

import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Loading1 from "@/components/Loading1";
import { ScrollArea } from "@/components/ui/scroll-area";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";
import { IoMdArrowUp } from "react-icons/io";

export default function ChatBotC54() {
  const [styleParams, setStyleParams] = useState({
    fontSize: "28px",
    fontColor: "#111827",
    // bgColor: "#FAFAFA",
    bubbleColor: "#F7F7F8",
    // botColor: "#E5E7EB",
    inputBgColor: "#FFFFFF",
    inputTextColor: "#111827",
    inputPlaceHolderColor: "#9CA3AF",
    userMessageFontColor: "",
    chatbotResponseFontColor: "",
    submitTextColor: "#111827",
    inputBorderColor: "#D1D5DB",
    loaderColor: "#FFFFFF",
    // fontColorDate: "#111827",
    // bgColorMessage: "#E5E7EB",
    // fontColorMessage: "#111827",
    fontColorPoweredBy: "#111827",
    //  bgColorPoweredByIcon: "",
    // messageBorderColor: "#6B7280",
    submitBgColor: "#ffffff",
    welcomeMessage: "COLLECTIVE 54",
  });

  const [loading, setLoading] = useState(false);
  const [userMessage, setUserMessage] = useState("");
  const [messages, setMessages] = useState<
    { user: string; botRes: string | null; time: string }[]
  >([]);
  const [randomId, setRandomId] = useState("");
  const [hasUserSentMessage, setHasUserSentMessage] = useState(false);
  const botMessageRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setStyleParams({
      fontSize: params.get("fontSize") || "28px",
      fontColor: params.get("fontColor") || "#111827",
      // bgColor: params.get("bgColor") || "#FAFAFA",
      bubbleColor: params.get("bubbleColor") || "#F7F7F8",
      // botColor: params.get("botColor") || "#E5E7EB",
      inputBgColor: params.get("inputBgColor") || "#FFFFFF",
      inputTextColor: params.get("inputTextColor") || "#111827",
      submitTextColor: params.get("submitTextColor") || "#ffffff",
      inputBorderColor: params.get("inputBorderColor") || "#D1D5DB",
      inputPlaceHolderColor: params.get("inputPlaceHolderColor") || "#9CA3AF",
      loaderColor: params.get("loaderColor") || "#FFFFFF",
      userMessageFontColor: params.get("userMessageFontColor") || "#111827",
      // fontColorDate: params.get("fontColorDate") || "#111827",
      // bgColorMessage: params.get("bgColorMessage") || "#E5E7EB",
      // fontColorMessage: params.get("fontColorMessage") || "#111827",
      fontColorPoweredBy: params.get("fontColorPoweredBy") || "#111827",
      // bgColorPoweredByIcon: params.get("bgColorPoweredByIcon") || "#202123",
      chatbotResponseFontColor:
        params.get("chatbotResponseFontColor") || "#111827",
      // messageBorderColor: params.get("messageBorderColor") || "#6B7280",
      submitBgColor: params.get("submitBgColor") || "#111827",
      welcomeMessage:
        params.get("welcomeMessage") ||
        "COLLECTIVE 54",
    });
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      const lastIndex = messages.length - 1;
      if (messages[lastIndex].botRes) {
        // scroll only when bot response arrives
        botMessageRefs.current[lastIndex]?.scrollIntoView({
          behavior: "smooth",
          block: "start", // scroll to the top of the bot bubble
        });
      }
    }
  }, [messages]);

  // useEffect(() => {
  //   const randomId = Math.random().toString(36).substring(2, 15);
  //   setRandomId(randomId)
  // }, [])

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
      // const history = messages.flatMap((mes) => [
      //   { role: "userMessage", content: mes.user },
      //   ...(mes.botRes ? [{ role: "apiMessage", content: mes.botRes }] : []),
      // ]);
      // console.log(history)
      const payload = {
        question: newMessage.user,
        sessionid: randomId,
      };
      console.log(payload);
      const res = await axios.post(
        `https://agent1.c1m.ai/webhook/ea7a9565-4c00-4ae3-9a33-1a40b56069cd`,
        payload
      );
      console.log(res.data);
      const botResponse = res.data[0].output;
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
    return (
      message
        .replace(/</g, "&lt;") // prevent XSS
        .replace(/>/g, "&gt;")

        // Paragraphs: double line breaks become new <p> blocks
        .replace(/\n{2,}/g, "</p><p>")

        // Line breaks: single \n becomes <br/>
        .replace(/\n/g, "<br/>")

        // Start and end with <p> to wrap the message
        .replace(/^/, "<p>")
        .replace(/$/, "</p>")

        // Make bullet point titles bold if surrounded by **
        .replace(/\*\*(.*?)\*\*:/g, "<strong>$1</strong>:")

        // Handle any other **text**
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")

        // Convert URLs to anchor links
        .replace(
          /(https?:\/\/[^\s]+)/g,
          '<a href="$1" target="_blank" class="text-blue-400 underline block">$1</a>'
        )
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
    inputPlaceHolderColor,
    loaderColor,
    chatbotResponseFontColor,
    userMessageFontColor,
    // fontColorDate,
    // bgColorMessage,
    // fontColorMessage,
    // bgColorPoweredByIcon,
    fontColorPoweredBy,
    welcomeMessage,
  } = styleParams;

  return (
    <div
      className={`${
        hasUserSentMessage
          ? "max-w-screen-md mx-auto pt-6"
          : "flex justify-center items-center h-screen"
      }`}
    >
      <div className="w-full">
        {/* Title */}
        <p
          className="font-extrabold text-2xl capitalize text-center mb-4"
          style={{ color: fontColor, fontSize: fontSize }}
        >
          {welcomeMessage}
        </p>

        {/* Chat container */}
        <div
          className={`rounded-xl mx-auto flex flex-col relative transition-all duration-300
    ${
      hasUserSentMessage
        ? "max-w-3xl px-2 h-[calc(100vh-150px)]"
        : "h-auto max-w-screen-md"
    }
  `}
        >
          {hasUserSentMessage && (
            <ScrollArea className="h-[calc(100vh-220px)]">
              {messages.map((msg, index) => (
                <div key={index} className="space-y-3 p-2">
                  {/* user bubble */}
                  <div className="flex justify-end">
                    <div className="max-w-[60%]">
                      <p
                        className="rounded-xl px-3 text-[15px] py-[6px] mr-3 break-words"
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
                    <div
                      ref={(el) => {
                        botMessageRefs.current[index] = el;
                      }} // ✅ no return
                    >
                      {msg.botRes && (
                        <p
                          className="rounded-xl pe-3 text-[15px] py-[6px] break-words"
                          style={{ color: chatbotResponseFontColor }}
                          dangerouslySetInnerHTML={{
                            __html: formatMessage(msg.botRes),
                          }}
                        />
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {/* <div ref={messageRef}></div> */}
            </ScrollArea>
          )}
          {/* Input with arrow inside */}
          <div className="w-full mx-auto mt-3 relative">
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
              className="rounded-full py-3 px-5 w-full outline-none border resize-none overflow-hidden shadow-lg placeholder:text-[var(--placeholder-color)]"
              style={
                {
                  "--placeholder-color": inputPlaceHolderColor,
                  backgroundColor: inputBgColor,
                  color: inputTextColor,
                  borderColor: inputBorderColor,
                } as React.CSSProperties
              }
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
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 cursor-pointer"
              style={{
                backgroundColor: submitBgColor,
                color: submitTextColor,
              }}
            >
              {loading ? (
                <Loading1 color={loaderColor} />
              ) : (
                <IoMdArrowUp size={24} />
              )}
            </button>
          </div>
        </div>

        {/* Powered by */}
        <div className="flex items-center justify-center space-x-2 mt-2 pb-5">
          <a href="https://c1m.ai/" target="_blank">
            <Image
              src={"/logo.png"}
              alt="logo"
              height={35}
              width={60}
              priority
            />
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
