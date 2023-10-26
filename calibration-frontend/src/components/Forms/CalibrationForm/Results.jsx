import { useState, useEffect } from "react";
import { useAuthContext } from "../../../hooks/useAuthContext";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Results({equipmentID, resultInformation, setResultInformation}) {
    const {user} = useAuthContext()

    const TestPoint = ({ point, updateTestPoint }) => (
            <Row>
                <Col>
                    <label>Nominal</label>
                    <input type="number" 
                        value={point.nominal} 
                        onChange={e => updateTestPoint('nominal', e.target.value)} 
                    />
                </Col>
                <Col>
                    <label>As Found</label>
                    <input 
                        type="number" 
                        value={point.asFound} 
                        onChange={e => updateTestPoint('asFound', e.target.value)} 
                    />
                </Col>
                <Col>
                    <label>As Left</label>
                    <input 
                        type="number" 
                        value={point.asLeft} 
                        onChange={e => updateTestPoint('asLeft', e.target.value)} 
                    />
                </Col>
                <Col>
                    <label>Result</label>
                    <input 
                        type="text" 
                        value={point.result} 
                        onChange={e => updateTestPoint('result', e.target.value)} 
                    />
                </Col>
                <Col>
                    <label>Min</label>
                    <input 
                        type="number" 
                        value={point.min} 
                        onChange={e => updateTestPoint('min', e.target.value)} 
                    />
                </Col>
                <Col>
                    <label>Max</label>
                    <input 
                        type="number" 
                        value={point.max} 
                        onChange={e => updateTestPoint('max', e.target.value)} 
                    />
                </Col>
            </Row>
    );
    
    const Test = ({ test, updateTest, index }) => (
        <Container fluid>
            <Col>
                <Row>
                    <Col>
                        <label>Type</label>
                        <input type="text" className="form-control" required value={test.type} onChange={e => updateTest(index, 'type', e.target.value)} />
                    </Col>
                    <Col>
                        <label>Method</label>
                        <input type="text" className="form-control" required value={test.method} onChange={e => updateTest(index, 'method', e.target.value)} />
                    </Col>
                    <Col>
                        <label>Unit</label>
                        <input type="text" className="form-control" required value={test.unit} onChange={e => updateTest(index, 'unit', e.target.value)} />
                    </Col>
                </Row>
            
                {test.testPoints && test.testPoints.map((point, pIndex) => (
                    <TestPoint 
                        key={pIndex} 
                        point={point} 
                        updateTestPoint={(field, value) => updateTest(index, 'testPoints', pIndex, field, value)} 
                    />
                ))}
                <button className="btn btn-primary mt-2" onClick={() => updateTest(index, 'addTestPoint')}>Add Test Point</button>
            </Col>
        </Container>
    );
    
    


    const updateTest = (index, field, ...rest) => {
        const updatedTests = [...resultInformation.tests];
        if (field === 'addTestPoint') {
            updatedTests[index].testPoints.push({ nominal: 0, asFound: 0, asLeft: 0, result: '', min: 0, max: 0 });
        } else if (field === 'testPoints') {
            const [pIndex, pField, value] = rest;
            updatedTests[index].testPoints[pIndex][pField] = value;
        } else {
            updatedTests[index][field] = rest[0];
        }
        setResultInformation(prevState => ({ ...prevState, tests: updatedTests }));
    };
    

    useEffect(() => {
        if (user && user.firstName && user.lastName) {
            setResultInformation(prevState => ({
                ...prevState,
                calibrationTech: `${user.firstName} ${user.lastName}`
            }));
        }
    }, [user]);
    
      

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const data = resultInformation
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
                    onChange={(e) => setResultInformation({ 
                        ...resultInformation, 
                        serviceReason: 
                        e.target.value})} 
                    value={resultInformation.serviceReason} 
                    className="form-control"
                />
            </div>
            <div className="row">
                <label>As Found</label>
                <input 
                    type="text" 
                    onChange={(e) => setResultInformation({ 
                        ...resultInformation, 
                        asFound: 
                        e.target.value})} 
                    value={resultInformation.asFound} 
                    className="form-control"
                />
            </div>
            <div className="row">
                <label>As Left</label>
                <input 
                    type="text" 
                    onChange={(e) => setResultInformation({ 
                        ...resultInformation, 
                        asLeft: 
                        e.target.value})} 
                    value={resultInformation.asLeft} 
                    className="form-control"
                />
            </div>
            <div className="row">
                <label>Comments</label>
                <input 
                    type="text" 
                    onChange={(e) => setResultInformation({ 
                        ...resultInformation, 
                        comments: 
                        e.target.value})} 
                    value={resultInformation.comments} 
                    className="form-control"
                />
            </div>
            <div className="row">
                <label>Calibration Tech</label>
                <p>{resultInformation.calibrationTech}</p>
            </div>
            <div className="row">
                <label>Calibration Date</label>
                <input 
                    type="text" 
                    onChange={(e) => setResultInformation({ 
                        ...resultInformation, 
                        calDate: 
                        e.target.value})} 
                    value={resultInformation.calDate} 
                    className="form-control"
                />
            </div>
            <div className="row">
                <label>Interval Year</label>
                <input 
                    type="text" 
                    onChange={(e) => setResultInformation({ 
                        ...resultInformation, 
                        intervalYear: 
                        e.target.value})} 
                    value={resultInformation.intervalYear} 
                    className="form-control"
                />
            </div>
            <div className="row">
                <label>Interval Month</label>
                <input 
                    type="text" 
                    onChange={(e) => setResultInformation({ 
                        ...resultInformation, 
                        intervalMonth: 
                        e.target.value})} 
                    value={resultInformation.intervalMonth} 
                    className="form-control"
                />
            </div>
            <div className="row">
                <label>Temperature</label>
                <input 
                    type="text" 
                    onChange={(e) => setResultInformation({ 
                        ...resultInformation, 
                        temp: 
                        e.target.value})} 
                    value={resultInformation.temp} 
                    className="form-control"
                />
            </div>
            <div className="row">
                <label>Humidity</label>
                <input 
                    type="text" 
                    onChange={(e) => setResultInformation({ 
                        ...resultInformation, 
                        humidity: 
                        e.target.value})} 
                    value={resultInformation.humidity} 
                    className="form-control"
                />
            </div>
            <div className="container mt-3">
                {resultInformation.tests.map((test, index) => (
                    <Test key={index} test={test} updateTest={updateTest} index={index} />
                ))}
                <button 
                    className="btn btn-success mt-3" 
                    onClick={() => setResultInformation(prevState => ({
                        ...prevState, tests: [...prevState.tests, { type: '', method: '', unit: '', testPoints: [] }] 
                    }))}>
                        Add Test
                </button>
            </div>

            <button type="submit" className="btn btn-primary mt-3">Submit</button>
        </form>
    </div>
  )
}

export default Results
