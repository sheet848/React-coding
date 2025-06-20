import React, { useState, useEffect, useRef } from 'react'

const LIGHTS = [
    { color: "red", duration: 5000 },
    { color: "green", duration: 5000 },
    { color: "yellow", duration: 2000 },
];

const Traffic = () => {

    const [currentIndex, setCurrentIndex] = useState(0);
    const [running, setRunning] = useState(true);
    const timerRef = useRef(null);

    useEffect(() => {
        if (!running) return;

        const { duration } = LIGHTS[currentIndex];
        timerRef.current = setTimeout(() => {
            setCurrentIndex((prev) => (prev + 1) % LIGHTS.length);
        }, duration);

        return () => clearTimeout(timerRef.current);
    }, [currentIndex, running]);

    const toggleRunning = () => setRunning((prev) => !prev);

    return (
        <>
            <div
                role="group"
                style={{
                    width: 100,
                    padding: 20,
                    backgroundColor: "#333",
                    borderRadius: 12,
                    display: "flex",
                    flexDirection: "column",
                    gap: 20,
                    alignItems: "center",
                }}
            >
                {LIGHTS.map(({ color }, index) => {
                    const isActive = index === currentIndex;
                    return (
                        <div
                            key={color}
                            role="presentation"
                            style={{
                                width: 60,
                                height: 60,
                                borderRadius: "50%",
                                backgroundColor: isActive ? color : "#555",
                                boxShadow: isActive
                                    ? `0 0 20px 5px ${color}`
                                    : "none",
                                transition: "background-color 0.5s ease",
                            }}
                        />
                    );
                })}

                <button
                    onClick={toggleRunning}
                    style={{
                        marginTop: 20,
                        padding: "8px 16px",
                        cursor: "pointer",
                        borderRadius: 4,
                        border: "none",
                        backgroundColor: running ? "#c0392b" : "#27ae60",
                        color: "#fff",
                        fontWeight: "bold",
                    }}
                >
                    {running ? "Stop" : "Start"}
                </button>
            </div>
        </>
    )
}

export default Traffic