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
        {/* Here you would map through reportDetails and display them as needed */}
        <h4>{reportDetails.equipment.equipmentName}</h4>
        {/* Display other report details */}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => onEdit(reportDetails)}>Edit</Button>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ReportModal;
