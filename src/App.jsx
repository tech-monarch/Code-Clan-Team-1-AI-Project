import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { LandingPage, Chat } from "./components";
import Error404 from "./components/pages/Error404";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route path="" element={<LandingPage />} />
      <Route path="chat-box" element={<Chat />} />

      <Route path='*' element={<Error404 />} />
    </Route>
  )
);
const App = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
