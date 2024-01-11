import { Link } from "react-router-dom";

type Props = {
  room: {
    id: number;
    title: string;
  };
};

const Room = ({ room }: Props) => {
  return (
    <div>
      <Link to={`/chat/${room.id}`}>{room.title}</Link>
    </div>
  );
};

export default Room;
