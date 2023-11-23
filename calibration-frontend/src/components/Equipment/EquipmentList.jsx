import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Dropdown, Button, Modal } from 'react-bootstrap';
import { useTable, useSortBy, usePagination } from 'react-table';
import { useAuthContext } from '../../hooks/useAuthContext';
import AddNewEquipmentModal from './AddNewEquipmentModal';
import './Equipment.css'

function EquipmentList() {

    const {user} = useAuthContext()
    const [companies, setCompanies] = useState([]);
    const [userId, setUserId] = useState(null);
    const [equipment, setEquipment] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleAddEquipment = (equipmentData) => {
        // Logic to submit new user data
        handleCloseModal();
    };
    
    useEffect(() => {
        // Fetch the data from the endpoint
        fetch('http://localhost:5000/c1_1/user/get-user-company-id') // Replace with the actual endpoint path
        .then(response => response.json())
        .then(data => setCompanies(data))
        .catch(error => console.error('Error fetching companies:', error));
    }, []);

    const handleChange = async  (eventKey) => {
        setUserId(eventKey);
        console.log(eventKey);
    
        const response = await fetch(`http://localhost:5000/c1_1/user/${eventKey}/equipment`, {
            headers: {'Authorization': `Bearer ${user.token}`},
        });
        const json = await response.json();
    
        if (response.ok) {
            // Assuming the data is nested under 'equipmentList'
            setEquipment(json.equipmentList || []);

        }

    };

    useEffect(() => {
        console.log("Equipment State Updated: ", equipment);
    }, [equipment]);
    
    const data = React.useMemo(
        () => equipment || [],
        [equipment]
    );

    const deleteEquipment = async (equipmentId) => {
        // Ask for confirmation before deleting
        const isConfirmed = window.confirm("Are you sure you want to delete this equipment?");
        if (!isConfirmed) {
            return; // Stop the function if the user clicks 'Cancel'
        }
    
        try {
            const response = await fetch(`http://localhost:5000/c1_1/equipment/delete`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ equipmentId, userId }) // Pass the equipmentId and userId in the body
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            // Optionally, update the local state to reflect the deletion
            setEquipment(currentEquipment => currentEquipment.filter(e => e._id !== equipmentId));
    
            console.log('Equipment deleted successfully');
            // You might want to fetch the updated list of equipment here
        } catch (error) {
            console.error('Error:', error);
            // Handle errors (e.g., show error message)
        }
    };
    

    const columns = React.useMemo(
        () => [
            {
                Header: 'Name',
                accessor: 'equipmentName', 
            },
            {
                Header: 'ID',
                accessor: 'equipmentID', 
            },
            {
                Header: 'Manufacurer',
                accessor: 'equipmentManufacturer', 
            },
            {
                Header: 'Model Number',
                accessor: 'equipmentModelNumber', 
            },
            {
                Header: 'Serial Number',
                accessor: 'equipmentSerialNumber', 
            },
            {
                Header: 'Delete',
                accessor: '_id', // assuming _id is the unique identifier for each report
                Cell: ({ row }) => (
                    <Button variant="outline-danger" onClick={() => deleteEquipment(row.original._id)}>Delete</Button>
                )
            },
        ],
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page, // Use 'page' instead of 'rows' for pagination
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        setPageSize,
        state: { pageIndex, pageSize },
        prepareRow,
    } = useTable(
        { columns, data, initialState: { pageIndex: 0, pageSize: 25 } }, // Set initial page size
        useSortBy,
        usePagination // Add usePagination hook
    );

    return (
        <Container className='equipment-list'>
            <Row className='equipment-list-select'>
                <Col>
                    <Dropdown onSelect={handleChange}>
                        <Dropdown.Toggle style={{ backgroundColor: '#000099', color: 'white' }} id="dropdown-basic">
                            Select Company
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item value="" disabled>Select a Company</Dropdown.Item>
                            {companies.map(company => (
                            <Dropdown.Item eventKey={company._id}>
                                {company.company}
                            </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
                <Col>
                    <span>
                        Page{' '}
                        <strong>
                            {pageIndex + 1} of {Math.ceil(data.length / pageSize)}
                        </strong>
                    </span>
                    <select
                        value={pageSize}
                        onChange={e => {
                            setPageSize(Number(e.target.value));
                        }}
                    >
                        {[25, 50, 100].map(pageSize => (
                            <option key={pageSize} value={pageSize}>
                                Show {pageSize}
                            </option>
                        ))}
                    </select>
                </Col>
            </Row>
            
            <table {...getTableProps()} className="table">
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()}>
                                    {column.render('Header')}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map(row => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => (
                                    <td {...cell.getCellProps()}>
                                        {cell.render('Cell')}
                                    </td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            {/* Pagination Controls */}
            <div>
                <Button onClick={() => previousPage()} disabled={!canPreviousPage}>
                    Previous
                </Button>
                <Button onClick={() => nextPage()} disabled={!canNextPage}>
                    Next
                </Button>
            
            </div>
            <Button variant="primary" onClick={handleShowModal}>
                Add New Equipment
            </Button>
            <AddNewEquipmentModal
                show={showModal}
                handleClose={handleCloseModal}
                handleSubmit={handleAddEquipment}
                userId={userId}
            />
        </Container>
    )
}

export default EquipmentList
