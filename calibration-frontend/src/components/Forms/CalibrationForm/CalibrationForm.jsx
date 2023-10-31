import { useState, useEffect } from "react";
import { useCalibrationContext } from "../../../hooks/useCalibrationContext";
import { useAuthContext } from "../../../hooks/useAuthContext";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import SelectEquipment from "./SelectEquipment";
import SelectInstrument from "./SelectInstrument";
import Results from "./Results";

export const CalibrationForm = () => {
    const {dispatch} = useCalibrationContext()
    const {user} = useAuthContext()

    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])
   
    const [selectedEquipmentID, setSelectedEquipmentID] = useState(null);

    const [clientData, setClientData] = useState({
        firstName: '', 
        lastName: '', 
        company: '',
        address: '',
        phone: '',
        email: '', 
    })
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
    
    const [resultInformation, setResultInformation] = useState({
        serviceReason: '',
        tests: [], 
        asFound: '',
        asLeft: '',
        comments: '',
        calibrationTech: '',
        calDate: '',
        intervalYear: '',
        intervalMonth: '',
        temp: '',
        humidity: ''
    })


    async function handleSubmit(e) {
        e.preventDefault();
        if (!user) {
            setError('You must be logged in');
            return;
        }
    
        const combinedData = {
            client: clientData,
            equipment: equipmentInformation,
            instrument: instrumentInformation,
            results: resultInformation,
        };

        console.log(user)
    
        const response = await fetch('http://localhost:5000/c1_1/report/create', {
            method: 'POST',
            body: JSON.stringify(combinedData),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
            
        });
        const json = await response.json();
    
        if (!response.ok) {
            setError(json.error);
            setEmptyFields(json.emptyFields);
        }
        setError(null);
        setEmptyFields([]);
        console.log('new calibration added', json);
        dispatch({type: 'CREATE_CALIBRATION', payload: json});
    }
    
    

    return (
        <Container>    
            <Row>
                <Col>
                    <SelectEquipment 
                        equipmentInformation={equipmentInformation} 
                        setEquipmentInformation={setEquipmentInformation}
                        onEquipmentSelect={setSelectedEquipmentID}
                        setClientData={setClientData}
                        clientData={clientData}
                    />
                </Col>
                <Col>
                    <SelectInstrument 
                        instrumentInformation={instrumentInformation} 
                        setInstrumentInformation={setInstrumentInformation}
                    />
                </Col>
            </Row>
            <Results 
                    equipmentID={selectedEquipmentID}
                    resultInformation={resultInformation}
                    setResultInformation={setResultInformation}
            />
            {/* Adding the button here */}
            <button onClick={handleSubmit}>Submit</button>
        </Container>
    );
    
    }