import { useState, useEffect } from "react";

import SelectEquipment from "./SelectEquipment";
import SelectInstrument from "./SelectInstrument";
import Results from "./Results";

export const CalibrationForm = () => {
   
    const [selectedEquipmentID, setSelectedEquipmentID] = useState(null);

    return (
                <div className="row">    
                    <div className="col-md-4">
                        <div className='Calibration_Information'>
                            <SelectEquipment onEquipmentSelect={setSelectedEquipmentID} /> 
                            <SelectInstrument />
                            <Results equipmentID={selectedEquipmentID} />
                        </div>
                    </div>
                </div>
      );
    };