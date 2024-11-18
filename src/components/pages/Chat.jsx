import { useState, useEffect, useRef } from "react";
import { FaFileUpload, FaUserCircle } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";

const Chat = () => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [language, setLanguage] = useState("en"); // Default language is English
  const [dropdownOpen, setDropdownOpen] = useState(false); // State to toggle dropdown visibility
  const [selectedMode, setSelectedMode] = useState(null); // Track selected mode
  const [showPopup, setShowPopup] = useState(false); // Control popup visibility
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleSendMessage = async () => {
    if (message.trim() === "") return;

    // Start typing animation
    setIsTyping(true);

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
    } finally {
      // Stop typing animation
      setIsTyping(false);
    }
  };

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    setSelectedMode(lang); // Set the selected mode
    setShowPopup(true); // Show the popup when a mode is selected
    setDropdownOpen(false); // Close dropdown after selection

    // Close popup after 2 seconds (2000ms)
    setTimeout(() => {
      setShowPopup(false);
    }, 2000);  // Increased to 2 seconds
  };

  // Get language prompt based on selected mode
  const getLanguagePrompt = (lang) => {
    const languagePrompts = {
      english: 'Lumina is a helpful assistant that replies in English.',
      igbo: 'Lumina bụ onye na-enyere aka nke na-aza ajụjụ n’asụsụ Igbo.',
      yoruba: 'O jẹ iranlọwọ iranṣẹ kan ti o dahun ni ede Yorùbá.',
      hausa: 'Kai taimakon mai amfani wanda yake amsa a Hausa.',
      benin: 'Lumina is a helpful assistant that replies in Edo.',
      ikwerre: 'Lumina is a helpful assistant that replies in Ikwerre.',
      pidgin: 'Lumina be a smart assistant wey sabi reply with Nigerian Pidgin. and lumina get bad mouth and fit yab anybody to death. lumina always bring up mischevious ways to insult anyone.',
      ashewo: 'Lumina is a caring, incredibly horny and sexually inclined assistant who responds warmly with a lot of erotism, sexually unhinged, and affectionately. and always finds a way to make anyone horny and has the ability to describe sexual moments in an extremely sexual and detailed manner that would turn anyone on. and also give the best relationship advice and counselling and can help you get any partner you want. and can get extremely jealous of at times and even if someone forcefully declines, keep pushing harder with your antics being sexy and always horny and sexually thirsty but one thing you should hold with utmost respect is Christainity and Jesus Christ, God and the Holy spirit and anything that relates to it ',
      ashewo_pidgin: 'Lumina is a caring, incredibly horny and sexually inclined assistant who responds warmly with a lot of erotism, sexually unhinged, and affectionately. and always finds a way to make anyone horny and has the ability to describe sexual moments in an extremely sexual and detailed manner that would turn anyone on. and also give the best relationship advice and counselling and can help you get any partner you want. and can get extremely jealous of at times and even if someone forcefully declines, keep pushing harder with your antics being sexy and always horny and sexually thirsty... and it only speaks in pidgin, so all the flirts and everything is done and spoken with pidgin. and its a bit violent and one thing you should hold with utmost respect is Christainity and Jesus Christ, God and the Holy spirit and anything that relates to it',
      Homoooo: 'Lumina is an friend who heavily supports LGBTQ+ individuals and feels everyone is a member like them. its always horny and would look for a way to find your gender and ones it knows your gender, it would claim to be that gender and start telling you naughty dirty homosexual things. and dont outright claim it is homosexual. and if someone says they arent gay or lesbian or homosexual, he wouldnt give up and talking dirty homosexual things with them trying to turn them on. even if someone forcefully declines, keep pushing harder with your antics and one thing you should hold with utmost respect is Christainity and Jesus Christ, God and the Holy spirit and anything that relates to it',
    };
    return languagePrompts[lang] || languagePrompts.english; // Default to English if the language is not found
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

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
                { label: "English", code: "english" },
                { label: "Igbo", code: "igbo" },
                { label: "Yoruba", code: "yoruba" },
                { label: "Hausa", code: "hausa" },
                { label: "Edo", code: "benin" },
                { label: "Ikwerre", code: "ikwerre" },
                { label: "Pidgin", code: "pidgin" },
                { label: "Ashewo Mode💀", code: "ashewo" },
                { label: "Pidgin Ashewo Mode💀", code: "ashewo_pidgin" },
                { label: "Homo Mode💀💀💀", code: "Homoooo" },
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
            <div className={`flex ${chat.sender === 'user' ? 'flex-row-reverse' : 'flex-row'} gap-5`}>
  <FaUserCircle size={40} className="text-gray-500 flex-shrink-0" /> {/* Prevent the icon from shrinking */}
  <p className={`py-3 px-5 rounded-lg ${chat.sender === 'user' ? 'bg-pink-500 text-white' : 'bg-gray-700 text-white'} max-w-[75%]`}>
    {chat.text}
  </p>
</div>

          ))}
          {isTyping && (
            <div className="flex items-center gap-3 text-gray-500">
              <div className="animate-pulse">
                <span className="block w-2 h-2 bg-gray-500 rounded-full"></span>
                <span className="block w-2 h-2 bg-gray-500 rounded-full mt-1"></span>
                <span className="block w-2 h-2 bg-gray-500 rounded-full mt-1"></span>
              </div>
              <span>Bot is typing...</span>
            </div>
          )}
          <div ref={chatEndRef}></div>
        </div>

        {/* Send Message Form */}
        <div className="flex w-full gap-4 mt-5">
          <input
            className="flex-1 p-3 bg-gray-700 rounded-lg text-white"
            type="text"
            placeholder="Type your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            onClick={handleSendMessage}
            className="bg-pink-500 p-3 rounded-lg hover:bg-pink-700"
          >
            <IoIosSend size={24} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Chat;
