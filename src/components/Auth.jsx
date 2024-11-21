import { useState } from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div>
      {isLogin ? (
        <Login onSwitch={() => setIsLogin(false)} />
      ) : (
        <Signup onSwitch={() => setIsLogin(true)} />
      )}
    </div>
  );
};

export default Auth;
