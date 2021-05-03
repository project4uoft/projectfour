import Head from "next/head";
import TicTacToe from "../components/tictactoe/Tictactoe";

const Game1 = () => {
  return (
    <div>
      <Head>
        <title>Tic-tac-toe</title>
      </Head>
      <h1 className="text-3xl text-center mb-4 font-bold text-indigo-700">
        Tic-tac-toe
      </h1>
      <TicTacToe />
    </div>
  );
};

export default Game1;
