import React, { useState } from 'react'

const initialPoll = {
    question: "Which JS framework do you prefer?",
    options: [
        { id: 1, text: "React", votes: 4 },
        { id: 2, text: "Vue", votes: 2 },
        { id: 3, text: "Svelte", votes: 1 },
        { id: 4, text: "Angular", votes: 1 },
    ],
};

const PollWidget = () => {

    const [poll, setPoll] = useState(initialPoll);
    const [selectedOptionId, setSelectedOptionId] = useState(null);
    const [hasVoted, setHasVoted] = useState(false);

    const totalVotes = poll.options.reduce((sum, opt) => sum + opt.votes, 0);

    const handleVote = () => {
        if(hasVoted || selectedOptionId === null) return;

        const updatedOptions = poll.options.map((opt) =>
            opt.id === selectedOptionId ? { ...opt, votes: opt.votes + 1 } : opt
        );

        setPoll({ ...poll, options: updatedOptions });
        setHasVoted(true);
    };

  return (
    <>
    <div>
        <h2>{poll.question}</h2>

        <form onSubmit={(e) => e.preventDefault()}>
            {
                poll.options.map((opt) => {
                    const percent = Math.round((opt.votes / totalVotes) * 100) || 0;
                    const isSelected = opt.id === selectedOptionId;

                    return (
                        <div key={opt.id}>
                            {
                                !hasVoted ? (
                                    <label>
                                        <input type="radio"
                                            value={opt.id}
                                            checked={isSelected}
                                            onChange={() => setSelectedOptionId(opt.id)} />
                                        <span>{opt.text}</span>
                                    </label>
                                ) : (
                                    <div>
                                        <div>
                                            <span>{opt.text}</span>
                                            <span>{percent}%</span>
                                        </div>
                                        <div>
                                            <div></div>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    )
                })
            }

            {
                !hasVoted && (
                    <button
                        type='button'
                        onClick={handleVote}
                        disabled={selectedOptionId === null}>Vote</button>
                )
            }

            {
                hasVoted && (
                    <p>Thanks for voting!! Total Votes: {totalVotes}</p>
                )
            }
        </form>
    </div>
    </>
  )
}

export default PollWidget