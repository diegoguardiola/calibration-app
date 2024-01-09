import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useAuthContext } from '../hooks/useAuthContext';

import { Card,  Form, Container, Row, Col, Table } from 'react-bootstrap';

const ReportModal = React.memo(({ show, onHide, reportDetails, onEdit }) => {

    const {user} = useAuthContext()
    const [isEditing, setIsEditing] = useState(false);
    const [editedReport, settEditedReport] = useState(reportDetails)
    const [editedResults, setEditedResults] = useState(reportDetails.results);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    useEffect(() => {
        setEditedResults(reportDetails.results);
    }, []);

    const handleCancelEditClick = () => {
        console.log(editedResults)
        setIsEditing(false);
        // Reset the editedResults to the original reportDetails.results
        setEditedResults(reportDetails.results);
    };

    const handleSaveClick = async (reportId) => {
        // Call the fetch function here with editedResults and update the data
        // Then set isEditing to false
        const updatedReport = { ...editedReport, results: editedResults };
        delete updatedReport._id;
        console.log(updatedReport)
        // Example fetch call:
        const response = await fetch(`http://localhost:5000/report/update/${reportId}`, {
            method: 'PATCH',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}` 
            },
           body: JSON.stringify(updatedReport),
         })
         const json = await response.json();
         if (response.ok) {
            console.log('Saved:', json);
            setIsEditing(false);
         }
      };

    return (
        <Modal show={show} onHide={onHide} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
            Report Details
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <h4>Equipment Details</h4>
            <div>
                <p>
                    <span style={{ fontWeight: 'bold' }}>Equipment Name:</span> {reportDetails.equipment.equipmentName}
                </p>
                <p>
                    <span style={{ fontWeight: 'bold' }}>Equipment Id:</span> {reportDetails.equipment.equipmentID}
                </p>
                <p>
                    <span style={{ fontWeight: 'bold' }}>Equipment Manufacturer:</span> {reportDetails.equipment.equipmentManufacturer}
                </p>
                <p>
                    <span style={{ fontWeight: 'bold' }}>Equipment Model Number:</span> {reportDetails.equipment.equipmentModelNumber}
                </p>
                <p>
                    <span style={{ fontWeight: 'bold' }}>Equipment Serial Number:</span>{reportDetails.equipment.equipmentSerialNumber}
                </p>
                <p>
                    <span style={{ fontWeight: 'bold' }}>Equipment Tange:</span> {reportDetails.equipment.equipmentRange} {reportDetails.equipment.equipmentUnits}
                </p>
                <p>
                    <span style={{ fontWeight: 'bold' }}>Equipment Description:</span> {reportDetails.equipment.equipmentDescription}
                </p>
                <p>
                    <span style={{ fontWeight: 'bold' }}>Equipment Loaction:</span> {reportDetails.equipment.equipmentLocation}
                </p>
            </div>
            <h4>Instrument Details</h4>
            <div>
                <p>
                    <span style={{ fontWeight: 'bold' }}>Instrument Name:</span> {reportDetails.instrument.instrumentDescription}
                </p>
                <p>
                    <span style={{ fontWeight: 'bold' }}>Instrument Manufacturer:</span> {reportDetails.instrument.instrumentManufacturer}
                </p>
                <p>
                    <span style={{ fontWeight: 'bold' }}>Instrument Model Number:</span> {reportDetails.instrument.instrumentModelNumber}
                </p>
            </div>
            <h4>Calibration Results</h4>
            <div>
                {!isEditing ? (
                    <>
                        <p>
                            <span style={{ fontWeight: 'bold' }}>Service Reason:</span> {reportDetails.results.serviceReason}
                        </p>
                        <p>
                            <span style={{ fontWeight: 'bold' }}>Interval (months):</span> {reportDetails.results.intervalMonth}
                        </p>
                        {reportDetails.results.tests.map((test, index) => (
                            <div key={index}>
                                <h5>{test.type} - {test.method} in {test.unit}</h5>
                                <Table size="sm">
                                    <thead>
                                        <tr>
                                            <th>Nominal</th>
                                            <th>As Found</th>
                                            <th>As Left</th>
                                            <th>Result</th>
                                            <th>Min</th>
                                            <th>Max</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {test.testPoints.map((testPoint, pointIndex) => (
                                            <tr key={pointIndex}>
                                                <td>{testPoint.nominal}</td>
                                                <td>{testPoint.asFound}</td>
                                                <td>{testPoint.asLeft}</td>
                                                <td>{testPoint.result}</td>
                                                <td>{testPoint.min}</td>
                                                <td>{testPoint.max}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </div>
                        ))}
                        <p>
                            <span style={{ fontWeight: 'bold' }}>Comments:</span> {reportDetails.results.comments}
                        </p>
                    </>
                ) : (
                    <Container>
                        <Form>
                            {/* Render input fields for editing here */}
                            <Row>
                                <Form.Group className="mb-3">
                                    <Col>
                                        <Form.Label>Service Reason</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={editedResults.serviceReason}
                                            onChange={(e) => setEditedResults({ ...editedResults, serviceReason: e.target.value })}
                                        />
                                        <Form.Label>Calibration Date</Form.Label>
                                        <Form.Control
                                            type="date"
                                            value={editedResults.calDate}
                                            onChange={(e) => setEditedResults({ ...editedResults, calDate: e.target.value })}
                                        />
                                        <Form.Label>Interval (months)</Form.Label>
                                        <Form.Control
                                            type="number"
                                            value={editedResults.intervalMonth}
                                            onChange={(e) => setEditedResults({ ...editedResults, intervalMonth: e.target.value })}
                                        />
                                    </Col>
                                </Form.Group>
                            </Row>

                            {editedResults.tests.map((test, index) => (
                                <div key={index}>
                                    <h5>{test.type} - {test.method} in {test.unit}</h5>
                                    <Table size="sm">
                                        {/* Render edit fields for test here */}
                                        <thead>
                                            <tr>
                                                <th>Nominal</th>
                                                <th>As Found</th>
                                                <th>As Left</th>
                                                <th>Result</th>
                                                <th>Min</th>
                                                <th>Max</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {test.testPoints.map((testPoint, pointIndex) => (
                                                <tr key={pointIndex}>
                                                <td>
                                                    <Form.Control
                                                    type="text"
                                                    value={testPoint.nominal}
                                                    onChange={(e) => {
                                                        // create a deep copy of the tests
                                                        const updatedTests = [...editedResults.tests];
                                                        // update the specific test point
                                                        updatedTests[index].testPoints[pointIndex].nominal = e.target.value;
                                                        // set the new tests array into the edited results
                                                        setEditedResults({ ...editedResults, tests: updatedTests });
                                                    }}
                                                    />
                                                </td>
                                                <td>
                                                    <Form.Control
                                                    type="text"
                                                    value={testPoint.asFound}
                                                    onChange={(e) => {
                                                        const updatedTests = [...editedResults.tests];
                                                        updatedTests[index].testPoints[pointIndex].asFound = e.target.value;
                                                        setEditedResults({ ...editedResults, tests: updatedTests });
                                                    }}
                                                    />
                                                </td>
                                                <td>
                                                    <Form.Control
                                                    type="text"
                                                    value={testPoint.asLeft}
                                                    onChange={(e) => {
                                                        const updatedTests = [...editedResults.tests];
                                                        updatedTests[index].testPoints[pointIndex].asLeft = e.target.value;
                                                        setEditedResults({ ...editedResults, tests: updatedTests });
                                                    }}
                                                    />
                                                </td>
                                                <td>
                                                    <Form.Control
                                                    type="text"
                                                    value={testPoint.result}
                                                    onChange={(e) => {
                                                        const updatedTests = [...editedResults.tests];
                                                        updatedTests[index].testPoints[pointIndex].result = e.target.value;
                                                        setEditedResults({ ...editedResults, tests: updatedTests });
                                                    }}
                                                    />
                                                </td>
                                                <td>
                                                    <Form.Control
                                                    type="text"
                                                    value={testPoint.min}
                                                    onChange={(e) => {
                                                        const updatedTests = [...editedResults.tests];
                                                        updatedTests[index].testPoints[pointIndex].min = e.target.value;
                                                        setEditedResults({ ...editedResults, tests: updatedTests });
                                                    }}
                                                    />
                                                </td>
                                                <td>
                                                    <Form.Control
                                                    type="text"
                                                    value={testPoint.max}
                                                    onChange={(e) => {
                                                        const updatedTests = [...editedResults.tests];
                                                        updatedTests[index].testPoints[pointIndex].max = e.target.value;
                                                        setEditedResults({ ...editedResults, tests: updatedTests });
                                                    }}
                                                    />
                                                </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </div>
                            ))}
                            <Form.Group className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                type="text"
                                value={editedResults.comments}
                                onChange={(e) => setEditedResults({ ...editedResults, comments: e.target.value })}
                                />
                            </Form.Group>
                           
                            <Button onClick={() => handleSaveClick(reportDetails._id)}>Save</Button>
                            <Button onClick={handleCancelEditClick}>Cancel</Button>
                        </Form>
                    </Container>
                )}
            </div>
        </Modal.Body>
        <Modal.Footer>
            {!isEditing ? (
                <Button onClick={handleEditClick}>Edit</Button>
            ) : null}
                <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
        </Modal>
    );
});

export default ReportModal;
