import React, { useState } from 'react'

const generateShuffledCards = () => {
  const values = ["A", "B", "C", "D", "E", "F"];
  const duplicated = [...values, ...values];
  return duplicated
    .map((val, i) => ({
      id: i,
      value: val,
      flipped: false,
      matched: false,
    }))
    .sort(() => Math.random() - 0.5);
};

const MemoryGame = () => {

    const [cards, setCards] = useState(generateShuffledCards);
    const [flipped, setFlipped] = useState([]); // holds indices
    const [disableClick, setDisableClick] = useState(false);

    const handleCardClick = (index) => {
    if (disableClick || cards[index].flipped || cards[index].matched) return;

    const newCards = [...cards];
    newCards[index].flipped = true;
    const newFlipped = [...flipped, index];
    setCards(newCards);
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      const [firstIdx, secondIdx] = newFlipped;
      const firstCard = newCards[firstIdx];
      const secondCard = newCards[secondIdx];

      if (firstCard.value === secondCard.value) {
        newCards[firstIdx].matched = true;
        newCards[secondIdx].matched = true;
        setCards(newCards);
        setFlipped([]);
      } else {
        setDisableClick(true);
        setTimeout(() => {
          newCards[firstIdx].flipped = false;
          newCards[secondIdx].flipped = false;
          setCards(newCards);
          setFlipped([]);
          setDisableClick(false);
        }, 1000);
      }
    }
  };

  const resetGame = () => {
    setCards(generateShuffledCards());
    setFlipped([]);
    setDisableClick(false);
  };

  const isGameWon = cards.every((card) => card.matched);

  return (
    <>
    <div>
      <h1>Memory Game</h1>

      <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 100px)',
                gridTemplateRows: 'repeat(4, 100px)',
                gap: '10px',
            }}>
        {cards.map((card, index) => (
          <button
            key={card.id}
            onClick={() => handleCardClick(index)}
          >
            {(card.flipped || card.matched) && card.value}
          </button>
        ))}
      </div>

      {isGameWon && (
        <div>
          <p>🎉 You won!</p>
          <button onClick={resetGame}>
            Play Again
          </button>
        </div>
      )}
    </div>
    </>
  )
}

export default MemoryGame