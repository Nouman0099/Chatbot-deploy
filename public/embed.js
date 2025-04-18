// public/embed.js
function createChatWidget(options) {
    const iframe = document.createElement('iframe');
    iframe.src = `${options.apiUrl}?welcomeMessage=${encodeURIComponent(options.welcomeMessage || '')}`;
    iframe.style.position = 'fixed';
    iframe.style.bottom = '24px';
    iframe.style[options.position || 'right'] = '20px';
    iframe.style.width = '550px';
    iframe.style.height = '550px';
    iframe.style.border = 'none';
    iframe.style.borderRadius = '10px';
    iframe.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    iframe.setAttribute('id', 'custom-chatbot');
    document.body.appendChild(iframe);
  }
  
  // Attach to global scope
  window.Chatbot = {
    init: createChatWidget,
  };  

// function createChatWidget(options) {
//     const params = new URLSearchParams({
//       welcomeMessage: options.welcomeMessage || '',
//       bgColor: options.bgColor || '',
//       fontFamily: options.fontFamily || '',
//       fontSize: options.fontSize || '',
//       textColor: options.textColor || '',
//     });
  
//     const iframe = document.createElement('iframe');
//     iframe.src = `${options.apiUrl}?${params.toString()}`;
//     iframe.style.position = 'fixed';
//     iframe.style.bottom = '20px';
//     iframe.style[options.position || 'right'] = '20px';
//     iframe.style.width = '600px';
//     iframe.style.height = '500px';
//     iframe.style.border = 'none';
//     iframe.style.borderRadius = '10px';
//     iframe.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
//     iframe.setAttribute('id', 'custom-chatbot');
//     document.body.appendChild(iframe);
//   }
  
//   window.Chatbot = {
//     init: createChatWidget,
//   };
  