import React, { useEffect, useState } from 'react'

const Switch = ({ checked=false, onChange, disabled=false}) => {

    const [isOn, setIsOn] = useState(checked);

    useEffect(() => {
        setIsOn(checked);
    }, [checked]);

    const toggle = () => {
    if (disabled) return;
    const newState = !isOn;
    setIsOn(newState);
    onChange && onChange(newState);
  };

  /*const handleKeyDown = (e) => {
    if (disabled) return;
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      toggle();
    }
  };*/

  return (
    <>
    <div
      role="switch"
      aria-checked={isOn}
      onClick={toggle}
      style={{
        width: 50,
        height: 24,
        backgroundColor: isOn ? "#4caf50" : "#ccc",
        borderRadius: 12,
        position: "relative",
        cursor: disabled ? "not-allowed" : "pointer",
        outline: "none",
      }}>
        <div
        style={{
          position: "absolute",
          top: 2,
          left: isOn ? 26 : 2,
          width: 20,
          height: 20,
          backgroundColor: "white",
          borderRadius: "50%",
          transition: "left 0.2s",
        }}></div>
    </div>
    </>
  )
}

export default Switch