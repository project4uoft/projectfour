import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import styles from '../styles/Minesweeper.module.css';

const Minesweeper = () => {
  const [win, setWin] = useState(false);
  const [lost, setLost] = useState(false);
  // Amount of mines checked
  const [mineChecked, setMineChecekd] = useState(0);
  // Mine numbers
  const [MINES_NUMBER, setMinesNumber] = useState(10);
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

  // createBoard function will render the board
  const createBoard = (boardSize, numberOfMines) => {
    const board = [];

    const minePostion = getMinePosition(boardSize, numberOfMines)

    for(let x = 0; x < boardSize; x++) {
      const row = []
      for(let y = 0; y < boardSize; y++) {
        const tile = [
          {
            x,
            y,
            mine: minePostion.some(positionMatch.bind(null, {x, y})),
            status: 'hidden'
          }
        ]

        row.push(tile);
      }
      board.push(row);
    }
    return setBoard(board);
  }

  useEffect(() => {
    return createBoard(BOARD_NUMBER, MINES_NUMBER);
    //Use the next lines if line 97 is uncommented
    // if(board) {
    //   console.log('rerendered')
    // } else {
    //   return createBoard(BOARD_NUMBER, MINES_NUMBER);
    // }
    
    // console.log(board);
  }, [])
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
  const tileClick = (e) => {
    if(lost) {
      return;
    }
    const tile = JSON.parse(e.target.dataset.tile)[0];
    const mineCheck = JSON.parse(e.target.dataset.tile)[0].mine;
    if (e.target.dataset.status !== TILE_STATUSES.HIDDEN) {
      return
    }
    if(mineCheck) {
      setLost(!lost);
      checkMines()
      return e.target.dataset.status = TILE_STATUSES.MINE;
    } else {
      e.target.dataset.status = TILE_STATUSES.NUMBER;
    }
    const adjacentTiles = nearbyTiles(board, tile);
    console.log(adjacentTiles);
    const mines = adjacentTiles.filter(t => t[0].mine);
    if(mines.length === 0) {
      /* The next lines of commented out code was used to reveal all the adjacent tiles that did not have any number, i.e. empty tiles. It was commented out due that it casued some bugs */

      // board.forEach(row => row.forEach(tile => {
      //   for(let i=0; i<adjacentTiles.length; i++) {
      //     if(tile[0].x === adjacentTiles[i][0].x && tile[0].y === adjacentTiles[i][0].y) {
      //       // console.log(tile[0].x, ' ', adjacentTiles[i][0].x )
      //       tile[0].status = TILE_STATUSES.NUMBER
      //       console.log(tile[0]);
      //       setBoard(board);
      //     }
      //   }
      // }))
      // setEmpty(!empty);
      return;
    } else {
      e.target.textContent = mines.length;
    }
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
  const contextMenu = (e) => {
    e.preventDefault();
    let tileInfo = JSON.parse(e.target.dataset.tile)[0];
    console.log(tileInfo.mine)
    //Stop if win
    if(win) {
      return;
    }
    //Stop if lose
    if(lost) {
      return;
    }
    //Prevent marking more than 10 mines
    if(MINES_NUMBER === 0 && e.target.dataset.status === TILE_STATUSES.MARKED) {
      setMinesNumber(MINES_NUMBER + 1)
      return e.target.dataset.status = TILE_STATUSES.HIDDEN;
    } else if (MINES_NUMBER === 0) {
      return;
    }
    // Prevent marking revealed tiles
    if(e.target.dataset.status !== TILE_STATUSES.HIDDEN && e.target.dataset.status !== TILE_STATUSES.MARKED) {
      return
    }

    if(e.target.dataset.status === TILE_STATUSES.MARKED) {
      e.target.dataset.status = TILE_STATUSES.HIDDEN
      //if user unchecks mine reduce the minechecked if tile is a mine
      if(tileInfo.mine) {
        setMineChecekd(mineChecked - 1)
      }
      if(MINES_NUMBER === 10) {
        return
      } else {
        setMinesNumber(MINES_NUMBER + 1)
      }
    } else {
      e.target.dataset.status = TILE_STATUSES.MARKED
      // Increase the count and if count is 10 user wins!
      if(tileInfo.mine) {
        setMineChecekd(mineChecked + 1);
        if(mineChecked === 10) {
          setWin(!win);
        }
      } 
      setMinesNumber(MINES_NUMBER - 1);
    }
  }

  return(
    <>
      <h3>Minesweeper</h3>
      <h5>Mines left: {MINES_NUMBER}</h5>
      <div style={{display:  `${!lost ? 'none': ''}`}}>
       <p>You Lost</p>
        <button  onClick={()=> {
          setLost(false);
          
          createBoard(BOARD_NUMBER, MINES_NUMBER)
        }}>Try again?</button>
      </div>
      <div style={{display:  `${!win ? 'none': ''}`}}>
        <p>You won!</p>
        <button  onClick={()=> {
          setWin(false);
          
          createBoard(BOARD_NUMBER, MINES_NUMBER)
        }}>Try again?</button>
      </div>
      <div className={styles.board}>
        {!board ? '' : board.map(row => row.map((tile, index) => <div key={index} data-status={tile[0].status} className={styles.board} onClick={tileClick} onContextMenu={contextMenu} data-tile={JSON.stringify(tile)}>{tile.status}</div>))}
      </div>
    </>
  )
}

export default Minesweeper;