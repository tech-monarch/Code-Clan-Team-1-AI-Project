import React, { useState } from "react";

const ChatWithVoice = () => {
  const [message, setMessage] = useState(""); // For text input
  const [chatHistory, setChatHistory] = useState([]); // To store chat messages
  const [isListening, setIsListening] = useState(false); // To track voice input status

  // Speech Recognition for Voice Input
  const startSpeechRecognition = () => {
    const recognition = new window.SpeechRecognition();
    recognition.lang = "en-US"; // Set the language
    recognition.interimResults = false; // Only process final results

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript; // Get the spoken text
      setMessage(transcript); // Update the message state
      handleSendMessage(transcript); // Send the spoken message
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
    };

    recognition.start();
  };

  // Text-to-Speech for Voice Output
  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US"; // Set the language
    speechSynthesis.speak(utterance);
  };

  // Handle Sending Messages (Text or Voice)
  const handleSendMessage = async (inputMessage = message) => {
    if (inputMessage.trim() === "") return; // Don't send empty messages

    // Append user's message to the chat
    setChatHistory([...chatHistory, { sender: "user", text: inputMessage }]);

    try {
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer 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`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: "You are a helpful assistant." },
            { role: "user", content: inputMessage },
          ],
        }),
      });

      const data = await res.json();
      const botResponse = data.choices[0].message.content;

      // Append bot's response to the chat
      setChatHistory([...chatHistory, { sender: "user", text: inputMessage }, { sender: "bot", text: botResponse }]);

      speak(botResponse); // Speak the bot's response
      setMessage(""); // Clear the input field
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="chat-container">
      {/* Chat History */}
      <div className="chat-history">
        {chatHistory.map((chat, index) => (
          <div key={index} className={`message ${chat.sender}`}>
            <p>{chat.text}</p>
          </div>
        ))}
      </div>

      {/* Input Section */}
      <div className="input-area">
        {/* Voice Input Button */}
        <button onClick={startSpeechRecognition} disabled={isListening} className="bg-blue-500 text-white px-4 py-2 rounded">
          {isListening ? "🎙 Listening..." : "🎤 Talk"}
        </button>

        {/* Text Input */}
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message"
          className="border rounded px-4 py-2"
        />

        {/* Send Button */}
        <button onClick={() => handleSendMessage()} className="bg-green-500 text-white px-4 py-2 rounded">
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWithVoice;
