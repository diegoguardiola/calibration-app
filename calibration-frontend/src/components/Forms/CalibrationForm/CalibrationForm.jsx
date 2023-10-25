import { useState, useEffect } from "react";

import SelectEquipment from "./SelectEquipment";
import SelectInstrument from "./SelectInstrument";
import Results from "./Results";

export const CalibrationForm = () => {
   
    const [selectedEquipmentID, setSelectedEquipmentID] = useState(null);
    //const [equipmentInformation, setEquipmentInformation] = useState({
        // initial state values
    //});
    // In CalibrationForm
    //const [instrumentInformation, setInstrumentInformation] = useState({
        // initial state values
    //});
    //const [serviceReason, setServiceReason] = useState('');


    /*const combinedData = {
        equipment: {
            ...equipmentInformation
        },
        instrument: {
            ...instrumentInformation
        },
        results: {
            serviceReason,
            tests,
            asFound,
            asLeft,
            comments,
            calibrationTech,
            calDate,
            intervalYear,
            intervalMonth,
            temp,
            humidity
        }
    };*/
    // Then, you can use a function to POST this data to your backend.
    

    return (
                <div className="row">    
                    <div className="col-md-4">
                        <div className='Calibration_Information'>
                            <SelectEquipment 
                                //equipmentInformation={equipmentInformation} 
                                //setEquipmentInformation={setEquipmentInformation}
                                onEquipmentSelect={setSelectedEquipmentID}
                            />
                            <SelectInstrument 
                                //instrumentInformation={instrumentInformation} 
                                //setInstrumentInformation={setInstrumentInformation}
                            />
                            <Results equipmentID={selectedEquipmentID} />
                        </div>
                    </div>
                </div>
      );
    };