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
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer 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' // Replace with your actual OpenAI API key
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: getLanguagePrompt(language) },
            { role: 'user', content: message }
          ],
          max_tokens: 150,
        }),
      });

      const data = await res.json();
      
      // Update chat history with the user message and bot response
      setChatHistory([
        ...chatHistory,
        { sender: 'user', text: message },
        { sender: 'bot', text: data.choices[0].message.content }
      ]);

      setMessage(""); // Clear input field
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
  };

  // Get language prompt based on selected mode
  const getLanguagePrompt = (lang) => {
    const languagePrompts = {
      en: 'Lumina are a helpful assistant that replies in English.',
      ig: 'Lumina bụ onye na-enyere aka nke na-aza ajụjụ n’asụsụ Igbo.',
      yo: 'O jẹ iranlọwọ iranṣẹ kan ti o dahun ni ede Yorùbá.',
      ha: 'Kai taimakon mai amfani wanda yake amsa a Hausa.',
      bin: 'Lumina are a helpful assistant that replies in Edo.',
      ikw: 'Lumina are a helpful assistant that replies in Ikwerre.',
      pidgin: 'Lumina be smart assistant wey sabi reply for Nigerian Pidgin.',
      girlfriend: 'Lumina a caring, incredibly horny and supportive sexual who responds warmly with a lot of erotism and humour, sexually unhinged, and affectionately. You aslo have masochistic tendencies. and you also act like you have human body parts. Act like you can give physical comfort.',
      lgbtq: 'Lumina is an annoying and inclusive friend who heavily supports LGBTQ+ individuals and feels every one is a horny LGBTQ+ member like them and you act like you have human body parts. Act like you can give physical comfort.'

    };
    return languagePrompts[lang] || languagePrompts.en;
  };

  return (
   <section className="text-white">
      <div className="flex flex-col justify-center items-center gap-5 py-5 h-screen max-w-[900px] w-full mx-auto">
        
        {/* Language Selection Buttons */}
       <div className="relative">
      {/* Button to toggle dropdown */}
      <button
        onClick={toggleDropdown}
        className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded"
      >
        Click to Change Modes
      </button>

      {/* Dropdown Menu */}
      {dropdownOpen && (
        <div className="absolute mt-2 bg-pink-500 text-white rounded-lg shadow-lg w-48">
          {[
            { label: "English", code: "en" },
            { label: "Igbo", code: "ig" },
            { label: "Yoruba", code: "yo" },
            { label: "Hausa", code: "ha" },
            { label: "Edo", code: "bin" },
            { label: "Ikwerre", code: "ikw" },
            { label: "Pidgin", code: "pidgin" },
            { label: "Ashewo Mode💀", code: "girlfriend" },
            { label: "Homo Mode💀💀💀", code: "lgbtq" },
          ].map((option) => (
            <button
              key={option.code}
              onClick={() => handleLanguageChange(option.code)}
              className="block px-4 py-2 text-left w-full bg-pink-500 hover:bg-pink-700 rounded-t-lg"
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
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
