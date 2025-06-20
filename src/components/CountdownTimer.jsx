import React, { useState, useEffect, useRef } from 'react'

const CountdownTimer = () => {

    const [inputMinutes, setInputMinutes] = useState("");
    const [inputSeconds, setInputSeconds] = useState("");
    const [remainingSeconds, setRemainingSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const intervalRef = useRef(null);

    // Convert remaining seconds to mm:ss format
    const formatTime = (secs) => {
        const m = Math.floor(secs / 60)
            .toString()
            .padStart(2, "0");
        const s = (secs % 60).toString().padStart(2, "0");
        return `${m}:${s}`;
    };

    // Start or resume countdown
    const startTimer = () => {
        if (remainingSeconds <= 0) return; // don't start if zero
        if (isRunning) return; // prevent multiple intervals

        setIsRunning(true);

        intervalRef.current = setInterval(() => {
            setRemainingSeconds((prev) => {
                if (prev <= 1) {
                    clearInterval(intervalRef.current);
                    setIsRunning(false);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    // Pause timer
    const pauseTimer = () => {
        clearInterval(intervalRef.current);
        setIsRunning(false);
    };

    // Reset timer to initial input
    const resetTimer = () => {
        pauseTimer();
        const totalSeconds =
            (parseInt(inputMinutes, 10) || 0) * 60 + (parseInt(inputSeconds, 10) || 0);
        setRemainingSeconds(totalSeconds);
    };

    // Handle input change and reset timer accordingly
    useEffect(() => {
        resetTimer();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inputMinutes, inputSeconds]);

    // Cleanup interval on unmount
    useEffect(() => {
        return () => clearInterval(intervalRef.current);
    }, []);

    return (
        <>
            <div>
                <h1>Countdown Timer</h1>

                <div>
                    <label>
                        Minutes:
                        <input
                            type="number"
                            min="0"
                            value={inputMinutes}
                            onChange={(e) => setInputMinutes(e.target.value)}
                        />
                    </label>

                    <label>
                        Seconds:
                        <input
                            type="number"
                            min="0"
                            max="59"
                            value={inputSeconds}
                            onChange={(e) => {
                                let val = e.target.value;
                                if (val > 59) val = "59"; // restrict max 59 seconds
                                setInputSeconds(val);
                            }}
                        />
                    </label>
                </div>

                <div>
                    {formatTime(remainingSeconds)}
                </div>

                <div>
                    {!isRunning ? (
                        <button
                            onClick={startTimer}
                            disabled={remainingSeconds === 0}
                        >
                            Start
                        </button>
                    ) : (
                        <button
                            onClick={pauseTimer}
                        >
                            Pause
                        </button>
                    )}
                    <button
                        onClick={resetTimer}
                    >
                        Reset
                    </button>
                </div>
            </div>
        </>
    )
}

export default CountdownTimer