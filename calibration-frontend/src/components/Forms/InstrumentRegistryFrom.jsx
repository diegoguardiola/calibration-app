import { useState, useEffect } from "react";

function InstrumentRegistryForm() {

  const [instrumentDescription, setInstrumentDescription] = useState('');
  const [instrumentID, setInstrumentID] = useState('');
  const [NISTnum, setNISTnum] = useState('');
  const [instrumentManufacturer, setInstrumentManufacturer] = useState('');
  const [instrumentModelNumber, setInstrumentModelNumber ] = useState('');
  const [instrumentSerialNumber, setInstrumentSerialNumber ] = useState('');
  const [instrumentCalDate, setInstrumentCalDate ] = useState('');
  const [instrumentIntervalYears, setInstrumentIntervalYears ] = useState('');
  const [instrumentIntervalMonths, setInstrumentIntervalMonths ] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = 'http://localhost:5000/c1_1/instrument/add'; 

    const data = {
      instrumentDescription,
      instrumentID,
      NISTnum,
      instrumentManufacturer,
      instrumentModelNumber,
      instrumentSerialNumber,
      instrumentCalDate,
      instrumentIntervalYears,
      instrumentIntervalMonths
    };

    fetch(url, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(err => { throw err; });
        }
        return response.json();
    })
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
  }


  return (
    <form className='container' onSubmit={handleSubmit}>
      <div className='row'>
        <h3>Register New Calibration Instrument</h3>
        <label>Description</label>
        <input
          type="text" 
          onChange={(e) => setInstrumentDescription(e.target.value)} 
          value={instrumentDescription} 
        />
        <label>Instrument ID</label>
        <input
          type="text" 
          onChange={(e) => setInstrumentID(e.target.value)} 
          value={instrumentID} 
        />
        <label>NIST Number</label>
        <input
          type="text" 
          onChange={(e) => setNISTnum(e.target.value)} 
          value={NISTnum} 
        />
        <label>Instrument Manufacturer</label>
        <input
          type="text" 
          onChange={(e) => setInstrumentManufacturer(e.target.value)} 
          value={instrumentManufacturer} 
        />
        <label>Instrument Model Number</label>
        <input
          type="text" 
          onChange={(e) => setInstrumentModelNumber(e.target.value)} 
          value={instrumentModelNumber} 
        />
        <label>Instrument Serial Number</label>
        <input
          type="text" 
          onChange={(e) => setInstrumentSerialNumber(e.target.value)} 
          value={instrumentSerialNumber} 
        />
        <label>Calibration Date</label>
        <input
          type="text" 
          onChange={(e) => setInstrumentCalDate(e.target.value)} 
          value={instrumentCalDate} 
        />
        <label>Calibration Interval</label>
        <div className="col-md-2">
          <label>Years</label>
          <input
            type="number"
            value={instrumentIntervalYears}
            onChange={(e) => setInstrumentIntervalYears(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="col-md-2">
            <label>Months</label>
            <input
              type="number"
              value={instrumentIntervalMonths}
              onChange={(e) => setInstrumentIntervalMonths(e.target.value)}
              className="form-control"
            />
        </div>
        <button type="submit">Register Instrument</button>
      </div>
    </form>
  )
}

export default InstrumentRegistryForm
