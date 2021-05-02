import Head from "next/head";
import TicTacToe from "../components/tictactoe/Tictactoe";

const login = () => {
  return (
    <div>
      <Head>
        <title>Tic-tac-toe</title>
      </Head>
      <h1>Tic-tac-toe</h1>
      <TicTacToe />
    </div>
  );
};

export default login;
