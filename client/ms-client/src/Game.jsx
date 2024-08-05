import React, { useState, useEffect } from 'react';
import { Dropdown } from 'primereact/dropdown';
import mine from './images/mine.png'
import empty from './images/empty.png'
import hidden from './images/hidden.png'
import hiddenmine from './images/hiddenmine.png'
import flag from './images/flagged.png'
import one from './images/1.png'
import two from './images/2.png'
import three from './images/3.png'
import four from './images/4.png'
import five from './images/5.png'
import six from './images/6.png'
import seven from './images/7.png'
import eight from './images/8.png'
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import './Game.css';

export const Game = () => {
  const [boardState, setBoardState] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [size, setSize] = useState(2);
  const [desnity, setDesnity] = useState(1);


  let xInput = 10 * (size * .5)
  let yInput = 10 * (size * .5)



  const createNewBoard = () => {
    const makeRow = () => Array.from(Array(xInput), () => "empty-h");
    let msBoard = Array.from(Array(yInput), () => makeRow());
    return msBoard
  }



  const layMines = (board) => {
    const totalCells = xInput * yInput;
    const numberOfMines = Math.floor(totalCells * 0.1 * desnity);
    var allPositions = Array.from({ length: totalCells }, (v, i) => i);

    for (let i = allPositions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allPositions[i], allPositions[j]] = [allPositions[j], allPositions[i]];
    }

    const minePositions = allPositions.slice(0, numberOfMines);

    minePositions.forEach(position => {
      const row = Math.floor(position / xInput);
      const col = position % xInput;
      board[row][col] = "mine-h";
    });
    return board;

  }
  const initializeGame = () => {
    let newBoard = createNewBoard();
    newBoard = layMines(newBoard);
    setBoardState(newBoard);
    setGameOver(false)
  };
  const handleSearch = (rowIndex, cellIndex) => {
    const newBoardState = [...boardState];
    const clickedCell = newBoardState[rowIndex][cellIndex];

    if (clickedCell === 'empty-h') {
      cellCheck(newBoardState, rowIndex, cellIndex)
    } else if (clickedCell === 'mine-h') {
      newBoardState[rowIndex][cellIndex] = 'mine';
      setGameOver(true)
    }

    setBoardState(newBoardState);
    console.log(clickedCell);
    console.log(newBoardState[rowIndex][cellIndex]);
  }

  const cellCheck = (newBoardState, rowIndex, cellIndex) => {

    if (rowIndex < 0 || rowIndex >= newBoardState.length ||
      cellIndex < 0 || cellIndex >= newBoardState[0].length) {
      return;
    }
    if (newBoardState[rowIndex][cellIndex] !== 'empty-h') {
      return;
    }



    let mineCount = 0;
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) continue;
        const newRow = rowIndex + i;
        const newCol = cellIndex + j;
        if (newRow >= 0 && newRow < newBoardState.length &&
          newCol >= 0 && newCol < newBoardState[0].length) {
          if (newBoardState[newRow][newCol] === 'mine-h' || newBoardState[newRow][newCol] === 'mine') {
            mineCount++;
          }
        }
      }
    }

    if (mineCount === 0) {
      newBoardState[rowIndex][cellIndex] = 'empty';

      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          cellCheck(newBoardState, rowIndex + i, cellIndex + j);
        }
      }
    } else {
      newBoardState[rowIndex][cellIndex] = mineCount.toString();
    }
    return newBoardState
  }
  const handleRightClick = (e, rowIndex, cellIndex) => {
    e.preventDefault();
    const newBoardState = boardState.map(row => [...row]);
    const cell = newBoardState[rowIndex][cellIndex];

    switch (cell) {
      case 'empty-h':
        newBoardState[rowIndex][cellIndex] = 'empty-h-f';
        break;
      case 'empty-h-f':
        newBoardState[rowIndex][cellIndex] = 'empty-h';
        break;
      case 'mine-h':
        newBoardState[rowIndex][cellIndex] = 'mine-h-f';
        break;
      case 'mine-h-f':
        newBoardState[rowIndex][cellIndex] = 'mine-h';
        break;
      default:
        // Do nothing for revealed cells
        break;
    }

    setBoardState(newBoardState);
  };


  useEffect(() => {
    initializeGame();
  }, [])

  const desnityOptions = ['2','3', '4', '5', '6', '7', '8', '9']




  return (
    <>



      {gameOver ? (
        <>
          <h1>BOOM!</h1>
          <Button label='start another game' onClick={() => initializeGame()}></Button>
        </>
      ) : (
        <>
          <Card>
          <p>Right Click To Flag Mines</p>
            <div className="game-board-container">
              <div className="game-board">
                {boardState && boardState.map((row, rowIndex) => (
                  <div key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                      <span key={cellIndex}>
                        {cell === 'empty-h' ? (
                          <img src={hidden}
                            alt="hidden"
                            onClick={() => handleSearch(rowIndex, cellIndex)}
                            onContextMenu={(e) => handleRightClick(e, rowIndex, cellIndex)}
                            style={{ cursor: 'pointer' }}
                          />
                        ) : cell === 'mine-h' ? (
                          <img src={hiddenmine}
                            alt="hidden"
                            onClick={() => handleSearch(rowIndex, cellIndex)}
                            onContextMenu={(e) => handleRightClick(e, rowIndex, cellIndex)}
                            style={{ cursor: 'pointer' }}
                          />
                        ) : cell === 'empty' ? (
                          <img src={empty} alt="empty" />
                        ) : cell === 'mine' ? (
                          <img src={mine} alt="mine" />
                        ) : cell === '1' ? (
                          <img src={one} alt="1" />
                        ) : cell === '2' ? (
                          <img src={two} alt="2" />
                        ) : cell === '3' ? (
                          <img src={three} alt="3" />
                        ) : cell === '4' ? (
                          <img src={four} alt="4" />
                        ) : cell === '5' ? (
                          <img src={five} alt="5" />
                        ) : cell === '6' ? (
                          <img src={six} alt="6" />
                        ) : cell === '7' ? (
                          <img src={seven} alt="7" />
                        ) : cell === '8' ? (
                          <img src={eight} alt="8" />
                        ) : cell === 'mine-h-f' ? (
                          <img src={flag} alt='flag' />
                        ) : cell === 'empty-h-f' ? (
                          <img src={flag} alt='flag' />
                        ) : (
                          <span>{cell}</span>
                        )}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            <p>Adjust The Dificulty</p>
            <Dropdown  onChange={(e) => setDesnity(e.value)} options={desnityOptions} optionLabel="name" placeholder="Mine Density"
               className="w-full md:w-14rem" />
          </Card>
          <Card>
            <p>
              Rules:
              On each turn, the user clicks on a square to uncover it.
              <br></br>
              If the square:
              Contains a mine, the user loses, and the game is over!
              <br></br>
              If the square:
              Is adjacent to a mine, the square displays the total number of mines in the 8 squares around it.
              <br></br>
              If the square:
              Is not adjacent to a mine, the square is blank and should behave as if the 8 adjacent squares were also clicked. For each of those squares,
              their neighboring squares continue to be revealed in each direction
              <br></br>
              (i.e., this step is applied recursively to all neighboring squares) until
              the edge of the board is reached or until a square is reached that is adjacent to a mine, in which case the previous rule applies.
            </p>
          </Card>
        </>
      )}
    </>
  )
}

