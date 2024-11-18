import { useState } from "react";
import { FaFileUpload, FaUserCircle } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";

const Chat = () => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [language, setLanguage] = useState("en"); // Default language is English

  const handleSendMessage = async () => {
    if (message.trim() === "") return;

    try {
      const res = await fetch('chatbot.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: message,
          language: language // Send selected language/mode to backend
        }),
      });
      const data = await res.json();

      // Update chat history with the user message and bot response
      setChatHistory([...chatHistory, { sender: 'user', text: message }, { sender: 'bot', text: data.response }]);
      setMessage(""); // Clear input field
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
  };

  return (
    <section className="text-white">
      <div className="flex flex-col justify-center items-center gap-5 py-5 h-screen max-w-[900px] w-full mx-auto">
        
        {/* Language Selection Buttons */}
        <div className="flex gap-2 pb-5">
          {[
            { label: "English", code: "en" },
            { label: "Igbo", code: "ig" },
            { label: "Yoruba", code: "yo" },
            { label: "Hausa", code: "ha" },
            { label: "Edo", code: "bin" },
            { label: "Ikwerre", code: "ikw" },
            { label: "Pidgin", code: "pidgin" },
            { label: "Girlfriend Mode", code: "girlfriend" },
            { label: "LGBTQ+ Mode", code: "lgbtq" }
          ].map((option) => (
            <button
              key={option.code}
              onClick={() => handleLanguageChange(option.code)}
              className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded"
            >
              {option.label}
            </button>
          ))}
        </div>

        <div className="flex-1 py-10 flex flex-col gap-5 overflow-y-auto">
          {chatHistory.map((chat, index) => (
            <div key={index} className={`flex ${chat.sender === 'user' ? 'flex-row-reverse' : 'flex-row'} gap-5`}>
              <FaUserCircle size={40} />
              <p className={`p-5 ${chat.sender === 'user' ? 'bg-customPink' : 'bg-customBlack'} border border-white rounded-[10px] text-[18px] leading-[24px] max-w-[70%] w-full`}>
                {chat.text}
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-row justify-between items-center bg-[#3d3d3d] py-3 px-5 max-w-[90%] w-full rounded-full">
          <FaFileUpload size={30} className="cursor-pointer" />
          <input
            className="bg-transparent placeholder:text-white text-[20px] focus:outline-none w-[85%]"
            type="text"
            placeholder="How can I be of Assistance?"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <IoIosSend size={30} className="cursor-pointer" onClick={handleSendMessage} />
        </div>
      </div>
    </section>
  );
};

export default Chat;
