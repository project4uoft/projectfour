import gameRoomStyles from "../../../styles/GameRoom.module.css";

import GameOptions from "./GameOptions";
import Chatroom from "./Chatroom";

const SidePanel = ({ handleClick }) => {
  return (
    <section className="flex flex-col m-4 bg-indigo-900 border-blue-900 rounded-md h-5/6">
      <GameOptions handleClick={handleClick} />
      <Chatroom />
    </section>
  );
};

export default SidePanel;
