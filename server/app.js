import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
console.log("httpServer has made!!");

const io = new Server(httpServer, {
  cors: {
    //서버로서 사용하는 도메인과, 서버의 도메인이 다른지 check 해봐야한다.
    origin: "http://localhost:8000/",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("someone has logined");

  // 방에 참여
  socket.on("joinRoom", (roomId) => {
    socket.join(roomId);
    console.log(`User joined room: ${roomId}`);
  });

  // 방에서 퇴장
  socket.on("leaveRoom", (roomId) => {
    socket.leave(roomId);
    console.log(`User left room: ${roomId}`);
  });

  // 특정 방에 메시지 전송
  socket.on("sendMessage", ({ roomId, msg, user }) => {
    // 'io.to(roomId).emit'을 사용하여 특정 방에만 메시지를 보냄
    io.to(roomId).emit("newIncomingMessage", { user, msg, roomId });
  });

  // 연결 해제 시 로그 출력
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  // socket.on("welcome", (user) => {
  //   console.log("welcome 메시지가 실행되었습니다.");
  //   io.emit("newWelcome", user); //웰컴 메시지를 보내야 하는데,,,
  // });
  // socket.on("createdMessage", (message) => {
  //   //socket.emit("newIncomingMessage") 를 사용하면, 처음에 이 메시지를 보낸 클라이언트에게만 전송이 된다.
  //   io.emit("newIncomingMessage", message);
  // });
});

httpServer.listen(8000, () => {
  console.log("Server is running on port 8000");
});
