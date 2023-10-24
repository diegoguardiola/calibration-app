import { useState, useEffect } from "react";

function Results() {

    const [selectedType, setSelectedType] = useState('');

    const handleTypeChange = (event) => {
        setSelectedType(event.target.value);
    };

    const [selectedMethod, setSelectedMethod] = useState('');

    const handleMethodChange = (event) => {
        setSelectedMethod(event.target.value);
    };

  return (
    <div>
        <br></br>
        <h4>Reason For Service</h4>
        <select value={selectedType} onChange={handleTypeChange}>
            <option value="" disabled>Select a Calibration Type</option>
            <option value="type1">Type 1</option>
            <option value="type2">Type 2</option>
            <option value="type3">Type 3</option>
            {/* Add more options as needed */}
        </select>
        <h1>Calibration Method</h1>
        <select value={selectedMethod} onChange={handleMethodChange}>
            <option value="" disabled>Select a Calibration Method</option>
            <option value="method1">Method 1</option>
            <option value="method2">Method 2</option>
            <option value="method3">Method 3</option>
            {/* Add more options as needed */}
        </select>
    </div>
  )
}

export default Results
