// import Head from 'next/head';
import React, { useState, useEffect } from 'react';
// import styled from 'styled-components';
import styles from '../styles/Minesweeper.module.css';

const Minesweeper = () => {
  const [win, setWin] = useState(false);
  const [lost, setLost] = useState(false);
  // Amount of mines checked
  const [mineChecked, setMineChecekd] = useState(0);
  // Mine numbers
  const NUMBER_MINES = 10;
  const [MINES_NUMBER, setMinesNumber] = useState(NUMBER_MINES);
  // Board size
  const BOARD_NUMBER = 10;
  // state for the board
  const [board, setBoard] = useState();
  // Used for the state of the tiles
  const TILE_STATUSES = {
    HIDDEN: 'hidden',
    MINE: 'mine',
    NUMBER: 'number',
    MARKED: 'marked'
  }

  const [playAgain, setPlayAgain] = useState(true);

  // createBoard function will render the board
  const createBoard = (boardSize, numberOfMines) => {
    const board = [];
    setMinesNumber(NUMBER_MINES);
    const minePostion = getMinePosition(boardSize, numberOfMines)

    for(let x = 0; x < boardSize; x++) {
      const row = []
      for(let y = 0; y < boardSize; y++) {
        const tile = [
          {
            x,
            y,
            mine: minePostion.some(positionMatch.bind(null, {x, y})),
            status: 'hidden',
            text:''
          }
        ]

        row.push(tile);
      }
      board.push(row);
    }
    return board;
  }

  useEffect(() => {
    if(playAgain){
      setBoard(createBoard(BOARD_NUMBER, NUMBER_MINES));
      setPlayAgain(false);
    }
    // return createBoard(BOARD_NUMBER, NUMBER_MINES);
    //Use the next lines if line 97 is uncommented
    // if(board) {
    //   console.log('rerendered')
    // } else {
    //   return createBoard(BOARD_NUMBER, MINES_NUMBER);
    // }
    
    // console.log(board);
  }, [playAgain])
  //Use this if line 97 is uncommented
  // }, [empty]) 

  // This will be used to randomely generate mines on the board
  const getMinePosition = (boardSize, numberOfMines) => {
    const positions = [];

    while(positions.length < numberOfMines) {
      const position = {
        x: randomNumber(boardSize),
        y: randomNumber(boardSize)
      }
      if (!positions.some(p =>  positionMatch(p, position))){
        positions.push(position)
      }
    }

    return positions;
  }

  const positionMatch = (a, b) => {
    return a.x === b.x && a.y === b.y
  }

  const randomNumber = (size) => {
    return Math.floor(Math.random() * size)
  }

  //This will reveal all the mines
  const checkMines = () => {
    board.forEach(row => row.forEach(tile => {
      if(tile[0].mine === true) {
        tile[0].status = TILE_STATUSES.MINE
      }
    }));
    setBoard(board);
  }

  // Check for tile clicks
  const tileClick = (row, col) => {
    if(lost) {
      return;
    }
    const tile = board[row][col][0];
    console.log(tile)
    const mineCheck = tile.mine;
    const tempBoard = [...board];

    if (tile.status !== TILE_STATUSES.HIDDEN) {
      return
    }
    if(mineCheck) {
      setLost(!lost);
      checkMines()
      tile.status = TILE_STATUSES.MINE;
      // return e.target.dataset.status = TILE_STATUSES.MINE;
    } else {
      // e.target.dataset.status = TILE_STATUSES.NUMBER;
      tile.status = TILE_STATUSES.NUMBER;
    }
    const adjacentTiles = nearbyTiles(board, tile);
    console.log(adjacentTiles);
    const mines = adjacentTiles.filter(t => t[0].mine);
    if(mines.length === 0) {
    } else {
      console.log('num of mines', mines.length)
      tile.text =  mines.length;
    }
    tempBoard[row][col][0] = tile;
    setBoard(tempBoard)
  }


  // Check the nearby tiles after clicking to confirm if there are any mines
  const nearbyTiles = (board, tile) => {
    console.log(tile.y);
    console.log(board)
    const tiles = []
    for(let xOffset = -1; xOffset<= 1; xOffset++) {
      for(let yOffset = -1; yOffset<= 1; yOffset++) {
        const surroundingTile = board[tile.x + xOffset]?.[tile.y + yOffset]
        if(surroundingTile) {tiles.push(surroundingTile)}
      }
    }
    // Dont remember what the next lines were for sorry
    
    // for(let w=-1; w<=1; w++){
    //   const surroundingTile = board[tile.x - w][tile.y];
    //   if(surroundingTile) {tiles.push(surroundingTile)}
    // }
    // tiles.push(board[0][2])
    return tiles;
  }

  // Check for right clicks for marking
  const contextMenu = (row, col) => {
    // let tileInfo = JSON.parse(e.target.dataset.tile)[0];
    // console.log(tileInfo.mine)
    
    const tile = board[row][col][0];
    console.log(tile)
    //Stop if win
    if(win) {
      return;
    }
    //Stop if lose
    if(lost) {
      return;
    }
    //Prevent marking more than 10 mines
    if(MINES_NUMBER === 0 && tile.status === TILE_STATUSES.MARKED) {
      setMinesNumber(MINES_NUMBER + 1)
      tile.status = TILE_STATUSES.HIDDEN;
    } else if (MINES_NUMBER === 0) {
      return;
    }
    // Prevent marking revealed tiles
    if(tile.status !== TILE_STATUSES.HIDDEN && tile.status !== TILE_STATUSES.MARKED) {
      return
    }

    if(tile.status === TILE_STATUSES.MARKED) {
      tile.status = TILE_STATUSES.HIDDEN
      //if user unchecks mine reduce the minechecked if tile is a mine
      if(tile.mine) {
        setMineChecekd(mineChecked - 1)
      }
      if(MINES_NUMBER === 10) {
        return
      } else {
        setMinesNumber(MINES_NUMBER + 1)
      }
    } else {
      tile.status = TILE_STATUSES.MARKED
      // Increase the count and if count is 10 user wins!
      if(tile.mine) {
        setMineChecekd(mineChecked + 1);
        if(mineChecked === 10) {
          setWin(!win);
        }
      } 
      setMinesNumber(MINES_NUMBER - 1);
    }
    
    const tempBoard = [...board];
    tempBoard[row][col][0] = tile;
    setBoard(tempBoard)
  }

  return(
    <>
      {console.log('returning', board)}
      <h3>Minesweeper</h3>
      <h5>Mines left: {MINES_NUMBER}</h5>
      <div style={{display:  `${!lost ? 'none': ''}`}}>
       <p>You Lost</p>
        <button  onClick={()=> {
          setLost(false);
          setPlayAgain(true);
          // createBoard(BOARD_NUMBER, NUMBER_MINES)
        }}>Try again?</button>
      </div>
      <div style={{display:  `${!win ? 'none': ''}`}}>
        <p>You won!</p>
        <button  onClick={()=> {
          setWin(false);
          
          setPlayAgain(true);
          // createBoard(BOARD_NUMBER, NUMBER_MINES)
        }}>Try again?</button>
      </div>
      <div className={styles.board}>
        {board && board.map((row, rowIndex) => row.map((tile, index) => <div key={index} data-status={tile[0].status} onClick={() => tileClick(rowIndex,index)} onContextMenu={(e) => {e.preventDefault(); contextMenu(rowIndex,index)}} data-tile={JSON.stringify(tile)}>{tile[0].text}</div>))}
      </div>
    </>
  )
}

export default Minesweeper;