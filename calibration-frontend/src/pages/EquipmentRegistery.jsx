import React from 'react'
import EquipmentList from '../components/Equipment/EquipmentList'
import EquipmentRegistryForm from '../components/Forms/EquipmentRegistryForm'
import { Container, Row, Col, Dropdown, Button } from 'react-bootstrap';

function EquipmentRegistery() {
  return (
    <Container>
      <EquipmentList />
      <EquipmentRegistryForm/>
    </Container>
  )
}

export default EquipmentRegistery
