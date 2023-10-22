import { useState, useEffect } from "react";

function SelectInstrument() {

    const [instruments, setInstruments] = useState([])
    const [instrumentID, setInstrumentID] = useState(null);
    const [fetchedData, setFetchedData] = useState([]);    

    useEffect(() => {
      fetch('http://localhost:5000/c1_1/instrument/get-descriptions')
      .then(response => response.json())
        .then(data => setInstruments(data))
        .catch(error => console.error('Error fetching instruments:', error));
        console.log(instruments)
    }, []);

    const [instrumentInformation, setInstrumentInformation] = useState({
      instrumentDescription: '',
      instrumentID: '', 
      NISTnum: '', 
      instrumentManufacturer: '',
      instrumentModelNumber: '',
      instrumentSerialNumber: '',
      instrumentCalDate: '',
      instrumentIntervalYears: '',
      instrumentIntervalMonths: '',
  });
  

    const handleChange = (event) => {
        const selectedInstrumentID = event.target.values;
        setInstrumentID(selectedInstrumentID)
        
        fetch(`http://localhost:5000/c1_1/instrument/${selectedInstrumentID}/get-info`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setFetchedData(data);const selectedInstrument = fetchedData.instrument.List.find(item => item._id === event.target.value);
            if (selectedInstrument) {
              setInstrumentInformation({
                instrumentDescription: selectedInstrumentID.instrumentDescription,
                instrumentID: selectedInstrumentID.instrumentID, 
                NISTnum: selectedInstrumentID.NISTnum, 
                instrumentManufacturer: selectedInstrumentID.instrumentManufacturer,
                instrumentModelNumber: selectedInstrumentID.instrumentModelNumber,
                instrumentSerialNumber: selectedInstrumentID.instrumentSerialNumber,
                instrumentCalDate: selectedInstrumentID.instrumentCalDate,
                instrumentIntervalYears: selectedInstrumentID.instrumentIntervalYears,
                instrumentIntervalMonths: selectedInstrumentID.instrumentIntervalMonths,
              })
            }
        })
        .catch(error => console.error('Error fetching data:', error));
        
        
      };



  return (
    <div className='row'>
        <h1>Select Instrument</h1>
        <select onChange={handleChange}>
          <option value="" disabled selected>Select an Instrument</option>
          {instruments.map(instrument => (
              <option key={instrument._id} value={instrument._id}>
                  {[instrument.instrumentID, ' ',instrument.instrumentDescription,]}
              </option>
          ))}
        </select>
        <p>{instrumentInformation.instrumentDescription}</p>
        <p>{instrumentInformation.instrumentID}</p>
        <p>{instrumentInformation.NISTnum}</p>
        <p>{instrumentInformation.instrumentManufacturer}</p>
        <p>{instrumentInformation.instrumentModelNumber}</p>
        <p>{instrumentInformation.instrumentSerialNumber}</p>
        <p>{instrumentInformation.instrumentCalDate}</p>
        <p>{instrumentInformation.instrumentIntervalYears}</p>
        <p>{instrumentInformation.instrumentIntervalMonths}</p>
    </div>
  )
}

export default SelectInstrument
