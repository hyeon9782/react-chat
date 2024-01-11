import React, { useState } from "react";
import Room from "../components/Room";

const rooms = [
  { id: 1, title: "방장 사기맵 ㅋㅋ 1" },
  { id: 2, title: "방장 사기맵 ㅋㅋ 2" },
  { id: 3, title: "방장 사기맵 ㅋㅋ 3" },
  { id: 4, title: "방장 사기맵 ㅋㅋ 4" },
  { id: 5, title: "방장 사기맵 ㅋㅋ 5" },
];

const ChatList = () => {
  const [roomList, setRoomList] = useState(rooms);

  const handleClick = (title: string) => {
    setRoomList((prevRoomList) => [
      ...prevRoomList,
      { id: prevRoomList.at(-1).id++, title },
    ]);
  };
  return (
    <div>
      <div style={{ display: "flex" }}>
        <div>리스트</div>
        <div onClick={() => handleClick("안녕!!")}>➕</div>
      </div>
      <div>
        {roomList.map((room) => {
          return <Room key={room.id} room={room} />;
        })}
      </div>
    </div>
  );
};

export default ChatList;
