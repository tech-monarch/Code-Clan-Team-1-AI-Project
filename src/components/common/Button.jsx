// import { Link } from "react-router-dom";

const Button = (prop) => {
  return (
    <div className="flex flex-col mx-auto gap-5 w-full max-w-[450px] ">
      <a
        href={prop.href}
        className={`rounded-full shadow-md ${prop.className}`}
      >
        {prop.children}
      </a>
    </div>
  );
};

export default Button;
