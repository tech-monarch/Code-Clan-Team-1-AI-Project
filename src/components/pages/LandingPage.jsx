import { Link } from "react-router-dom";
// import { ModeToggle } from "../mode-toggle";
import { Button } from "../ui/button";

const LandingPage = () => {
  return (
    <div>
      
      <Button>
        <Link to="/auth">Get Started</Link>
      </Button>
    </div>
  );
};

export default LandingPage;

