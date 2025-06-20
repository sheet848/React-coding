import React, { useState } from 'react';

const initialFormData = {
    name: "",
    email: "",
    address: "",
    city: "",
};

const StepForm = () => {

    const [formData, setFormData] = useState(initialFormData);
    const [currentStep, setCurrentStep] = useState(0);
    const [errors, setErrors] = useState({});

    const steps = ["User Info", "Address", "Confirmation"];

    const validate = () => {
        let stepErrors = {};
        if(currentStep === 0) {
            if(!formData.name.trim()) stepErrors.name = "Name is Required";
            if(!/\S+@\S+\.\S+/.test(formData.email)) stepErrors.email = "Valid email required";
        } else if (currentStep === 1) {
            if (!formData.address.trim()) stepErrors.address = "Address required";
            if (!formData.city.trim()) stepErrors.city = "City required";
        }

        setErrors(stepErrors);
        return Object.keys(stepErrors).length === 0;
    };

    const handleNext = () => {
        if(validate()) setCurrentStep((prev) => prev + 1);
    };

    const handleBack = () => {
        if(validate()) setCurrentStep((prev) => prev - 1);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if(validate()) {
            alert("Form submitted!\n" + JSON.stringify(formData, null, 2));
            setFormData(initialFormData);
            setCurrentStep(0);
        }
    };

  return (
    <>
    <div>
        <h2>Step { currentStep + 1 } : {steps[currentStep]}</h2>

        <form onSubmit={handleSubmit}>
            {
                currentStep === 0 && (
                    <>
                    <div>
                        <label htmlFor="name">Name</label>
                        <input type="text"
                                name='name'
                                value={formData.name}
                                onChange={handleChange}
                                 />
                        {errors.name && <p>{errors.name}</p>}
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input type="email"
                                name='email'
                                value={formData.email}
                                onChange={handleChange} />
                        { errors.email && <p>{errors.email}</p>}
                    </div>
                    </>
                )
            }

            {
                currentStep === 1 && (
                    <>
                    <div>
                        <label htmlFor="address">Address</label>
                        <input type="text"
                                name='address'
                                value={formData.address}
                                onChange={handleChange} />
                        { errors.address && <p>{errors.address}</p>}
                    </div>
                    <div>
                        <label htmlFor="city">City</label>
                        <input type="text"
                                name='city'
                                value={formData.city}
                                onChange={handleChange} />
                        { errors.city && <p>{errors.city}</p>}
                    </div>
                    </>
                )
            }

            {
                currentStep === 2 && (
                    <>
                        <div><strong>Name:</strong> {formData.name}</div>
                        <div><strong>Email:</strong> {formData.email}</div>
                        <div><strong>Address:</strong> {formData.address}</div>
                        <div><strong>City:</strong> {formData.city}</div>
                        <p>Click submit to finish.</p>
                    </>
                )
            }

            <div>
                {
                    currentStep > 0 && (
                        <button type='button' onClick={handleBack}>Back</button>
                    )
                }
                {
                    currentStep < steps.length - 1 ? (
                        <button type='button' onClick={handleNext}>Next</button>
                    ) : (
                        <button type='submit'>Submit</button>
                    )
                }
            </div>
        </form>
    </div>
    </>
  )
}

export default StepForm