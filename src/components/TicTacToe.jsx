import React, { useState } from 'react'

const WIN_COMBINATIONS = [
    [0,1,2], [3,4,5], [6,7,8], //rows
    [0,3,6], [1,4,7], [2,5,8], //cols
    [0,4,8], [2,4,6],          //diagonals
];

function calculateWinner(board) {
    for (let [a,b,c] of WIN_COMBINATIONS) {
        if(board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];   // 'X' or 'O'
        }
    }
    return null;
}

const TicTacToe = () => {

    const [board, setBoard] = useState(Array(9).fill(null));
    const [isXNext, setIsXNext] = useState(true);

    const winner = calculateWinner(board);
    const isDraw = !winner && board.every(Boolean);

    const handleClick = (i) => {
        if (board[i] || winner) return;
        const newBoard = board.slice();
        newBoard[i] = isXNext ? 'X' : 'O';

        setBoard(newBoard);
        setIsXNext(!isXNext);
    };

    const reset = () => {
        setBoard(Array(9).fill(null));
        setIsXNext(true);
    }

    const status = winner ? `Winner: ${winner}`
    : isDraw ? "It's a draw!"
    : `Next Player: ${isXNext ? "X" : "O"}`;

  return (
    <>
    <div>
        <h2>Tic Tac Toe</h2>
        <div 
            style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 100px)',
                gridTemplateRows: 'repeat(3, 100px)',
                gap: '10px',
            }}>
            {
                board.map((cell, i) => (
                    <button
                        key={i}
                        onClick={() => handleClick(i)}>{cell}</button>
                ))
            }            
        </div>
        <p>{status}</p>
        <button onClick={reset}>Restart</button>
    </div>
    </>
  )
}

export default TicTacToe