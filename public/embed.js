// public/embed.js
function createChatWidget(options) {
    const iframe = document.createElement('iframe');
    iframe.src = `${options.apiUrl}?welcomeMessage=${encodeURIComponent(options.welcomeMessage || '')}`;
    iframe.style.position = 'fixed';
    iframe.style.bottom = '20px';
    iframe.style[options.position || 'right'] = '20px';
    iframe.style.width = '350px';
    iframe.style.height = '500px';
    iframe.style.border = 'none';
    iframe.style.borderRadius = '10px';
    iframe.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    iframe.setAttribute('id', 'custom-chatbot');
  
    document.body.appendChild(iframe);
  }
  
  const Chatbot = {
    init: createChatWidget,
  };
  
  export default Chatbot;
  