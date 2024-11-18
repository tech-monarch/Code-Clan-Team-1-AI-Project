import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { error404 } from "../../assets";

const Error404 = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the landing page immediately
    navigate('/');
  }, [navigate]);

  return (
    <div className="max-w-[900px] h-screen mx-auto">
      <img
        src={error404}
        className="w-full flex justify-center items-center"
        alt="Error 404"
      />
    </div>
  );
};

export default Error404;
