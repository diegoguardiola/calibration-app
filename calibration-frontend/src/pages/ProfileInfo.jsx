import React, { useState } from 'react';
import { Card, Button, Form, Container, Row, Col } from 'react-bootstrap';
import { useAuthContext } from '../hooks/useAuthContext';

function ProfileInfo() {

  const { user } = useAuthContext();

  // State to keep track of person's info
  const [personInfo, setPersonInfo] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
  });

  // State to control the edit form display
  const [isEditing, setIsEditing] = useState(false);

  // Function to handle input changes
  const handleInputChange = (e) => {
    setPersonInfo({ ...personInfo, [e.target.name]: e.target.value });
  };

  // Function to toggle the edit form
  const toggleEdit = () => {
    setIsEditing(!isEditing);
    console.log(user)
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/c1_1/user/update/${user.id}`, { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(personInfo),
    });

    if (response.ok) {
      // Handle successful submission here
      console.log('Information updated successfully!');
      setIsEditing(false); // Close the form on successful submission
    } else {
      // Handle errors here
      console.error('An error occurred while updating the information.');
    }
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Card>
            <Card.Body>
              {isEditing ? (
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={personInfo.firstName}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={personInfo.lastName}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={personInfo.email}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                      type="tel"
                      name="phone"
                      value={personInfo.phone}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    Send
                  </Button>
                  <Button variant="secondary" onClick={toggleEdit} className="ms-2">
                    Cancel
                  </Button>
                </Form>
              ) : (
                <>
                  <Card.Title>{personInfo.firstName} {personInfo.lastName}</Card.Title>
                  <Card.Text>Email: {personInfo.email}</Card.Text>
                  <Card.Text>Phone: {personInfo.phone}</Card.Text>
                  <Button variant="primary" onClick={toggleEdit}>
                    Edit
                  </Button>
                </>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default ProfileInfo;
