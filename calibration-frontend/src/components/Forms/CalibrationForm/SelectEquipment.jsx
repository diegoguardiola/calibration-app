import { useState, useEffect } from "react";

function SelectEquipment() {

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
        })
        .catch(error => console.error('Error fetching data:', error));
    };

//Set Equipment Information Based Off What Is Selected From The List
    const [equipmentInformation, setEquipmentInformation] = useState({
        equipmentName: '', 
        equipmentID: '',
        equipmentManufacturer: '',
        equipmentModelNumber: '',
        equipmentSerialNumber:'',
        equipmentRange: '',
        equipmentUnits: '',
        equipmentDescription: '',
        equipmentLocation: '',
    });   

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
    };

  return (
    <div className="container">
        <div className="row">
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
            <br></br>
            <h2>Select Equipment</h2>
            <select onChange={handleEquipmentChange}>
                <option value="" disabled selected>Select equipment</option>
                {fetchedData.equipmentList && fetchedData.equipmentList.map(item => (
                    <option key={item._id} value={item._id}>
                        {item.equipmentName}
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
        </div>
    </div>
  )
}

export default SelectEquipment
