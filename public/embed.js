// // public/embed.js
// function createChatWidget(options) {
//     const iframe = document.createElement('iframe');
//     iframe.src = `${options.apiUrl}?welcomeMessage=${encodeURIComponent(options.welcomeMessage || '')}`;
//     iframe.style.position = 'fixed';
//     iframe.style.bottom = '24px';
//     iframe.style[options.position || 'right'] = '20px';
//     iframe.style.width = '550px';
//     iframe.style.height = '550px';
//     iframe.style.border = 'none';
//     iframe.style.borderRadius = '10px';
    
//     iframe.setAttribute('id', 'custom-chatbot');
//     document.body.appendChild(iframe);
//   }
  
//   // Attach to global scope
//   window.Chatbot = {
//     init: createChatWidget,
//   };

function createChatWidget(options) {
    const iframe = document.createElement("iframe");
  
    const params = new URLSearchParams({
      welcomeMessage: options.welcomeMessage || "",
      fontSize: options.fontSize || "14px",
      fontColor: options.fontColor || "#ffffff",
      bgColor: options.bgColor || "#1e1b4b", // Default indigo-900
      bubbleColor: options.bubbleColor || "#3730a3", // indigo-700
      botColor: options.botColor || "#6b21a8", // purple-800
    });
  
    iframe.src = `${options.apiUrl}?${params.toString()}`;
    iframe.style.position = "fixed";
    iframe.style.bottom = options.bottom || "24px";
    iframe.style[options.position || "right"] = options.sidePadding || "20px";
    iframe.style.width = options.width || "550px";
    iframe.style.height = options.height || "550px";
    iframe.style.border = "none";
    iframe.style.borderRadius = "10px";
    iframe.style.zIndex = "9999";
  
    iframe.setAttribute("id", "custom-chatbot");
    document.body.appendChild(iframe);
  }
  
  window.Chatbot = {
    init: createChatWidget,
  };
  