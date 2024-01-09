import { useState, useEffect } from "react";
import { Container, Row, Col, Dropdown } from 'react-bootstrap';
import './Calibration.css'

function SelectEquipment({ clientData, setClientData, equipmentInformation, setEquipmentInformation, onEquipmentSelect }) {

    // Display Equipment Based Information Based Off What  COmpany Is Selected
    const [companies, setCompanies] = useState([]);
    const [userID, setUserID] = useState(null);
    const [fetchedData, setFetchedData] = useState({ equipmentList: [] });



    useEffect(() => {
        // Fetch the data from the endpoint
        fetch('http://localhost:5000/user/get-user-company-id') // Replace with the actual endpoint path
        .then(response => response.json())
        .then(data => setCompanies(data))
        .catch(error => console.error('Error fetching companies:', error));
    }, []);
    

    const handleChange = (eventKey) => {
        
        setUserID(eventKey);
    
        fetch(`http://localhost:5000/user/${eventKey}/equipment`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setFetchedData(data);
            
    
            // Make an additional fetch call
            return fetch(`http://localhost:5000/user/${eventKey}/client-info`);
        })
        .then(response => response.json())
        .then(additionalData => {
            console.log(additionalData)
            setClientData(additionalData);
            // Do something with the additional data
        })
        .catch(error => console.error('Error fetching data:', error));
    };
    


    const handleEquipmentChange = (eventKey) => {
        const selectedEquipment = fetchedData.equipmentList.find(item => item._id === eventKey);
        if (selectedEquipment) {
            setEquipmentInformation({
                equipmentName: selectedEquipment.equipmentName,
                equipmentID: selectedEquipment.equipmentID,
                equipmentManufacturer: selectedEquipment.equipmentManufacturer,
                equipmentModelNumber: selectedEquipment.equipmentModelNumber,
                equipmentSerialNumber: selectedEquipment.equipmentSerialNumber,
                equipmentRange: selectedEquipment.equipmentRange,
                equipmentUnits: selectedEquipment.equipmentUnits,
                equipmentDescription: selectedEquipment.equipmentDescription,
                equipmentLocation: selectedEquipment.equipmentLocation,
            });
        }
        onEquipmentSelect(selectedEquipment?._id);
    };

    const selectedCompany = companies.find(c => c._id === userID);

  return (
    <Container>
        <Row>
            <Col xs={5}>
                <h2>Select Company</h2>
                <Dropdown onSelect={handleChange}>
                    <Dropdown.Toggle style={{ backgroundColor: '#000099', color: 'white' }} id="dropdown-basic">
                        Select Company
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item value="" disabled>Select a Company</Dropdown.Item>
                        {companies.map(company => (
                        <Dropdown.Item eventKey={company._id}>
                            {company.company}
                        </Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
                
                {selectedCompany && (
                    <p><span style={{ fontWeight: 'bold' }}>Company Name: </span> {selectedCompany.company}</p>
                )}
                
            </Col>
            <Col xs={6}>
                <h2>Select Equipment</h2>
                <Dropdown onSelect={handleEquipmentChange}>
                    <Dropdown.Toggle style={{ backgroundColor: '#000099', color: 'white' }} id="dropdown-basic">
                        Select Equipment
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item value="" disabled>Select Equipment </Dropdown.Item>
                        {fetchedData.equipmentList && fetchedData.equipmentList.map(item => (
                        <Dropdown.Item eventKey={item._id} value={item._id}>
                            {`${item.equipmentID}`}
                        </Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
                {equipmentInformation.equipmentID && (
                    <>
                        <p><span style={{ fontWeight: 'bold' }}>Name: </span>{equipmentInformation.equipmentName}</p>
                        <p><span style={{ fontWeight: 'bold' }}>ID: </span>{equipmentInformation.equipmentID}</p>
                        <p><span style={{ fontWeight: 'bold' }}>Manufacturer: </span>{equipmentInformation.equipmentManufacturer}</p>
                        <p><span style={{ fontWeight: 'bold' }}>Model Number: </span>{equipmentInformation.equipmentModelNumber}</p>
                        <p><span style={{ fontWeight: 'bold' }}>Serial Number: </span>{equipmentInformation.equipmentSerialNumber}</p>
                        <p><span style={{ fontWeight: 'bold' }}>Range: </span>{equipmentInformation.equipmentRange} {equipmentInformation.equipmentUnits}</p>
                        <p><span style={{ fontWeight: 'bold' }}>Description: </span>{equipmentInformation.equipmentDescription}</p>
                        <p><span style={{ fontWeight: 'bold' }}>Loacation: </span>{equipmentInformation.equipmentLocation}</p>
                    </>
                )}
            </Col>
        </Row>
    </Container>
  )
}

export default SelectEquipment
