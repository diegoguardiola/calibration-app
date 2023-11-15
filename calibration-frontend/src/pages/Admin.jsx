import { useState } from "react"
import UserList from "../components/Admin/UserList"
import InstrumentList from "../components/Admin/InstrumentList";
import { Container, Row, Col, Dropdown } from 'react-bootstrap';

function Admin() {

    
    return (
        <Container>
            <h1>Users</h1>
            <UserList />
            <br></br>
            <h1>Calibration Instruments/Standards</h1>
            <InstrumentList />
        </Container>
    )
}

export default Admin
