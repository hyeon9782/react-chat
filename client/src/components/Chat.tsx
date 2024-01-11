type Props = {
  message: string;
  user: string;
};

const Chat = ({ message, user }: Props) => {
  return (
    <div>
      <div>{user}</div>
      <div>{message}</div>
    </div>
  );
};

export default Chat;
