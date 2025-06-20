import React, { useEffect, useState, useRef } from 'react'

const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms/1000);
    const minutes = Math.floor(totalSeconds /60);
    const seconds = totalSeconds % 60;
    const milliseconds = Math.floor((ms % 1000) / 10);

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}.${String(milliseconds).padStart(2, "0")}`;
}

const StopWatch = () => {

    const [elapsed, setElapsed] = useState(0);
    const [running, setRunning] = useState(false);
    const intervalRef = useRef(null);
    const startTimeRef = useRef(null);

    useEffect(() => {
        if(running) {
            startTimeRef.current = Date.now() - elapsed;
            intervalRef.current = setInterval(() => {
                setElapsed(Date.now() - startTimeRef.current);
            }, 50);
        } else {
            clearInterval(intervalRef.current);
        }
        return () => clearInterval(intervalRef.current);
    }, [running]);

    const handleStart = () => setRunning(true);
    const handleStop = () => setRunning(false);

    const handleReset = () => {
        setRunning(false);
        setElapsed(0);
    };

  return (
    <>
    <div>
        <div>{formatTime(elapsed)}</div>
        <div>
            {
                !running ? (
                    <button onClick={handleStart}>Start</button>
                ) : (
                    <button onClick={handleStop}>Stop</button>
                )
            }
            <button onClick={handleReset}>Reset</button>
        </div>
    </div>
    </>
  )
}

export default StopWatch