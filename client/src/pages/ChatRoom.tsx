import io from "socket.io-client";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Chat from "../components/Chat";

let socket: any;

type Messages = {
  roomId: string;
  msg: string;
  user: string;
};

// 랜덤 유저
const user = "User_" + String(new Date().getTime()).substr(-3);

const ChatRoom = () => {
  const { id } = useParams();

  console.log(id);
  //   const [roomId, setRoomId] = useState<string | null>(null);

  const roomId = useRef(null);
  const [connected, setConnected] = useState<boolean>(false);

  const [chat, setChat] = useState<Messages[]>([]);
  const [msg, setMsg] = useState("");

  const socketInitializer = () => {
    socket = io("http://localhost:8000/", { transports: ["websocket"] });

    socket.on("connect", () => {
      console.log(user, "has connected", socket);
      socket.emit("joinRoom", id);
      roomId.current = id;

      setConnected(true);
    }); // 연결될 시에, 나오게 되는 welcome이라는 이름의 함수를 작동시키게 해준다.

    socket.on("error", (error: Error) => {
      console.log("error : ", error);
    }); // 에러가 나올 시에, 콘솔에 출력해준다.

    socket.on("newWelcome", (user: string) => {
      console.log(user, "(님)이 들어오셨습니다! ");
    }); //누군가 들어왔을 때, 서버에서 newWelcome이라는 이름의 함수를 실행시켜주는데, 서버에서 보내는 user라는 값을 받아서, 콘솔에 로그를 남긴다.

    socket.on("newIncomingMessage", (message: Messages) => {
      console.log("메세지 옴");
      console.log(message);
      console.log(message.roomId);
      console.log(roomId);

      console.log(message.roomId === roomId.current);

      if (message.roomId === roomId.current) {
        setChat((currentMsg) => [
          ...currentMsg,
          { user: message.user, msg: message.msg, roomId: roomId.current },
        ]);
      }
      console.log(user, chat, Date());
    });
  };

  const scrollRef = useRef<HTMLDivElement | null>(null); //채팅 쳤을 때 매번 맨 아래로 가도록 scroll을 위한 코드

  useEffect(() => {
    socketInitializer();
    // 브라우저가 꺼지면 소켓 연결 종료
    return () => {
      if (socket) {
        socket.disconnect();
        console.log("socket is gone");
      }
    };
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" }); // 메시지를 계속 보내다보면, 스크롤이 올라가는데 자동으로 맨 아래로 내려오게끔 도와준다.
  }, [chat]);

  const sendMessage = async () => {
    console.log("send");
    console.log(roomId);
    console.log(msg);

    const message: Messages = {
      roomId: roomId.current,
      user,
      msg,
    };
    if (msg.trim() !== "") {
      // 공백을 메시지로 보내는 것을 방지하기 위해서 제출 전에 trim을 한 번 해줘야 한다.
      socket.emit("sendMessage", message);
      setMsg("");
    }
  };
  return (
    <div>
      <div className="relative block w-full h-screen">
        <div className="block border rounded-4 w-480px h-90v m-0 auto mt-32px bg-gray-200 overflow-y-scroll">
          {chat.map((chat, i) => (
            <div key={i}>
              <Chat user={chat.user} message={chat.msg} />
            </div>
          ))}
          <div ref={scrollRef} />
        </div>

        <div className="flex w-480px h-10v m-0 auto mt-12px space-x-2">
          <input
            type="text"
            className="w-3/4 text-lg h-full text-black border"
            value={msg}
            placeholder={connected ? "메시지를 입력하세요" : "연결중입니다..."}
            disabled={!connected}
            onChange={(e) => {
              setMsg(e.target.value);
            }}
            onKeyPress={(e) => {
              //엔터를 이용해서도 제출을 할 수 있게 해주려면 이런 방식을 택해야한다.
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
            onSubmit={sendMessage}
          />
          <button
            className={`w-1/4 h-full ${
              connected ? "bg-blue-500" : "bg-gray-300"
            } text-white`}
            onClick={sendMessage}
            disabled={!connected}
          >
            보내기
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
