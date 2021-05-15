const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();
const PORT = process.env.PORT || 3000;
const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";

const Player = require("./GameUtilities/Player");
const BullShitBoard = require("./GameUtilities/BullShitBoard");
// testing multiplayer
const NEW_PLAYER_JOINED = "newPlayerJoin";
const NEW_GAME_EVENT = "newGame";
const CREATE_GAME_EVENT = "createGame";
const UPDATE_GAME_EVENT = "updateGame";
const PLAY_EVENT_BULLSHIT = "playMoveBullShit";
const CALL_BULLSHIT = "callBullShit";
const PASS_BULLSHIT = "passBullShit";
const END_EVENT = "endBullShit";
const END_TURN_BULLSHIT = "endTurnBullShit"

const rooms = [];

io.on("connection", (socket) => {
  // Join a conversation
  const { roomId } = socket.handshake.query;
  socket.join(roomId);

  // Listen for new messages
  socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
    io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, data);
  });

  // Listen for new players
  socket.on(NEW_PLAYER_JOINED, ({ roomId, playerName }) => {
    if (rooms.filter((room) => room.roomId === roomId).length === 0) {
      let room = {
        roomId: roomId,
        players: [new Player(playerName)],
      };
      rooms.push(room);
    } else {
      let room = rooms.filter((room) => room.roomId === roomId)[0];
      let index = rooms.indexOf(room);
      if (
        rooms[index].players.filter(
          (player) => player.playerName === playerName
        ).length === 0
      ) {
        rooms[index].players.push(new Player(playerName));
      }
    }
    socket.join(roomId);
  });

  // new game only testing bullshit
  socket.on(NEW_GAME_EVENT, ({ roomId, game }) => {
    let room = rooms.filter((room) => room.roomId === roomId)[0];
    if (game === "bullshit") {
      room["game"] = new BullShitBoard();
      room["game"].newGame(room.players);

      io.sockets.in(roomId).emit(CREATE_GAME_EVENT, {
        game: game,
        board: room.game,
      });
    }
  });

  // player plays bullshit hand
  socket.on(PLAY_EVENT_BULLSHIT, ({ roomId, playerName, cardIndices }) => {
    let room = rooms.filter((room) => room.roomId === roomId)[0];
    let index = rooms.indexOf(room);

    let player = rooms[index].game.players.filter(
      (player) => player.playerName === playerName
    )[0];
    rooms[index].game.playMove(player, cardIndices);
    io.sockets.in(roomId).emit(UPDATE_GAME_EVENT, {
      board: rooms[index].game,
    });
  });

  // other player calls bullshit
  socket.on(CALL_BULLSHIT, ({ roomId, playerName }) => {
    let room = rooms.filter((room) => room.roomId === roomId)[0];
    let index = rooms.indexOf(room);

    let player = rooms[index].game.players.filter(
      (player) => player.playerName === playerName
    )[0];

    rooms[index].game.checkBluff(player);
    io.sockets.in(roomId).emit(UPDATE_GAME_EVENT, {
      board: rooms[index].game,
    });
   
  });

  socket.on(PASS_BULLSHIT, ({ roomId }) => {
    let room = rooms.filter((room) => room.roomId === roomId)[0];
    let index = rooms.indexOf(room);
    rooms[index].game.passBluff();
    io.sockets.in(roomId).emit(UPDATE_GAME_EVENT, {
      board: rooms[index].game,
    });
  });

  
  socket.on(END_TURN_BULLSHIT, ({ roomId }) => {
    let room = rooms.filter((room) => room.roomId === roomId)[0];
    let index = rooms.indexOf(room);
    let winners = rooms[index].game.endTurn();
    if (winners) {
      io.sockets.in(roomId).emit(END_EVENT, {
        winners: winners,
      });
    } else {
      io.sockets.in(roomId).emit(UPDATE_GAME_EVENT, {
        board: rooms[index].game,
      });
    }
  });

  // Leave the room if the user closes the socket
  socket.on("disconnect", () => {
    socket.leave(roomId);
  });
});

nextApp.prepare().then(() => {
  app.get("*", (req, res) => {
    return nextHandler(req, res);
  });
  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
});
