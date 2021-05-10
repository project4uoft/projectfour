import chatRoomStyles from '../../../styles/Chatroom.module.css'


import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";

const NEW_CHAT_MESSAGE_EVENT = "newChatMessage"; // Name of the event
const SOCKET_SERVER_URL = "http://localhost:3000";


const Chatroom = () => {


    const router = useRouter()
    const { roomId } = router.query; // Gets roomId from URL
    // const { messages, sendMessage } = useChat(roomId); // Creates a websocket and manages messaging
    const [messages, setMessages] = useState([]); // Sent and received messages
    const socketRef = useRef();

    // Create a referance to point to Chat Container
    const chatContainerRef = useRef();

    const [newMessage, setNewMessage] = useState(""); // Message to be sent

    const handleNewMessageChange = (event) => {
        setNewMessage(event.target.value);
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, {
            body: newMessage,
            senderId: socketRef.current.id,
        });
        setNewMessage("");
    };

    const scrollToMyRef = () => {
        const scroll =
          chatContainerRef.current.scrollHeight -
          chatContainerRef.current.clientHeight ;

        chatContainerRef.current.scrollTo(0, chatContainerRef.current.scrollHeight);
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
            
            // Scroll to lastest message.
            scrollToMyRef();
        });

        // Destroys the socket reference
        // when the connection is closed
        return () => {
            socketRef.current.disconnect();
        };
    }, [roomId]);
    return (
        <section className={chatRoomStyles.chatSection}>
            <div ref={chatContainerRef} className={chatRoomStyles.messagesContainer}>
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

            <form action="" onSubmit={(e) => handleSendMessage(e)}>
                <input
                    type="text"
                    value={newMessage}
                    onChange={handleNewMessageChange}
                    placeholder="Type your message here..."
                    className={chatRoomStyles.newMessagesTextArea}
                
                />
                <button onSubmit={(e) => handleSendMessage(e)} className={chatRoomStyles.sendMessageButton}>
                    SEND
                </button>
            </form>
        </section>
    )
}

export default Chatroom;