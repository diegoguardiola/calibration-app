import { useState, useEffect } from "react";
import { Container, Row, Col, Dropdown } from 'react-bootstrap';
import './Calibration.css'



function SelectInstrument({ instrumentInformation, setInstrumentInformation }) {

    const [instruments, setInstruments] = useState([])
    const [instrumentID, setInstrumentID] = useState(null);
    const [fetchedData, setFetchedData] = useState([]);    

    useEffect(() => {
      fetch('http://localhost:5000/instrument/get-descriptions')
      .then(response => response.json())
        .then(data => setInstruments(data))
        .catch(error => console.error('Error fetching instruments:', error));
        console.log(instruments)
    }, []);


    const handleChange = (eventKey) => {
      // Use 'eventKey' directly as it's the value passed by the Dropdown onSelect
      setInstrumentID(eventKey);
      
      fetch(`http://localhost:5000/instrument/${eventKey}/get-info`)
      .then(response => response.json())
      .then(data => {
          console.log(data);
          setFetchedData(data);
          
          // Assuming 'data' is an object with the instrument's details
          setInstrumentInformation({
              instrumentDescription: data.instrumentDescription,
              instrumentID: data.instrumentID, 
              NISTnum: data.NISTnum, 
              instrumentManufacturer: data.instrumentManufacturer,
              instrumentModelNumber: data.instrumentModelNumber,
              instrumentSerialNumber: data.instrumentSerialNumber,
              instrumentCalDate: data.instrumentCalDate,
              instrumentIntervalYears: data.instrumentIntervalYears,
              instrumentIntervalMonths: data.instrumentIntervalMonths,
          });
          
      })
      .catch(error => console.error('Error fetching data:', error));
    };

    
  return (
    <Container>
      <Col>
        <h2>Select Instrument</h2>
        <Dropdown onSelect={handleChange}>
          <Dropdown.Toggle style={{ backgroundColor: '#000099', color: 'white' }} id="dropdown-basic">
            Select Instrument
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item value="" disabled>Select an Instrument</Dropdown.Item>
            {instruments.map(instrument => (
              <Dropdown.Item eventKey={instrument._id}>
                {instrument.instrumentID + ' ' + instrument.instrumentDescription}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>

        {instrumentID && (
          <>
            <p><span style={{ fontWeight: 'bold' }}>Description: </span>{instrumentInformation.instrumentDescription}</p>
            <p><span style={{ fontWeight: 'bold' }}>ID: </span>{instrumentInformation.instrumentID}</p>
            <p><span style={{ fontWeight: 'bold' }}>NIST #: </span>{instrumentInformation.NISTnum}</p>
            <p><span style={{ fontWeight: 'bold' }}>Manufacturer: </span>{instrumentInformation.instrumentManufacturer}</p>
            <p><span style={{ fontWeight: 'bold' }}>Model Number: </span>{instrumentInformation.instrumentModelNumber}</p>
            <p><span style={{ fontWeight: 'bold' }}>Serial Number: </span>{instrumentInformation.instrumentSerialNumber}</p>
            <p><span style={{ fontWeight: 'bold' }}>Calibration Date: </span>{instrumentInformation.instrumentCalDate}</p>
            <p><span style={{ fontWeight: 'bold' }}>Calibration Interval (mo): </span>{instrumentInformation.instrumentIntervalMonths}</p>
          </>
        )}
      </Col>
    </Container>
  )
}

export default SelectInstrument
