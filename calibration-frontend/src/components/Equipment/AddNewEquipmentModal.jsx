import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap'

function AddNewEquipmentModal({ show, handleClose, userId}) {

    const [clients, setClients] = useState([]);
    const [selectedClient, setSelectedClient] = useState('');
    const [equipmentName, setEquipmentName] = useState('');
    const [equipmentID, setEquipmentID] = useState('');
    const [equipmentManufacturer, setEquipmentManufacturer] = useState('');
    const [equipmentModelNumber, setEquipmentModelNumber] = useState('');
    const [equipmentSerialNumber, setEquipmentSerialNumber] = useState('');
    const [equipmentRange, setEquipmentRange] = useState('');
    const [equipmentUnits, setEquipmentUnits] = useState('');
    const [equipmentDescription, setEquipmentDescription] = useState('');
    const [equipmentLocation, setEquipmentLocation] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(userId)
        const url = 'http://localhost:5000/c1_1/equipment/add'; 

        const data = {
            //company: selectedClient, 
            equipmentName, 
            equipmentID, 
            equipmentManufacturer, 
            equipmentModelNumber,
            equipmentSerialNumber,
            equipmentRange,
            equipmentUnits,
            equipmentDescription,
            equipmentLocation,
            userId  // Include userId in the data sent to the backend
        };
        
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => { throw err; });
            }
            return response.json();
        })
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };

  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
            <Modal.Title>Add New Equipment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form.Group>
                <Form.Label>Equipment Name:</Form.Label>
                <Form.Control
                    type="text"
                    value={equipmentName}
                    onChange={(e) => setEquipmentName(e.target.value)}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Equipment ID:</Form.Label>
                <Form.Control
                    type="text"
                    value={equipmentID}
                    onChange={(e) => setEquipmentID(e.target.value)}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Equipment Manufacturer:</Form.Label>
                <Form.Control
                    type="text"
                    value={equipmentManufacturer}
                    onChange={(e) => setEquipmentManufacturer(e.target.value)}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Equipment Model Number:</Form.Label>
                <Form.Control
                    type="text"
                    value={equipmentModelNumber}
                    onChange={(e) => setEquipmentModelNumber(e.target.value)}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Equipment Serial Number:</Form.Label>
                <Form.Control
                    type="text"
                    value={equipmentSerialNumber}
                    onChange={(e) => setEquipmentSerialNumber(e.target.value)}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Equipment Range:</Form.Label>
                <Form.Control
                    type="text"
                    value={equipmentRange}
                    onChange={(e) => setEquipmentRange(e.target.value)}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Equipment Unite:</Form.Label>
                <Form.Control
                    type="text"
                    value={equipmentUnits}
                    onChange={(e) => setEquipmentUnits(e.target.value)}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Equipment Description:</Form.Label>
                <Form.Control
                    type="text"
                    value={equipmentDescription}
                    onChange={(e) => setEquipmentDescription(e.target.value)}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Equipment Location:</Form.Label>
                <Form.Control
                    type="text"
                    value={equipmentLocation}
                    onChange={(e) => setEquipmentLocation(e.target.value)}
                />
            </Form.Group>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button type="submit" variant="primary">
                Add Equipment
            </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default AddNewEquipmentModal
