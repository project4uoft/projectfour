import gameRoomStyles from "../../../styles/GameRoom.module.css";
import chatRoomStyles from "../../../styles/Chatroom.module.css";
import { useUser } from "@auth0/nextjs-auth0";

import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";

const NEW_CHAT_MESSAGE_EVENT = "newChatMessage"; // Name of the event
const SOCKET_SERVER_URL = "http://localhost:3000";

const Chatroom = () => {
  const router = useRouter();
  const { user, error, isLoading } = useUser();
  // Gets roomId from URL
  const { roomId } = router.query;
  // const { messages, sendMessage } = useChat(roomId); // Creates a websocket and manages messaging
  const [messages, setMessages] = useState([]); // Sent and received messages
  const socketRef = useRef();

  const [newMessage, setNewMessage] = useState(""); // Message to be sent

  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = () => {
    const newMsg = {
      body: newMessage,
      senderId: socketRef.current.id,
      user: user.nickname,
    };
    socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, newMsg);
    setNewMessage("");
  };

  useEffect(() => {
    // Creates a WebSocket connection
    socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
      query: { roomId },
    });

    // Listens for incoming messages
    socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, (message) => {
      const incomingMessage = {
        ...message,
        ownedByCurrentUser: message.senderId === socketRef.current.id, // check if message was sent by current user
      };
      setMessages((messages) => [...messages, incomingMessage]);
    });

    // Destroys the socket reference
    // when the connection is closed
    return () => {
      socketRef.current.disconnect();
    };
  }, [roomId]);
  return (
    // <section className={gameRoomStyles.innerSidePanelContainer}></section>
    <section>
      <div className="h-48 p-2 mx-4 mb-2 overflow-x-hidden overflow-y-auto bg-white border rounded">
        <ul className="flex flex-col">
          {messages.map((message, i) => (
            <li
              key={i}
              className={`${
                message.ownedByCurrentUser
                  ? chatRoomStyles.myMessage
                  : chatRoomStyles.receivedMessage
              }`}
            >
              <p>
                <strong className="text-green-700">{message.user}</strong>
              </p>
              {message.body}
            </li>
          ))}
        </ul>
      </div>
      <div className="grid">
        <textarea
          value={newMessage}
          onChange={handleNewMessageChange}
          placeholder="Type your message here..."
          className="w-10/12 p-2 mx-auto mt-2 text-gray-800 bg-white border rounded justify-self-auto"
        />

        <button
          disabled={newMessage.length === 0}
          onClick={handleSendMessage}
          type="submit"
          className="inline-flex items-center px-4 py-2 mx-auto mt-4 font-bold text-gray-800 bg-gray-600 rounded disabled:bg-gray-900 justify-self-auto hover:bg-gray-400"
        >
          <span>Send</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
            <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
          </svg>
        </button>
      </div>
    </section>
  );
};

export default Chatroom;
