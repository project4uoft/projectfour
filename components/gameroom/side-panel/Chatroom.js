import gameRoomStyles from "../../../styles/GameRoom.module.css";
import chatRoomStyles from "../../../styles/Chatroom.module.css";
import { useUser } from "@auth0/nextjs-auth0";
import { withStyles, createStyles, makeStyles } from "@material-ui/core/styles";
import {
  Card,
  Container,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
  Button,
} from "@material-ui/core/";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";
import ChatIcon from "@material-ui/icons/Chat";
import { right } from "inquirer/lib/utils/readline";

const NEW_CHAT_MESSAGE_EVENT = "newChatMessage"; // Name of the event
const SOCKET_SERVER_URL = "http://localhost:3000";

const WhiteTextTypography = withStyles({
  root: {
    color: "#FFFFFF",
  },
})(Typography);

const useStyles = makeStyles((theme) =>
  createStyles({
    chatBox: {
      height: "300px",
      overflow: "hidden",
    },
    msgBox: {
      backgroundColor: "white",
      display: "flex",
    },
    sendBtn: {
      marginTop: "10px",
      float: "right",
    },
  })
);

const Chatroom = ({ gameTitle }) => {
  const classes = useStyles();
  const router = useRouter();
  const { user } = useUser();
  const scrollRef = useRef(null);
  // Gets roomId from URL
  const { roomId } = router.query;
  // const { messages, sendMessage } = useChat(roomId); // Creates a websocket and manages messaging
  const [messages, setMessages] = useState([]); // Sent and received messages
  const socketRef = useRef();

  const [newMessage, setNewMessage] = useState(""); // Message to be sent

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behaviour: "smooth" });
    }
  }, [messages]);

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
    <List>
      <WhiteTextTypography>
        <ListItem>Now Playing: {gameTitle}</ListItem>

        <ListItem button>
          <ListItemIcon>
            <ChatIcon />
          </ListItemIcon>
          <ListItemText primary="Room Chat" />
        </ListItem>
      </WhiteTextTypography>
      <Container>
        <Card className={classes.chatBox}>
          <List>
            {messages.map((message, i) => (
              <ListItem
                ref={scrollRef}
                key={i}
                className={`${
                  message.ownedByCurrentUser
                    ? chatRoomStyles.myMessage
                    : chatRoomStyles.receivedMessage
                }`}
              >
                <ListItemText>
                  <strong>{message.user}</strong>
                  <br />
                  {message.body}
                </ListItemText>
              </ListItem>
            ))}
          </List>
        </Card>
        <TextField
          className={classes.msgBox}
          value={newMessage}
          multiline
          variant="outlined"
          onChange={handleNewMessageChange}
          placeholder="Type your message"
        />
        <Button
          className={classes.sendBtn}
          variant="contained"
          disabled={newMessage.length === 0}
          onClick={handleSendMessage}
          type="submit"
        >
          Send
        </Button>
      </Container>
    </List>
  );
};

export default Chatroom;
