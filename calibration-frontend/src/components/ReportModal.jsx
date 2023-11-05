import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useAuthContext } from '../hooks/useAuthContext';

const ReportModal = ({ show, onHide, reportDetails, onEdit }) => {

    const {user} = useAuthContext()
    const [isEditing, setIsEditing] = useState(false);
    const [editedResults, setEditedResults] = useState(reportDetails.results);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancelEditClick = () => {
        setIsEditing(false);
        // Reset the editedResults to the original reportDetails.results
        setEditedResults(reportDetails.results);
    };

    const handleSaveClick = (reportId) => {
        // Call the fetch function here with editedResults and update the data
        // Then set isEditing to false
        console.log(reportId)
        // Example fetch call:
         fetch(`http://localhost:5000/c1_1/report/update/${reportId}`, {
           method: 'PATCH',
           body: JSON.stringify(editedResults),
           headers: { 'Authorization': `Bearer ${user.token}` },
         })
           .then((response) => response.json())
           .then((data) => {
             console.log('Saved:', data);
           })
           .catch((error) => {
             console.error('Error:', error);
           });
           setIsEditing(false);
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
                                <table>
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
                                </table>
                                <p>
                                    <span style={{ fontWeight: 'bold' }}>Comments:</span> {reportDetails.results.comments}
                                </p>
                            </div>
                        ))}
                    </>
                ) : (
                    <>
                        {/* Render input fields for editing here */}
                        <p>
                            <span style={{ fontWeight: 'bold' }}>Service Reason:</span>
                            <input
                            type="text"
                            value={editedResults.serviceReason}
                            onChange={(e) => setEditedResults({ ...editedResults, serviceReason: e.target.value })}
                            />
                        </p>
                        <p>
                            <span style={{ fontWeight: 'bold' }}>Calibration Date:</span>
                            <input
                            type="date"
                            value={editedResults.calDate}
                            onChange={(e) => setEditedResults({ ...editedResults, calDate: e.target.value })}
                            />
                        </p>
                        <p>
                            <span style={{ fontWeight: 'bold' }}>Interval (months):</span>
                            <input
                            type="number"
                            value={editedResults.intervalMonth}
                            onChange={(e) => setEditedResults({ ...editedResults, intervalMonth: e.target.value })}
                            />
                        </p>
                        {editedResults.tests.map((test, index) => (
                            <div key={index}>
                                <h5>{test.type} - {test.method} in {test.unit}</h5>
                                <table>
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
                                                <input
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
                                                <input
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
                                                <input
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
                                                <input
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
                                                <input
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
                                                <input
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
                                </table>
                            </div>
                        ))}
                         <p>
                            <span style={{ fontWeight: 'bold' }}>Comments:</span>
                            <input
                            type="text"
                            value={editedResults.comments}
                            onChange={(e) => setEditedResults({ ...editedResults, comments: e.target.value })}
                            />
                        </p>
                        <Button onClick={() => handleSaveClick(reportDetails._id)}>Save</Button>
                        <Button onClick={handleCancelEditClick}>Cancel</Button>
                    </>
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
};

export default ReportModal;
