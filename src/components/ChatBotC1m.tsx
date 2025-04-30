'use client';

import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Loading1 from '@/components/Loading1';
import { ScrollArea } from '@/components/ui/scroll-area';
import { v4 as uuidv4 } from 'uuid';

export default function ChatBotC1m() {
  const [styleParams, setStyleParams] = useState({
    fontSize: '14px',
    fontColor: '#ffffff',
    bgColor: '',
    bubbleColor: '#3730a3',
    botColor: '#6b21a8',
  });

  const [loading, setLoading] = useState(false);
  const [userMessage, setUserMessage] = useState('');
  const [messages, setMessages] = useState<
    { user: string; botRes: string | null; time: string }[]
  >([]);
  const [randomId, setRandomId] = useState('')

  const messageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setStyleParams({
      fontSize: params.get('fontSize') || '24px',
      fontColor: params.get('fontColor') || '#ffffff',
      bgColor: params.get('bgColor') || '',
      bubbleColor: params.get('bubbleColor') || '#4338ca',
      botColor: params.get('botColor') || '#6b21a8',
    });
  }, []);

  useEffect(() => {
    messageRef.current?.scrollIntoView({ behavior: 'smooth' });
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
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });
      const newMessage = { user: userMessage, botRes: null, time: currentTime };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setUserMessage('');
      await sendMessage(newMessage);
    }
  };

  const sendMessage = async (newMessage: { user: string; botRes: string | null }) => {
    setLoading(true);
    try {
      console.log(randomId)
      const payload = { input: {question: newMessage.user, sessionid: randomId} };
      const res = await axios.post(
        `https://n8n.c1m.ai/webhook/02e84451-d545-48a3-96c9-3e56c5c8c9b0`,
        payload
      );
      // console.log(res)
      const botResponse = res.data.output;
      setMessages((prevMessages) =>
        prevMessages.map((msg, index) =>
          index === prevMessages.length - 1 ? { ...msg, botRes: botResponse } : msg
        )
      );
    } catch (error) {
      console.error('Failed to send message:', error);
      setMessages((prevMessages) =>
        prevMessages.map((msg, index) =>
          index === prevMessages.length - 1
            ? { ...msg, botRes: 'Sorry, something went wrong.' }
            : msg
        )
      );
    } finally {
      setLoading(false);
    }
  };

  // const formatMessage = (message: string) => {
  //   return message
  //     .replace(/(\*\*)(.*?)(\*\*)/g, '<strong>$2</strong>')
  //     .replace(/### (.*?)(?=\s|$)/g, '<h2><strong>$1</strong></h2>')
  //     .replace(/[\[(](https?:\/\/[^\s\])]+)[\])]/g, '$1')
  //     .replace(
  //       /(https?:\/\/[^\s]+)/g,
  //       '<br/><a href="$1" target="_blank" class="text-blue-400 underline block">$1</a>'
  //     );
  // };
  // const formatMessage = (message: string) => {
  //   return message
  //     // Convert double line breaks to paragraphs
  //     .replace(/\n{2,}/g, '</p><p>')
  //     // Wrap entire message in <p> to start properly
  //     .replace(/^/, '<p>')
  //     .replace(/$/, '</p>')
  //     // Replace bullet-style bold headings with proper formatting
  //     .replace(/\*\*(.*?)\*\*:/g, '<strong>$1</strong>:')
  //     // Replace remaining bold syntax
  //     .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
  //     // Handle ### as bullets too
  //     .replace(/### (.*?)(?=\s|$)/g, '<p>• <strong>$1</strong></p>')
  //     // Convert markdown-style links
  //     .replace(/[\[(](https?:\/\/[^\s\])]+)[\])]/g, '$1')
  //     // Convert plain links to anchor tags
  //     .replace(
  //       /(https?:\/\/[^\s]+)/g,
  //       '<br/><a href="$1" target="_blank" class="text-blue-400 underline block">$1</a>'
  //     );
  // };
  

  const formatMessage = (message: string) => {
    return message
      .replace(/</g, "&lt;") // prevent XSS
      .replace(/>/g, "&gt;")
      
      // Paragraphs: double line breaks become new <p> blocks
      .replace(/\n{2,}/g, '</p><p>')
      
      // Line breaks: single \n becomes <br/>
      .replace(/\n/g, '<br/>')
      
      // Start and end with <p> to wrap the message
      .replace(/^/, '<p>').replace(/$/, '</p>')
  
      // Make bullet point titles bold if surrounded by **
      .replace(/\*\*(.*?)\*\*:/g, '<strong>$1</strong>:')
      
      // Handle any other **text**
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
  
      // Convert URLs to anchor links
      .replace(
        /(https?:\/\/[^\s]+)/g,
        '<a href="$1" target="_blank" class="text-blue-400 underline block">$1</a>'
      );
  };
  
  
  
  

  const { fontSize, fontColor, bgColor, bubbleColor, botColor } = styleParams;

  return (
    <div className="max-w-screen-sm mx-auto pt-20">
      <div
        className={`pt-1 rounded-xl pb-10 border border-indigo-700 ${
          bgColor ? '' : 'bg-gradient-to-br from-indigo-900 to-purple-950'
        }`}
        style={bgColor ? { backgroundColor: bgColor } : {}}
      >
        <div className="flex justify-between items-center pr-10">
          <p
            className="font-extrabold text-2xl capitalize mx-auto pb-2"
            style={{ color: fontColor, fontSize:fontSize }}
          >
            C1M Presales
          </p>
        </div>
        <div className="mt-2 border border-purple-400 rounded-xl max-w-xl h-[330px] overflow-y-auto mx-auto p-3 flex flex-col relative">
          <ScrollArea className="h-[250px]">
            {messages.map((msg, index) => (
              <div key={index} className="space-y-3 p-2">
                <div className="flex justify-end">
                  <div className="max-w-[60%]">
                    <p
                      className="rounded-xl px-3 py-[6px] text-sm mr-3"
                      style={{
                        backgroundColor: bubbleColor,
                        // fontSize,
                        color: fontColor,
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
                          color: fontColor,
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
          </ScrollArea>
          <div className="flex items-center space-x-2 ml-1 w-[95%] absolute bottom-2">
            <input
              type="text"
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleMessage(e);
                }
              }}
              disabled={loading}
              placeholder="Type a message..."
              className="rounded-lg px-3 py-2 w-full outline-none border border-indigo-600"
              style={{
                backgroundColor: '#4f46e5',
                color: fontColor,
                // fontSize,
              }}
              required
            />
            {loading ? (
              <Loading1 />
            ) : (
              <button
                onClick={handleMessage}
                className="rounded-lg px-3 py-2 font-semibold w-24 text-white cursor-pointer"
                style={{ backgroundColor: '#4338ca' }}
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



