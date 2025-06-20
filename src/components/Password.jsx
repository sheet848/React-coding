import React, { useState } from 'react'

const LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
const UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const DIGITS = "0123456789";
const SPECIALS = "!@#$%^&*()-_=+[]{}|;:',.<>?/";

const Password = () => {

    const [length, setLength] = useState(12);
    const [includeLower, setIncludeLower] = useState(true);
    const [includeUpper, setIncludeUpper] = useState(true);
    const [includeDigits, setIncludeDigits] = useState(true);
    const [includeSpecial, setIncludeSpecial] = useState(false);
    const [password, setPassword] = useState("");

    const generatePassword = () => {
        const pools = [];
        if (includeLower) pools.push(LOWERCASE);
        if (includeUpper) pools.push(UPPERCASE);
        if (includeDigits) pools.push(DIGITS);
        if (includeSpecial) pools.push(SPECIALS);

        if (pools.length === 0) {
            alert("Select at least one character type.");
            return;
        }

        if (length < 4) {
            alert("Password length should be at least 4.");
            return;
        }

        const allChars = pools.join("");
        let pwd = "";

        // Ensure at least one from each selected pool
        pools.forEach((pool) => {
            pwd += pool[Math.floor(Math.random() * pool.length)];
        });

        // Fill rest randomly
        for (let i = pwd.length; i < length; i++) {
            pwd += allChars[Math.floor(Math.random() * allChars.length)];
        }

        // Shuffle the password string to avoid predictable pattern
        const shuffled = pwd
            .split("")
            .sort(() => Math.random() - 0.5)
            .join("");

        setPassword(shuffled);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(password);
    };

    return (
        <>
            <div>
                <h1>Password Generator</h1>

                <label>
                    Length: {length}
                    <input
                        type="range"
                        min="4"
                        max="32"
                        value={length}
                        onChange={(e) => setLength(Number(e.target.value))}
                    />
                </label>

                <fieldset>
                    <legend>Include characters:</legend>
                    <label>
                        <input
                            type="checkbox"
                            checked={includeLower}
                            onChange={() => setIncludeLower(!includeLower)}
                        />
                        Lowercase
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            checked={includeUpper}
                            onChange={() => setIncludeUpper(!includeUpper)}
                        />
                        Uppercase
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            checked={includeDigits}
                            onChange={() => setIncludeDigits(!includeDigits)}
                        />
                        Digits
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            checked={includeSpecial}
                            onChange={() => setIncludeSpecial(!includeSpecial)}
                        />
                        Special Characters
                    </label>
                </fieldset>

                <button
                    onClick={generatePassword}
                >
                    Generate
                </button>

                {password && (
                    <div>
                        <input
                            type="text"
                            readOnly
                            value={password}
                        />
                        <button
                            onClick={copyToClipboard}
                        >
                            Copy
                        </button>
                    </div>
                )}
            </div>
        </>
    )
}

export default Password