import React from "react";
import Room from "../components/Room";

const rooms = [
  { id: 1, title: "방장 사기맵 ㅋㅋ 1" },
  { id: 2, title: "방장 사기맵 ㅋㅋ 2" },
  { id: 3, title: "방장 사기맵 ㅋㅋ 3" },
  { id: 4, title: "방장 사기맵 ㅋㅋ 4" },
  { id: 5, title: "방장 사기맵 ㅋㅋ 5" },
];

const ChatList = () => {
  return (
    <div>
      {rooms.map((room) => {
        return <Room key={room.id} room={room} />;
      })}
    </div>
  );
};

export default ChatList;
