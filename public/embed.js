function createChatWidget(options) {
  const iframe = document.createElement("iframe");

  const styleParams = {
    welcomeMessage: options.welcomeMessage || "Welcome!",
    fontSize: options.fontSize || "16px",
    fontColor: options.fontColor || "#ffffff",
    bgColor: options.bgColor || "#1e1b4b",
    bgColor1: options.bgColor1 || "#1e1b4b",
    bubbleColor: options.bubbleColor || "#3730a3",
    botColor: options.botColor || "#6b21a8",
    inputBgColor: options.inputBgColor || "#4f46e5",
    inputTextColor: options.inputTextColor || "#ffffff",
    inputBorderColor: options.inputBorderColor || "#4f46e5",
    submitBgColor: options.submitBgColor || "#4338ca",
    submitTextColor: options.submitTextColor || "#ffffff",
    messageBorderColor: options.messageBorderColor || "#C084FC",
    embed: "true", // 👈 this marks iframe for conditional styling
  };

  const params = new URLSearchParams(styleParams);
  iframe.src = `${options.apiUrl}?${params.toString()}`;
  console.log(iframe.src);

  iframe.style.position = "fixed";
  iframe.style.bottom = options.bottom || "24px";
  iframe.style[options.position || "right"] = options.sidePadding || "20px";
  iframe.style.width = options.width || "550px";
  iframe.style.height = options.height || "550px";
  iframe.style.border = "none";
  iframe.style.borderRadius = "10px";
  iframe.style.zIndex = "9999";
  iframe.style.background = 'transparent'; // important
  iframe.style.backgroundColor = "transparent";
  iframe.style.overflow = "visible";
  iframe.setAttribute("allowtransparency", "true"); // legacy support for transparency
  iframe.setAttribute("id", "custom-chatbot");

  document.body.appendChild(iframe);
}

window.Chatbot = {
  init: createChatWidget,
};
