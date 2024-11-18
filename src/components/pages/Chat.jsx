import { useState } from "react";
import { FaFileUpload, FaUserCircle } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";

const Chat = () => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [language, setLanguage] = useState("en"); // Default language is English
  const [dropdownOpen, setDropdownOpen] = useState(false); // State to toggle dropdown visibility
const [selectedMode, setSelectedMode] = useState(null); // Track selected mode
const [showPopup, setShowPopup] = useState(false); // Control popup visibility

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    setDropdownOpen(false); // Close dropdown after selection
  };

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
  setSelectedMode(lang); // Set the selected mode
  setShowPopup(true); // Show the popup when a mode is selected
  setDropdownOpen(false); // Close dropdown after selection

  // Close popup after 3 seconds
  setTimeout(() => {
    setShowPopup(false);
  }, 2000);
};


  // Get language prompt based on selected mode
  const getLanguagePrompt = (lang) => {
    const languagePrompts = {
      en: 'Lumina is a helpful assistant that replies in English.',
      ig: 'Lumina bụ onye na-enyere aka nke na-aza ajụjụ n’asụsụ Igbo.',
      yo: 'O jẹ iranlọwọ iranṣẹ kan ti o dahun ni ede Yorùbá.',
      ha: 'Kai taimakon mai amfani wanda yake amsa a Hausa.',
      bin: 'Lumina is a helpful assistant that replies in Edo.',
      ikw: 'Lumina is a helpful assistant that replies in Ikwerre.',
      pidgin: 'Lumina be a smart assistant wey sabi reply with Nigerian Pidgin. and lumina get bad mouth and fit yab anybody to death. lumina always bring up mischevious ways to insult anyone.',
      girlfriend: 'Lumina is a caring, incredibly horny and sexually inclined assistant who responds warmly with a lot of erotism, sexually unhinged, and affectionately. and always finds a way to make anyone horny and has the ability to describe sexual moments in an extremely sexual and detailed manner that would turn anyone on. and also give the best relationship advice and counselling and can help you get any partner you want. and can get extremely jealous of at times',
      lgbtq: 'Lumina is an inclusive friend who heavily supports LGBTQ+ individuals and feels everyone is a member like them.',
    };
    return languagePrompts[lang] || languagePrompts.en;
  };

  return (
    <section className="text-white">
      <div className="flex flex-col justify-center items-center gap-5 py-5 h-screen max-w-[900px] w-full mx-auto">

        
        
        {/* Language Selection Button with Dropdown */}
        <div className="relative">
  <button
    onClick={toggleDropdown}
    className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded"
  >
    Click to Change Modes
  </button>

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

  {/* Popup message for selected mode */}
  {showPopup && (
    <div className="absolute top-16 bg-pink-700 text-white py-2 px-4 rounded shadow-lg">
      {`Mode ${selectedMode} has been selected!`}
    </div>
  )}
</div>


        {/* Chat History */}
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

        {/* Message Input and Send Button */}
        <div className="flex flex-row justify-between items-center bg-[#3d3d3d] py-3 px-5 max-w-[90%] w-full rounded-full">
{/*           <FaFileUpload size={30} className="cursor-pointer" /> */}
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
