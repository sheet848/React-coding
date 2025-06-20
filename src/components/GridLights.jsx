import React, { useState, useCallback } from 'react'

const GRID_SIZE = 5;

// Helper to create random grid
const createGrid = () =>
    Array(GRID_SIZE)
        .fill(null)
        .map(() =>
            Array(GRID_SIZE)
                .fill(null)
                .map(() => Math.random() < 0.5)
        );

const GridLights = () => {
    const [grid, setGrid] = useState(createGrid);
    const [hasWon, setHasWon] = useState(false);

    const toggleCell = useCallback((row, col) => {
        setGrid((oldGrid) => {
            const newGrid = oldGrid.map((r) => r.slice()); // deep copy

            function toggle(r, c) {
                if (r >= 0 && r < GRID_SIZE && c >= 0 && c < GRID_SIZE) {
                    newGrid[r][c] = !newGrid[r][c];
                }
            }

            toggle(row, col);
            toggle(row - 1, col);
            toggle(row + 1, col);
            toggle(row, col - 1);
            toggle(row, col + 1);

            // Check win: all off
            const won = newGrid.every((r) => r.every((cell) => cell === false));
            setHasWon(won);

            return newGrid;
        });
    }, []);

    const reset = () => {
        setGrid(createGrid());
        setHasWon(false);
    };

    return (
        <>
            <div>
                <h1>Grid Lights</h1>
                <div role="grid"
                    style={{
                        display : 'grid',
                        gridTemplateColumns: 'repeat(5, 100px)',
                        gridTemplateRows: 'repeat(5, 100px)',
                        gap: '10px',
                    }}>
                    {grid.map((row, rIdx) =>
                        row.map((cell, cIdx) => (
                            <button
                                key={`${rIdx}-${cIdx}`}
                                onClick={() => toggleCell(rIdx, cIdx)}
                                role="gridcell"
                                tabIndex={0}
                                style={{
                                    backgroundColor: cell ? 'yellow' : 'gray'
                                }}
                            />
                        ))
                    )}
                </div>

                {hasWon && (
                    <div role="alert">
                        🎉 You won! All lights are off.
                    </div>
                )}

                <button
                    onClick={reset}
                >
                    Reset
                </button>
            </div>
        </>
    )
}

export default GridLights