import { useState } from "react"
import UserList from "../components/Admin/UserList"
import InstrumentRegistryForm from "../components/Forms/InstrumentRegistryFrom"
import { Container, Row, Col, Dropdown } from 'react-bootstrap';

function Admin() {

    
    return (
        <Container>
            <h1>Users</h1>
            <UserList />
            <h1>Calibration Instruments/Standards</h1>
            <InstrumentRegistryForm />
        </Container>
    )
}

export default Admin
