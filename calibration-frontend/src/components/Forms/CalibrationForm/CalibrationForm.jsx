import { useState, useEffect } from "react";
import SelectEquipment from "./SelectEquipment";
import SelectInstrument from "./SelectInstrument";
import Results from "./Results";

export const CalibrationForm = () => {
   
    
    return (
                <div className="row">    
                    <div className="col-md-4">
                        <div className='Calibration_Information'>
                            <SelectEquipment />
                            <SelectInstrument />
                            <Results />
                        </div>
                    </div>
                </div>
      );
    };