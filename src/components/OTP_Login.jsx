import React, { useState, useRef } from 'react'

const OTP_Login = () => {
    const length = 4;
    const [otp, setOtp] = useState(new Array(length).fill(""));
    const inputRefs = useRef([]);

    const handleChange = (val, i) => {
        if (!/^\d?$/.test(val)) return; // Only digit or empty
        const newOtp = [...otp];
        newOtp[i] = val;
        setOtp(newOtp);

        // Move focus forward
        if (val && i < length - 1) {
            inputRefs.current[i + 1].focus();
        }
    };

    const handleKeyDown = (e, i) => {
        if (e.key === "Backspace" && otp[i] === "" && i > 0) {
            inputRefs.current[i - 1].focus();
        }
    };

    const handleSubmit = () => {
        if (otp.every((d) => d !== "")) {
            const code = otp.join("");
            alert("Submitting OTP: " + code);
            // Call API here
        } else {
            alert("Please enter complete OTP");
        }
    };

    return (
        <>
            <div>
                <h2>Enter OTP</h2>
                <div>
                    {otp.map((digit, i) => (
                        <input
                            key={i}
                            type="text"
                            inputMode="numeric"
                            maxLength="1"
                            value={digit}
                            onChange={(e) => handleChange(e.target.value, i)}
                            onKeyDown={(e) => handleKeyDown(e, i)}
                            ref={(el) => (inputRefs.current[i] = el)}
                            className="w-12 h-12 text-center text-xl border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                            aria-label={`Digit ${i + 1}`}
                        />
                    ))}
                </div>
                <button
                    onClick={handleSubmit}
                    disabled={otp.some((digit) => digit === "")}
                >
                    Submit
                </button>
            </div>
        </>
    )
}

export default OTP_Login