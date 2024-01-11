import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/chat");
  };
  return (
    <div>
      <button onClick={handleClick}>시작하기</button>
    </div>
  );
};

export default Home;
