import React from 'react'
import EquipmentList from '../components/Equipment/EquipmentList'
import { Container, Row, Col, Dropdown, Button } from 'react-bootstrap';

function EquipmentRegistery() {
  return (
    <Container className='equipment-container'>
      <EquipmentList />
    </Container>
  )
}

export default EquipmentRegistery
