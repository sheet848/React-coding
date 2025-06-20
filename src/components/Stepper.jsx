import React, { useState } from 'react'

const steps = [
    {
        label: "User Info",
        content: <div>Step 1: Enter your name and email</div>,
    },
    {
        label: "Address",
        content: <div>Step 2: Enter your address</div>,
    },
    {
        label: "Review",
        content: <div>Step 3: Review and submit</div>,
    },
];

const Stepper = () => {

    const [current, setCurrent] = useState(0);

    const handleNext = () => {
        if (current < steps.length - 1) setCurrent(current + 1);
    };

    const handleBack = () => {
        if (current > 0) setCurrent(current - 1);
    };

    return (
        <>
            <div>
                <div style={{
                    display: 'flex',
                    gap: '100px'
                }}>
                    {steps.map((step, index) => (
                        <div key={index}>
                            <div style={{
                                backgroundColor: index <= current ? 'blue' : 'gray',
                                color: 'white'
                            }}>
                                {index + 1}
                            </div>
                            <div>{step.label}</div>
                            {index < steps.length - 1 && (
                                <div></div>
                            )}
                        </div>
                    ))}
                </div>

                <div>{steps[current].content}</div>

                <div>
                    <button
                        onClick={handleBack}
                    >
                        Back
                    </button>
                    <button
                        onClick={handleNext}
                    >
                        Next
                    </button>
                </div>
            </div>
        </>
    )
}

export default Stepper