import { useState, useEffect } from "react";
import { useAuthContext } from "../../../hooks/useAuthContext";

function Results(props) {
    const {user} = useAuthContext()

    const equipmentID = props.equipmentID;

    const [serviceReason, setServiceReason] = useState('');
    const [asFound, setAsFound] = useState('');
    const [asLeft, setAsLeft] = useState('');
    const [comments, setComments] = useState('');
    const [calibrationTech, setCalibrationTech] = useState('');
    const [calDate, setCalDate] = useState('');
    const [intervalYear, setIntervalYear] = useState('');
    const [intervalMonth, setIntervalMonth] = useState('');
    const [temp, setTemp] = useState('');
    const [humidity, setHumidity] = useState('');

    const TestPoint = ({ point, updateTestPoint }) => (
        <div className="form-row">
            <div className="col">
                <label>Nominal</label>
                <input type="number" 
                    className="form-control" 
                    value={point.nominal} 
                    onChange={e => updateTestPoint('nominal', e.target.value)} 
                />
            </div>
            <div className="col">
                <label>As Found</label>
                <input 
                    type="number" 
                    className="form-control" 
                    value={point.asFound} 
                    onChange={e => updateTestPoint('asFound', e.target.value)} 
                />
            </div>
            <div className="col">
                <label>As Left</label>
                <input 
                    type="number" 
                    className="form-control" 
                    value={point.asLeft} 
                    onChange={e => updateTestPoint('asLeft', e.target.value)} 
                />
            </div>
            <div className="col">
                <label>Result</label>
                <input 
                    type="text" 
                    className="form-control" 
                    value={point.result} 
                    onChange={e => updateTestPoint('result', e.target.value)} 
                />
            </div>
            <div className="col">
                <label>Min</label>
                <input 
                    type="number" 
                    className="form-control" 
                    value={point.min} 
                    onChange={e => updateTestPoint('min', e.target.value)} 
                />
            </div>
            <div className="col">
                <label>Max</label>
                <input 
                    type="number" 
                    className="form-control" 
                    value={point.max} 
                    onChange={e => updateTestPoint('max', e.target.value)} 
                />
            </div>
        </div>
    );
    
    const Test = ({ test, updateTest, index }) => (
        <div className="mb-3">
            <div className="form-row">
                <div className="col">
                    <label>Type</label>
                    <input type="text" className="form-control" required value={test.type} onChange={e => updateTest(index, 'type', e.target.value)} />
                </div>
                <div className="col">
                    <label>Method</label>
                    <input type="text" className="form-control" required value={test.method} onChange={e => updateTest(index, 'method', e.target.value)} />
                </div>
                <div className="col">
                    <label>Unit</label>
                    <input type="text" className="form-control" required value={test.unit} onChange={e => updateTest(index, 'unit', e.target.value)} />
                </div>
            </div>
            {test.testPoints.map((point, pIndex) => (
                <TestPoint
                    key={pIndex}
                    point={point}
                    updateTestPoint={(field, value) => updateTest(index, 'testPoints', pIndex, field, value)}
                />
            ))}
            <button className="btn btn-primary mt-2" onClick={() => updateTest(index, 'addTestPoint')}>Add Test Point</button>
        </div>
    );

    const [tests, setTests] = useState([]);

    const updateTest = (index, field, ...rest) => {
        const updatedTests = [...tests];
        if (field === 'addTestPoint') {
            updatedTests[index].testPoints.push({ nominal: 0, asFound: 0, asLeft: 0, result: '', min: 0, max: 0 });
        } else if (field === 'testPoints') {
            const [pIndex, pField, value] = rest;
            updatedTests[index].testPoints[pIndex][pField] = value;
        } else {
            updatedTests[index][field] = rest[0];
        }
        setTests(updatedTests);
    };

    useEffect(() => {
        if (user && user.firstName && user.lastName) {
          setCalibrationTech(`${user.firstName} ${user.lastName}`);
        }
      });
      

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const data = {
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
        };
        console.log(equipmentID)
    
        try {
            const response = await fetch(`http://localhost:5000/c1_1/cal/${equipmentID}/add-calibration`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
    
            const responseData = await response.json();
    
            if (response.ok) {
                console.log('Data submitted successfully:', responseData);
                // Here you can also reset the state or navigate the user to another page, etc.
            } else {
                console.error('Failed to submit data:', responseData);
            }
        } catch (error) {
            console.error('There was an error submitting the data:', error);
        }
    };

  return (
    <div>
        <form className="container" onSubmit={handleSubmit}>
            <div className="row">
                <label>Reason For Service</label>
                <input 
                    type="text" 
                    onChange={(e) => setServiceReason(e.target.value)} 
                    value={serviceReason} 
                />
            </div>
            <div className="row">
                <label>As Found</label>
                <input 
                    type="text" 
                    onChange={(e) => setAsFound(e.target.value)} 
                    value={asFound} 
                />
            </div>
            <div className="row">
                <label>As Left</label>
                <input 
                    type="text" 
                    onChange={(e) => setAsLeft(e.target.value)} 
                    value={asLeft} 
                />
            </div>
            <div className="row">
                <label>Comments</label>
                <input 
                    type="text" 
                    onChange={(e) => setComments(e.target.value)} 
                    value={comments} 
                />
            </div>
            <div className="row">
                <label>Calibration Tech</label>
                <p>{calibrationTech}</p>
            </div>
            <div className="row">
                <label>Calibration Date</label>
                <input 
                    type="text" 
                    onChange={(e) => setCalDate(e.target.value)} 
                    value={calDate} 
                />
            </div>
            <div className="row">
                <label>Interval Year</label>
                <input 
                    type="text" 
                    onChange={(e) => setIntervalYear(e.target.value)} 
                    value={intervalYear} 
                />
            </div>
            <div className="row">
                <label>Interval Month</label>
                <input 
                    type="text" 
                    onChange={(e) => setIntervalMonth(e.target.value)} 
                    value={intervalMonth} 
                />
            </div>
            <div className="row">
                <label>Temp</label>
                <input 
                    type="text" 
                    onChange={(e) => setTemp(e.target.value)} 
                    value={temp} 
                />
            </div>
            <div className="row">
                <label>Humidity</label>
                <input 
                    type="text" 
                    onChange={(e) => setHumidity(e.target.value)} 
                    value={humidity} 
                />
            </div>
            <div className="container mt-3">
                {tests.map((test, index) => (
                    <Test key={index} test={test} updateTest={updateTest} index={index} />
                ))}
                <button className="btn btn-success mt-3" onClick={() => setTests([...tests, { type: '', method: '', unit: '', testPoints: [] }])}>Add Test</button>
            </div>
            <button type="submit" className="btn btn-primary mt-3">Submit</button>
        </form>
    </div>
  )
}

export default Results
