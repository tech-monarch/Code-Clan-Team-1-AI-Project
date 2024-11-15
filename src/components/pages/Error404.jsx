import { error404 } from "../../assets";

const Error404 = () => {
  return (
    <div className="max-w-[900px] h-screen mx-auto">
      <img
        src={error404}
        className="w-full flex justify-center items-center"
        alt=""
      />
    </div>
  );
};

export default Error404;
