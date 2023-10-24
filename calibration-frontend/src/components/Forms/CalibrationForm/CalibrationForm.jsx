import { useState, useEffect } from "react";
import { useCalibrationContext } from "../../../hooks/useCalibrationContext";
import { useAuthContext } from "../../../hooks/useAuthContext";
import SelectEquipment from "./SelectEquipment";
import SelectInstrument from "./SelectInstrument";
import Results from "./Results";

export const CalibrationForm = () => {
    const {dispatch} = useCalibrationContext()
    const {user} = useAuthContext()


    const [results, setResults] = useState({ 
        setpoint1: '',
        setpoint2: '',
        setpoint3: '',
        asLeft1: '',
        asLeft2: '',
        asLeft3: '',
        asFound1: '',
        asFound2: '',
        asFound3: '',
        comments: '',
        dateOfCalibration: '',
        calibrationDueDate: '',
        calibrationTech: '',
    })
    const [years, setYears] = useState('');
    const [months, setMonths] = useState('');
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])  
    

    useEffect(() => {
        let newResults = {};
    
        // Calibration Due Date Calculation
        if (results.dateOfCalibration) { 
            const dateOfCalibration = new Date(results.dateOfCalibration);
            const dueDate = new Date(dateOfCalibration);
            dueDate.setFullYear(dueDate.getFullYear() + parseInt(years || 0));
            dueDate.setMonth(dueDate.getMonth() + parseInt(months || 0));
            newResults.calibrationDueDate = dueDate.toISOString();
        }
    
        // Calibration Technician Assignment
        if(user && user.firstName && user.lastName){
            newResults.calibrationTech = `${user.firstName} ${user.lastName}`;
        }
    
        // Update results
        setResults(prevResults => ({
            ...prevResults,
            ...newResults
        }));
    }, [years, months, results.dateOfCalibration, user]);
    
    const handleSubmit = async (e) => {
        e.preventDefault()
    
        if (!user) {
          setError('You must be logged in')
          return
        }
    
        const data = {
            ...results
          };
    
    
        const response = await fetch('http://localhost:5000/c1_1/calibration', {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
          }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
          }
        // Reset the form
        if (response.ok) {
        setResults({ 
            setpoint1: '',
            setpoint2: '',
            setpoint3: '',
            asLeft1: '',
            asLeft2: '',
            asLeft3: '',
            asFound1: '',
            asFound2: '',
            asFound3: '',
            comments: '',
            dateOfCalibration: '',
            calibrationDueDate: '',
            calibrationTech: '',
        })

        setError(null)
        setEmptyFields([])
        dispatch({type: 'CREATE_CALIBRATION', payload: json})
        }
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
                <div className="row"> 
                    <div className='Result_Information'>
                        <div className="row">
                            <div className="col-md-2">
                                <label>Setpoint 1:</label>
                                <input
                                type="text"
                                value={results.setpoint1}
                                onChange={(e) => setResults({ ...results, setpoint1: e.target.value })}
                                className="form-control"
                                />
                            </div>
                            <div className="col-md-2">
                                <label>As Left 1:</label>
                                <input
                                type="text"
                                value={results.asLeft1}
                                onChange={(e) => setResults({ ...results, asLeft1: e.target.value })}
                                className="form-control"
                                />
                            </div>
                            <div className="col-md-2">
                                <label>As Found 1:</label>
                                <input
                                type="text"
                                value={results.asFound1}
                                onChange={(e) => setResults({ ...results, asFound1: e.target.value })}
                                className="form-control"
                                />
                            </div>
                        </div>  
                        <div className="row">
                            <div className="col-md-2">
                                <label>Setpoint 2:</label>
                                <input
                                type="text"
                                value={results.setpoint2}
                                onChange={(e) => setResults({ ...results, setpoint2: e.target.value })}
                                className="form-control"
                                />
                            </div>
                            <div className="col-md-2">
                                <label>As Found 2:</label>
                                <input
                                type="text"
                                value={results.asFound2}
                                onChange={(e) => setResults({ ...results, asFound2: e.target.value })}
                                className="form-control"
                                />
                            </div>
                            <div className="col-md-2">
                                <label>As Left 2:</label>
                                <input
                                type="text"
                                value={results.asLeft2}
                                onChange={(e) => setResults({ ...results, asLeft2: e.target.value })}
                                className="form-control"
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-2">
                                <label>Setpoint 3:</label>
                                <input
                                type="text"
                                value={results.setpoint3}
                                onChange={(e) => setResults({ ...results, setpoint3: e.target.value })}
                                className="form-control"
                                />
                            </div>
                            <div className="col-md-2">
                                <label>As Found 3:</label>
                                <input
                                type="text"
                                value={results.asFound3}
                                onChange={(e) => setResults({ ...results, asFound3: e.target.value })}
                                className="form-control"
                                /> 
                            </div>
                            <div className="col-md-2">
                                <label>As Left 3:</label>
                                <input
                                type="text"
                                value={results.asLeft3}
                                onChange={(e) => setResults({ ...results, asLeft3: e.target.value })}
                                className="form-control"
                                />
                            </div>
                        </div> 
                        <div className="row">
                            <div className="col-md-8">
                                <label>Comments:</label>
                                <textarea
                                type="text"
                                value={results.comments}
                                onChange={(e) => setResults({ ...results, comments: e.target.value })}
                                className="form-control"
                                />
                            </div>
                        </div> 
                        <div className="row">
                            <div className="col-md-3">
                                <label>Date of Calibration:</label>
                                <input
                                    type="date"
                                    value={results.dateOfCalibration}
                                    onChange={(e) => setResults({ ...results, dateOfCalibration: e.target.value })}
                                    className="form-control"
                                />
                            </div>
                            <div className="col-md-2">
                                <label>Years</label>
                                <input
                                    type="number"
                                    value={years}
                                    onChange={(e) => setYears(e.target.value)}
                                    className="form-control"
                                />
                            </div>
                            <div className="col-md-2">
                                <label>Months</label>
                                <input
                                    type="number"
                                    value={months}
                                    onChange={(e) => setMonths(e.target.value)}
                                    className="form-control"
                                />
                            </div>
                        </div> 
                    </div>
                </div>
                    
                <br />
            <button type="submit" className="btn btn-primary">Submit</button>
            {error && <div className="error">{error}</div>}
            </form>
      );
    };