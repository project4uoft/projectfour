const Crazy8s = require('./crazyEightsLogic');

const { 
    
    checkWinner,
    endOfRound
} = require('./crazyEightsLogic')


describe("check if when there's two players, a winner is called when one score is 100"), () => {
    test("2 player winner", () => {
        const currentPlayerIndex = 0

        const currentPlayer = {
            position: 1,
            hand: [],
            score: 101,
            gamesWon: 0
        }

        const players = [{
            position: 1,
            hand: [],
            score: 101,
            gamesWon: 0
        },
        {
            position: 2,
            hand: [],
            score: 75,
            gamesWon: 0
        }]

        const afterWinCurrentPlayer = {
            position: 1,
            hand: [],
            score: 0,
            gamesWon: 1
        }

        const result = checkWinner(players[currentPlayerIndex])

        expect(result.toBe(console.log(`Game over Player 1 wins!`)))
        
    })
}