import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Chat, LandingPage } from "./components";
import Error404 from "./components/pages/Error404";
// import { ThemeProvider } from "@/components/theme-provider";
import Auth from "./components/Auth";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import { ModeToggle } from "./components/mode-toggle";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route path="" element={<LandingPage />} />
      <Route path="auth" element={<Auth />} />
      <Route path="chat-box" element={<Chat />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />

      <Route path="*" element={<Error404 />} />
    </Route>
  )
);
const App = () => {
  return (
    <div className="flex flex-col gap-5 mx-auto py-7 md:py-10 max-w-[1024px] w-full">
      <div className="ml-auto">
        <ModeToggle />
      </div>

      <RouterProvider router={router} />
    </div>
  );
};

export default App;
