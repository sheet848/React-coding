import React, { useEffect, useState } from 'react'

const formatTime = (date) => {
    let hours = date.getHours();
    const mins =  date.getMinutes();
    const secs = date.getSeconds();

    const ampm = hours >= 12 ? "PM": "AM";
    hours = hours % 12 || 12;  // 12-hoiur format

    return `${String(hours).padStart(2, "0")} : ${String(mins).padStart(2, "0")} : ${String(secs).padStart(2, "0")} ${ampm}`;
}

const DigitalClock = () => {

    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timerId = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timerId);
    }, []);

  return (
    <>
    <div>{formatTime(time)}</div>
    </>
  )
}

export default DigitalClock