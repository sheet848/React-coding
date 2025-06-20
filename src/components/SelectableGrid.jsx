import React, { useState } from 'react'

const SelectableGrid = ({ rows = 5, cols = 5 }) => {

    const [selected, setSelected] = useState(new Set());

    const toggleCell = (r, c) => {
        const key = `${r},${c}`;
        const updated = new Set(selected);
        if (updated.has(key)) {
            updated.delete(key);
        } else {
            updated.add(key);
        }
        setSelected(updated);
    };

    const isSelected = (r, c) => selected.has(`${r},${c}`);

    return (
        <>
            <div>
                <h2>Selectable Grid</h2>
                <div style={{ gridTemplateColumns: `repeat(${cols}, 40px)` }}>
                    {Array.from({ length: rows }).flatMap((_, r) =>
                        Array.from({ length: cols }).map((_, c) => (
                            <button
                                key={`${r}-${c}`}
                                onClick={() => toggleCell(r, c)}
                                className={`w-10 h-10 border text-sm ${isSelected(r, c)
                                        ? "bg-blue-500 text-white"
                                        : "bg-white text-gray-700"
                                    } focus:outline-none`}
                                aria-pressed={isSelected(r, c)}
                                aria-label={`Cell ${r + 1}-${c + 1}`}
                            >
                                {r},{c}
                            </button>
                        ))
                    )}
                </div>
            </div>
        </>
    )
}

export default SelectableGrid