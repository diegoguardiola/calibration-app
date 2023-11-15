import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';

function AddNewInstrumentModal({ show, handleClose, onInstrumentAdded}) {

    const [instrumentDescription, setInstrumentDescription] = useState('');
    const [instrumentID, setInstrumentID] = useState('');
    const [NISTnum, setNISTnum] = useState('');
    const [instrumentManufacturer, setInstrumentManufacturer] = useState('');
    const [instrumentModelNumber, setInstrumentModelNumber ] = useState('');
    const [instrumentSerialNumber, setInstrumentSerialNumber ] = useState('');
    const [instrumentCalDate, setInstrumentCalDate ] = useState('');
    const [instrumentIntervalYears, setInstrumentIntervalYears ] = useState('0');
    const [instrumentIntervalMonths, setInstrumentIntervalMonths ] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = 'http://localhost:5000/c1_1/instrument/add'; 
    
        const data = {
          instrumentDescription,
          instrumentID,
          NISTnum,
          instrumentManufacturer,
          instrumentModelNumber,
          instrumentSerialNumber,
          instrumentCalDate,
          instrumentIntervalYears,
          instrumentIntervalMonths
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
            handleClose();
            if (onInstrumentAdded) {
                onInstrumentAdded(); // Call the callback function after user creation
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
      }

  return (
    <Modal show={show} onHide={handleClose}>
        <Form onSubmit={handleSubmit}>
            <Modal.Header closeButton>
                <Modal.Title>Create New User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group>
                    <Form.Label>Description:</Form.Label>
                    <Form.Control
                        type="text"
                        value={instrumentDescription}
                        onChange={(e) => setInstrumentDescription(e.target.value)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>ID:</Form.Label>
                    <Form.Control
                        type="text"
                        value={instrumentID}
                        onChange={(e) => setInstrumentID(e.target.value)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>NIST Number:</Form.Label>
                    <Form.Control
                        type="text"
                        value={NISTnum}
                        onChange={(e) => setNISTnum(e.target.value)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Manufacturer:</Form.Label>
                    <Form.Control
                        type="text"
                        value={instrumentManufacturer}
                        onChange={(e) => setInstrumentManufacturer(e.target.value)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>instrumentModelNumber:</Form.Label>
                    <Form.Control
                        type="text"
                        value={instrumentModelNumber}
                        onChange={(e) => setInstrumentModelNumber(e.target.value)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Serial Number:</Form.Label>
                    <Form.Control
                        type="text"
                        value={instrumentSerialNumber}
                        onChange={(e) => setInstrumentSerialNumber(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Cal Date:</Form.Label>
                    <Form.Control
                        type="date"
                        value={instrumentCalDate}
                        onChange={(e) => setInstrumentCalDate(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Cal Interval (months):</Form.Label>
                    <Form.Control
                        type="number"
                        value={instrumentIntervalMonths}
                        onChange={(e) => setInstrumentIntervalMonths(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button type="submit" variant="primary">
                    Add New Instrument
                </Button>
            </Modal.Footer>
        </Form>
    </Modal>
  )
}

export default AddNewInstrumentModal
