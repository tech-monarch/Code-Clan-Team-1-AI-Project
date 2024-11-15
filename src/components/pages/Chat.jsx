import { FaFileUpload, FaUserCircle } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";

const Chat = () => {
  return (
    <section className="text-white">
      <div className="flex flex-col justify-center items-center gap-5 py-5 h-screen max-w-[900px] w-full mx-auto">
        <div className="flex-1 py-10 flex flex-col gap-5">
          <div className="flex flex-row gap-5">
            <FaUserCircle size={40} />
            <p className="p-5 bg-customBlack border border-white rounded-[10px] text-[18px] leading-[24px] max-w-[70%] w-full">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae,
              nulla! Blanditiis unde aut dolore praesentium dolor quo quisquam,
              quod illo excepturi deserunt vitae! Odit corporis rerum eligendi
              dolorum esse at!
            </p>
          </div>
          <div className="flex flex-row-reverse place-content-end gap-5">
            <FaUserCircle size={40} />
            <p className="p-5 bg-customPink rounded-[10px] text-[18px] leading-[24px] max-w-[70%] w-full">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae,
              nulla! Blanditiis unde aut dolore praesentium dolor quo quisquam,
              quod illo excepturi deserunt vitae! Odit corporis rerum eligendi
              dolorum esse at!
            </p>
          </div>
        </div>

        <div className="flex flex-row justify-between items-center bg-[#3d3d3d] py-3 px-5 max-w-[90%] w-full rounded-full">
          <FaFileUpload size={30} className="cursor-pointer" />
          <input
            className="bg-transparent placeholder:text-white text-[20px] focus:outline-none w-[85%]"
            type="text"
            placeholder="How can I be of Assistance?"
          />
          <IoIosSend size={30} className="cursor-pointer" />
        </div>
      </div>
    </section>
  );
};

export default Chat;
