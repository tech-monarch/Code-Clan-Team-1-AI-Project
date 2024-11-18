import TypewriterComponent from "typewriter-effect";
// import Button from "../common/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const [swipe, setSwipe] = useState(false);
  const navigate = useNavigate();

  const handleStartChatting = () => {
    setSwipe(true);
    setTimeout(() => {
      navigate("/chat-box");
    }, 500);
  };
  return (
    <section
      className={`max-w-[800px] w-full mx-auto transition-all ${
        swipe ? "animate-swipe-up" : ""
      }`}
    >
      <div className="flex flex-col justify-between h-screen gap-20 py-10 text-white">
        <div>
          <h1 className="text-[48px] leading-[74.4px] font-bold text-center">
            <TypewriterComponent
              onInit={(typewriter) => {
                typewriter
                  .typeString("Hi, I'm Lumina.")
                  .pauseFor(750) // Delay after the first line finishes
                  .typeString("<br>") // Line break
                  .typeString("Your AI Companion!")
                  .start();
              }}
              options={{
                autoStart: true,
                loop: false, // Set to false to prevent looping/deletion
                cursor: "_",
                delay: 100,
              }}
            />
          </h1>
        </div>

        <div className="flex flex-col gap-10">
          <div className="flex flex-col justify-center items-center gap-5">
            <button
              onClick={handleStartChatting}
              className="bg-customPink font-inter px-28 py-3 text-center text-white text-[24px] font-bold leading-[29.05px] cursor-pointer rounded-full shadow-md"
            >
              Start Chatting
            </button>
          </div>

          <h4 className="text-center font-inter">
            By continuing, you agree to our{" "}
            <span>
              <a className="underline font-semibold" href="/">
                {" "}
                Privacy Policy
              </a>
            </span>{" "}
            &{" "}
            <span>
              <a className="underline font-semibold" href="/">
                {" "}
                Terms of Use
              </a>
            </span>
          </h4>
        </div>
      </div>
    </section>
  );
};

export default LandingPage;
