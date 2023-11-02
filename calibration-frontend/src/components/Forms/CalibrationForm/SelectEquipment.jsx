import { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function SelectEquipment({ clientData, setClientData, equipmentInformation, setEquipmentInformation, onEquipmentSelect }) {

    // Display Equipment Based Information Based Off What  COmpany Is Selected
    const [companies, setCompanies] = useState([]);
    const [userID, setUserID] = useState(null);
    const [fetchedData, setFetchedData] = useState([]);


    useEffect(() => {
        // Fetch the data from the endpoint
        fetch('http://localhost:5000/c1_1/user/get-user-company-id') // Replace with the actual endpoint path
        .then(response => response.json())
        .then(data => setCompanies(data))
        .catch(error => console.error('Error fetching companies:', error));
    }, []);
    

    const handleChange = (event) => {
        const selectedUserID = event.target.value;
        setUserID(selectedUserID);
    
        fetch(`http://localhost:5000/c1_1/user/${selectedUserID}/equipment`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setFetchedData(data);
            
    
            // Make an additional fetch call
            return fetch(`http://localhost:5000/c1_1/user/${selectedUserID}/client-info`);
        })
        .then(response => response.json())
        .then(additionalData => {
            console.log(additionalData)
            setClientData(additionalData);
            // Do something with the additional data
        })
        .catch(error => console.error('Error fetching data:', error));
    };
    


    const handleEquipmentChange = (event) => {
        const selectedEquipment = fetchedData.equipmentList.find(item => item._id === event.target.value);
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
        onEquipmentSelect(selectedEquipment._id);
    };

  return (
    <Container>
        <Row>
            <Col>
                <h2>Select Company</h2>
                <select onChange={handleChange}>
                    <option value="" disabled selected>Select a company</option>
                    {companies.map(company => (
                    <option key={company._id} value={company._id}>
                        {company.company}
                    </option>
                    ))}
                </select>
                {userID && <p>Selected User ID: {userID}</p>}
            </Col>
            <Col>
                <h2>Select Equipment</h2>
                <select onChange={handleEquipmentChange}>
                    <option value="" disabled selected>Select equipment</option>
                    {fetchedData.equipmentList && fetchedData.equipmentList.map(item => (
                        <option key={item._id} value={item._id}>
                            {`${item.equipmentName}:${item.equipmentID}`}
                        </option>
                    ))}
                </select>
                <p>{equipmentInformation.equipmentName}</p>
                <p>{equipmentInformation.equipmentID}</p>
                <p>{equipmentInformation.equipmentManufacturer}</p>
                <p>{equipmentInformation.equipmentModelNumber}</p>
                <p>{equipmentInformation.equipmentSerialNumber}</p>
                <p>{equipmentInformation.equipmentRange}</p>
                <p>{equipmentInformation.equipmentUnits}</p>
                <p>{equipmentInformation.equipmentDescription}</p>
                <p>{equipmentInformation.equipmentLocation}</p>
            </Col>
        </Row>
    </Container>
  )
}

export default SelectEquipment
