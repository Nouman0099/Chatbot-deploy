// "use client";
// import Loading1 from "@/components/Loading1";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import axios from "axios";
// import React, { useEffect, useRef, useState } from "react";

// export default function ChatBot() {
//   const [loading, setLoading] = useState(false);
//   const [userMessage, setUserMessage] = useState("");
//   const [messages, setMessages] = useState<
//     { user: string; botRes: string | null; time: string }[]
//   >([]);
//   const messageRef = useRef<HTMLDivElement | null>(null);
//   useEffect(() => {
//     messageRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   const handleMessage = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (userMessage.trim()) {
//       const currentTime = new Date().toLocaleTimeString([], {
//         hour: "2-digit",
//         minute: "2-digit",
//         hour12: true,
//       });
//       const newMessage = { user: userMessage, botRes: null, time: currentTime };
//       setMessages((prevMessages) => [...prevMessages, newMessage]);
//       setUserMessage("");
//       await sendMessage(newMessage);
//     }
//   };

//   const sendMessage = async (newMessage: {
//     user: string;
//     botRes: string | null;
//   }) => {
//     setLoading(true);
//     try {
//       const payload = { chatInput: newMessage.user };
//       // console.log(payload);
//       const res = await axios.post(
//         `https://agent1.c1m.ai/webhook/a9f23ed9-0a2f-4ea0-b64c-0b166e32b296`,
//         payload
//       );
//       // console.log(res.data);
//       const botResponse = res.data[0].output;
//       setMessages((prevMessages) =>
//         prevMessages.map((msg, index) =>
//           index === prevMessages.length - 1
//             ? { ...msg, botRes: botResponse }
//             : msg
//         )
//       );
//     } catch (error) {
//       console.error("Failed to send message:", error);
//       setMessages((prevMessages) =>
//         prevMessages.map((msg, index) =>
//           index === prevMessages.length - 1
//             ? { ...msg, botRes: "Sorry, something went wrong." }
//             : msg
//         )
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const formatMessage = (message: string) => {
//     return message
//       .replace(/(\*\*)(.*?)(\*\*)/g, "<strong>$2</strong>") // Remove ** and make text bold
//       .replace(/### (.*?)(?=\s|$)/g, "<h2><strong>$1</strong></h2>") // Convert ### to heading 2 and make it bold
//       .replace(/[\[(](https?:\/\/[^\s\])]+)[\])]/g, "$1") // Remove () or [] around URLs
//       .replace(
//         /(https?:\/\/[^\s]+)/g,
//         '<br/><a href="$1" target="_blank" class="text-blue-400 underline block">$1</a>' // Add a line break before the URL
//       );
//   };

//   return (
//     <div className="max-w-screen-sm mx-auto pt-20">
//       <div className="pt-1 rounded-xl pb-10 bg-gradient-to-br from-purple-950 to bg-indigo-900 border border-indigo-700">
//         <div className="flex justify-between items-center pr-10">
//           <p className="font-extrabold text-2xl capitalize mx-auto text-white pb-2">
//             Finance For Founders
//           </p>
//           {/* <span className="cursor-pointer">
//             <IoMdClose onClick={() => setOpen(false)} size={24} />
//           </span> */}
//         </div>
//         <div className="mt-2 border border-purple-400 rounded-xl max-w-xl h-[330px] overflow-y-auto mx-auto p-3 flex flex-col relative">
//           <ScrollArea className="h-[250px]">
//             {messages.map((msg, index) => (
//               <div key={index} className="space-y-3 p-2 ">
//                 <div className="flex justify-end">
//                   <div className="max-w-[60%]">
//                     <p className="text-white rounded-xl px-3 py-[6px] bg-indigo-700 text-sm mr-3">
//                       {msg.user}
//                     </p>
//                   </div>
//                 </div>
//                 <div className="flex justify-start">
//                   <div className="max-w-[60%]">
//                     {msg.botRes && (
//                       <p
//                         className="text-white rounded-xl px-3 py-[6px] bg-purple-800 text-sm break-words overflow-hidden"
//                         dangerouslySetInnerHTML={{
//                           __html: formatMessage(msg.botRes),
//                         }}
//                       ></p>
//                     )}
//                   </div>
//                 </div>
//                 <div ref={messageRef}></div>
//               </div>
//             ))}
//           </ScrollArea>
//           <div className="flex items-center space-x-2 ml-1 w-[95%] absolute bottom-2">
//             <input
//               type="text"
//               value={userMessage}
//               onChange={(e) => setUserMessage(e.target.value)}
//               onKeyDown={(e) => {
//                 if (e.key === "Enter") {
//                   handleMessage(e); // Trigger search on Enter
//                 }
//               }}
//               disabled={loading}
//               placeholder="Type a message..."
//               className="rounded-lg px-3 py-2 w-full outline-none bg-indigo-800/70 text-white placeholder:text-indigo-400 border border-indigo-600"
//               required
//             />
//             {loading ? (
//               <Loading1 />
//             ) : (
//               <button
//                 onClick={handleMessage}
//                 className="rounded-lg px-3 py-2 font-semibold w-24 bg-indigo-600 hover:bg-indigo-500 text-white cursor-pointer"
//               >
//                 Send
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// 'use client';

// import React, { useEffect, useRef, useState } from 'react';
// import { useSearchParams } from 'next/navigation';
// import axios from 'axios';
// import Loading1 from '@/components/Loading1';
// import { ScrollArea } from '@/components/ui/scroll-area';

// export default function ChatBot() {
//   const searchParams = useSearchParams();

//   // Extract style parameters from URL or set defaults
//   const fontSize = searchParams.get('fontSize') || '14px';
//   const fontColor = searchParams.get('fontColor') || '#ffffff';
//   const bgColor = searchParams.get('bgColor') || '#1e1b4b'; // indigo-900
//   const bubbleColor = searchParams.get('bubbleColor') || '#3730a3'; // indigo-700
//   const botColor = searchParams.get('botColor') || '#6b21a8'; // purple-800


//   console.log('fontSize:', fontSize);
// console.log('fontColor:', fontColor);

//   const [loading, setLoading] = useState(false);
//   const [userMessage, setUserMessage] = useState('');
//   const [messages, setMessages] = useState<
//     { user: string; botRes: string | null; time: string }[]
//   >([]);
//   const messageRef = useRef<HTMLDivElement | null>(null);

//   useEffect(() => {
//     messageRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages]);

//   const handleMessage = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (userMessage.trim()) {
//       const currentTime = new Date().toLocaleTimeString([], {
//         hour: '2-digit',
//         minute: '2-digit',
//         hour12: true,
//       });
//       const newMessage = { user: userMessage, botRes: null, time: currentTime };
//       setMessages((prevMessages) => [...prevMessages, newMessage]);
//       setUserMessage('');
//       await sendMessage(newMessage);
//     }
//   };

//   const sendMessage = async (newMessage: {
//     user: string;
//     botRes: string | null;
//   }) => {
//     setLoading(true);
//     try {
//       const payload = { chatInput: newMessage.user };
//       const res = await axios.post(
//         `https://agent1.c1m.ai/webhook/a9f23ed9-0a2f-4ea0-b64c-0b166e32b296`,
//         payload
//       );
//       const botResponse = res.data[0].output;
//       setMessages((prevMessages) =>
//         prevMessages.map((msg, index) =>
//           index === prevMessages.length - 1
//             ? { ...msg, botRes: botResponse }
//             : msg
//         )
//       );
//     } catch (error) {
//       console.error('Failed to send message:', error);
//       setMessages((prevMessages) =>
//         prevMessages.map((msg, index) =>
//           index === prevMessages.length - 1
//             ? { ...msg, botRes: 'Sorry, something went wrong.' }
//             : msg
//         )
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const formatMessage = (message: string) => {
//     return message
//       .replace(/(\*\*)(.*?)(\*\*)/g, '<strong>$2</strong>') // Bold
//       .replace(/### (.*?)(?=\s|$)/g, '<h2><strong>$1</strong></h2>') // Heading
//       .replace(/[\[(](https?:\/\/[^\s\])]+)[\])]/g, '$1') // Remove brackets around URLs
//       .replace(
//         /(https?:\/\/[^\s]+)/g,
//         '<br/><a href="$1" target="_blank" class="text-blue-400 underline block">$1</a>'
//       );
//   };

//   return (
//     <div className="max-w-screen-sm mx-auto pt-20">
//       <div
//         className="pt-1 rounded-xl pb-10 border border-indigo-700"
//         style={{ backgroundColor: bgColor }}
//       >
//         <div className="flex justify-between items-center pr-10">
//           <p
//             className="font-extrabold text-2xl capitalize mx-auto pb-2"
//             style={{ color: fontColor }}
//           >
//             Finance For Founders
//           </p>
//         </div>
//         <div className="mt-2 border border-purple-400 rounded-xl max-w-xl h-[330px] overflow-y-auto mx-auto p-3 flex flex-col relative">
//           <ScrollArea className="h-[250px]">
//             {messages.map((msg, index) => (
//               <div key={index} className="space-y-3 p-2">
//                 <div className="flex justify-end">
//                   <div className="max-w-[60%]">
//                     <p
//                       className="rounded-xl px-3 py-[6px] text-sm mr-3"
//                       style={{
//                         backgroundColor: bubbleColor,
//                         fontSize,
//                         color: fontColor,
//                       }}
//                     >
//                       {msg.user}
//                     </p>
//                   </div>
//                 </div>
//                 <div className="flex justify-start">
//                   <div className="max-w-[60%]">
//                     {msg.botRes && (
//                       <p
//                         className="rounded-xl px-3 py-[6px] text-sm break-words overflow-hidden"
//                         style={{
//                           backgroundColor: botColor,
//                           fontSize,
//                           color: fontColor,
//                         }}
//                         dangerouslySetInnerHTML={{
//                           __html: formatMessage(msg.botRes),
//                         }}
//                       ></p>
//                     )}
//                   </div>
//                 </div>
//                 <div ref={messageRef}></div>
//               </div>
//             ))}
//           </ScrollArea>
//           <div className="flex items-center space-x-2 ml-1 w-[95%] absolute bottom-2">
//             <input
//               type="text"
//               value={userMessage}
//               onChange={(e) => setUserMessage(e.target.value)}
//               onKeyDown={(e) => {
//                 if (e.key === 'Enter') {
//                   handleMessage(e);
//                 }
//               }}
//               disabled={loading}
//               placeholder="Type a message..."
//               className="rounded-lg px-3 py-2 w-full outline-none border border-indigo-600"
//               style={{
//                 backgroundColor: '#4f46e5', // indigo-600
//                 color: fontColor,
//                 fontSize,
//               }}
//               required
//             />
//             {loading ? (
//               <Loading1 />
//             ) : (
//               <button
//                 onClick={handleMessage}
//                 className="rounded-lg px-3 py-2 font-semibold w-24 text-white cursor-pointer"
//                 style={{ backgroundColor: '#4338ca' }} // indigo-700
//               >
//                 Send
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// 'use client';

// import React, { useEffect, useRef, useState } from 'react';
// import axios from 'axios';
// import Loading1 from '@/components/Loading1';
// import { ScrollArea } from '@/components/ui/scroll-area';

// export default function ChatBot() {
//   // Dynamic style states
//   const [fontSize, setFontSize] = useState('14px');
//   const [fontColor, setFontColor] = useState('#ffffff');
//   const [bgColor, setBgColor] = useState('#1e1b4b');
//   const [bubbleColor, setBubbleColor] = useState('#3730a3');
//   const [botColor, setBotColor] = useState('#6b21a8');

//   // Chat states
//   const [loading, setLoading] = useState(false);
//   const [userMessage, setUserMessage] = useState('');
//   const [messages, setMessages] = useState<
//     { user: string; botRes: string | null; time: string }[]
//   >([]);
//   const messageRef = useRef<HTMLDivElement | null>(null);

//   useEffect(() => {
//     const params = new URLSearchParams(window.location.search);
//     setFontSize(params.get('fontSize') || '14px');
//     setFontColor(params.get('fontColor') || '#ffffff');
//     setBgColor(params.get('bgColor') || '#1e1b4b');
//     setBubbleColor(params.get('bubbleColor') || '#3730a3');
//     setBotColor(params.get('botColor') || '#6b21a8');

//     console.log('fontSize:', params.get('fontSize'));
//     console.log('fontColor:', params.get('fontColor'));
//   }, []);

//   useEffect(() => {
//     messageRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages]);

//   const handleMessage = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (userMessage.trim()) {
//       const currentTime = new Date().toLocaleTimeString([], {
//         hour: '2-digit',
//         minute: '2-digit',
//         hour12: true,
//       });
//       const newMessage = { user: userMessage, botRes: null, time: currentTime };
//       setMessages((prevMessages) => [...prevMessages, newMessage]);
//       setUserMessage('');
//       await sendMessage(newMessage);
//     }
//   };

//   const sendMessage = async (newMessage: { user: string; botRes: string | null }) => {
//     setLoading(true);
//     try {
//       const payload = { chatInput: newMessage.user };
//       const res = await axios.post(
//         `https://agent1.c1m.ai/webhook/a9f23ed9-0a2f-4ea0-b64c-0b166e32b296`,
//         payload
//       );
//       const botResponse = res.data[0].output;
//       setMessages((prevMessages) =>
//         prevMessages.map((msg, index) =>
//           index === prevMessages.length - 1 ? { ...msg, botRes: botResponse } : msg
//         )
//       );
//     } catch (error) {
//       console.error('Failed to send message:', error);
//       setMessages((prevMessages) =>
//         prevMessages.map((msg, index) =>
//           index === prevMessages.length - 1
//             ? { ...msg, botRes: 'Sorry, something went wrong.' }
//             : msg
//         )
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const formatMessage = (message: string) => {
//     return message
//       .replace(/(\*\*)(.*?)(\*\*)/g, '<strong>$2</strong>') // Bold
//       .replace(/### (.*?)(?=\s|$)/g, '<h2><strong>$1</strong></h2>') // Heading
//       .replace(/[\[(](https?:\/\/[^\s\])]+)[\])]/g, '$1') // Remove brackets around URLs
//       .replace(
//         /(https?:\/\/[^\s]+)/g,
//         '<br/><a href="$1" target="_blank" class="text-blue-400 underline block">$1</a>'
//       );
//   };

//   return (
//     <div className="max-w-screen-sm mx-auto pt-20">
//       <div
//         className="pt-1 rounded-xl pb-10 border border-indigo-700"
//         style={{ backgroundColor: bgColor }}
//       >
//         <div className="flex justify-between items-center pr-10">
//           <p
//             className="font-extrabold text-2xl capitalize mx-auto pb-2"
//             style={{ color: fontColor }}
//           >
//             Finance For Founders
//           </p>
//         </div>
//         <div className="mt-2 border border-purple-400 rounded-xl max-w-xl h-[330px] overflow-y-auto mx-auto p-3 flex flex-col relative">
//           <ScrollArea className="h-[250px]">
//             {messages.map((msg, index) => (
//               <div key={index} className="space-y-3 p-2">
//                 <div className="flex justify-end">
//                   <div className="max-w-[60%]">
//                     <p
//                       className="rounded-xl px-3 py-[6px] text-sm mr-3"
//                       style={{
//                         backgroundColor: bubbleColor,
//                         fontSize,
//                         color: fontColor,
//                       }}
//                     >
//                       {msg.user}
//                     </p>
//                   </div>
//                 </div>
//                 <div className="flex justify-start">
//                   <div className="max-w-[60%]">
//                     {msg.botRes && (
//                       <p
//                         className="rounded-xl px-3 py-[6px] text-sm break-words overflow-hidden"
//                         style={{
//                           backgroundColor: botColor,
//                           fontSize,
//                           color: fontColor,
//                         }}
//                         dangerouslySetInnerHTML={{
//                           __html: formatMessage(msg.botRes),
//                         }}
//                       ></p>
//                     )}
//                   </div>
//                 </div>
//                 <div ref={messageRef}></div>
//               </div>
//             ))}
//           </ScrollArea>
//           <div className="flex items-center space-x-2 ml-1 w-[95%] absolute bottom-2">
//             <input
//               type="text"
//               value={userMessage}
//               onChange={(e) => setUserMessage(e.target.value)}
//               onKeyDown={(e) => {
//                 if (e.key === 'Enter') {
//                   handleMessage(e);
//                 }
//               }}
//               disabled={loading}
//               placeholder="Type a message..."
//               className="rounded-lg px-3 py-2 w-full outline-none border border-indigo-600"
//               style={{
//                 backgroundColor: '#4f46e5', // indigo-600
//                 color: fontColor,
//                 fontSize,
//               }}
//               required
//             />
//             {loading ? (
//               <Loading1 />
//             ) : (
//               <button
//                 onClick={handleMessage}
//                 className="rounded-lg px-3 py-2 font-semibold w-24 text-white cursor-pointer"
//                 style={{ backgroundColor: '#4338ca' }} // indigo-700
//               >
//                 Send
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


'use client';

import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Loading1 from '@/components/Loading1';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function ChatBot() {
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
      const payload = { chatInput: newMessage.user };
      const res = await axios.post(
        `https://agent1.c1m.ai/webhook/a9f23ed9-0a2f-4ea0-b64c-0b166e32b296`,
        payload
      );
      const botResponse = res.data[0].output;
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

  const formatMessage = (message: string) => {
    return message
      .replace(/(\*\*)(.*?)(\*\*)/g, '<strong>$2</strong>')
      .replace(/### (.*?)(?=\s|$)/g, '<h2><strong>$1</strong></h2>')
      .replace(/[\[(](https?:\/\/[^\s\])]+)[\])]/g, '$1')
      .replace(
        /(https?:\/\/[^\s]+)/g,
        '<br/><a href="$1" target="_blank" class="text-blue-400 underline block">$1</a>'
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
            Finance For Founders
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

