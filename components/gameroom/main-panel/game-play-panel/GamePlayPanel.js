// import gameRoomStyles from '../../../../styles/GameRoom.module.css'
// import the games
import TicTacToe from "../../../tictactoe/tictactoe.js"
import NoGameSelected from "../../../noGameSelected/noGameSelected.js"

const GamePlayPanel = ({currentGame}) => {
    console.log("current game on board", currentGame)
    console.log(currentGame)

    //Controlling which game is displayed
    const renderSwitch = (currentGame) => {
        switch(currentGame){
            case 'tictactoe':
                console.log('tictactoe');
                return <TicTacToe />
                break;
            case 'mafia':
                console.log('mafia');
                return <Mafia />
                break;
            case 'bullshit':
                console.log('bullshit');
                return <Bullshit />
                break;
            case 'bigtwo':
                console.log('bigtwo');
                return  <BigTwo />
                break;
            default:
                return <NoGameSelected />
        }
    }

    return(
        <section className="flex flex-row rounded-md border-2 border-black justify-center h-3/4 m-4 p-2">
            <div>
                {renderSwitch(currentGame)}
            </div>

        </section>
    )
}

export default GamePlayPanel;