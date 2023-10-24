import { useState, useEffect } from "react";
import { useCalibrationContext } from "../../../hooks/useCalibrationContext";
import { useAuthContext } from "../../../hooks/useAuthContext";
import SelectEquipment from "./SelectEquipment";
import SelectInstrument from "./SelectInstrument";
import Results from "./Results";

export const CalibrationForm = () => {
    const {dispatch} = useCalibrationContext()
    const {user} = useAuthContext()

    const handleSubmit = async (e) => {
        e.preventDefault()
    
  }
   
    
    return (
            <form className="container" onSubmit={handleSubmit}>
                <div className="row">    
                    <div className="col-md-4">
                        <div className='Calibration_Information'>
                            <SelectEquipment />
                            <SelectInstrument />
                            <Results />
                        </div>
                    </div>
                </div>
                    
                <br />
            </form>
      );
    };