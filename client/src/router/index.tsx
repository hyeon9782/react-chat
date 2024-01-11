import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import ChatList from "../pages/ChatList";
import ChatRoom from "../pages/ChatRoom";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/chat" element={<ChatList />} />
    <Route path="/chat/:id" element={<ChatRoom />} />
  </Routes>
);

export default AppRoutes;
