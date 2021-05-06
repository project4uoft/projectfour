import gameRoomStyles from '../../../styles/GameRoom.module.css'
import chatRoomStyles from '../../../styles/Chatroom.module.css'


import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";

const NEW_CHAT_MESSAGE_EVENT = "newChatMessage"; // Name of the event
const SOCKET_SERVER_URL = "http://localhost:4000";


const Chatroom = () => {

    const router = useRouter()
    const { roomId } = router.query; // Gets roomId from URL
    // const { messages, sendMessage } = useChat(roomId); // Creates a websocket and manages messaging
    const [messages, setMessages] = useState([]); // Sent and received messages
    const socketRef = useRef();

    const [newMessage, setNewMessage] = useState(""); // Message to be sent

    const handleNewMessageChange = (event) => {
        setNewMessage(event.target.value);
    };

    const handleSendMessage = () => {
        socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, {
            body: newMessage,
            senderId: socketRef.current.id,
        });
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
                ownedByCurrentUser: message.senderId === socketRef.current.id,  // check if message was sent by current user
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
            <div className={chatRoomStyles.messagesContainer}>
                <ul className={chatRoomStyles.messagesList}>
                    {messages.map((message, i) => (
                        <li
                            key={i}
                            className={`${message.ownedByCurrentUser ? chatRoomStyles.myMessage : chatRoomStyles.receivedMessage
                                }`}
                        >
                            {message.body}
                        </li>
                    ))}
                </ul>
            </div>
            <textarea
                value={newMessage}
                onChange={handleNewMessageChange}
                placeholder="Type your message here..."
                className={chatRoomStyles.newMessagesTextArea}                
            />
            <button onClick={handleSendMessage} className={chatRoomStyles.sendMessageButton}>
                SEND
            </button>
        </section>
    )
}

export default Chatroom;