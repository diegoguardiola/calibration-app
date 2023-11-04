import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ReportModal = ({ show, onHide, reportDetails, onEdit }) => {
  return (
    <Modal show={show} onHide={onHide} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Report Details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Equipment Details</h4>
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
        <h4>Instrument Details</h4>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => onEdit(reportDetails)}>Edit</Button>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ReportModal;
