import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Dropdown, Button } from 'react-bootstrap';
import { useTable, useSortBy } from 'react-table';
import { useAuthContext } from '../../hooks/useAuthContext';
import AddNewInstrumentModal from './AddNewInstrumentModal';

function InstrumentList() {

    const {user} = useAuthContext()
    const [instruments, setInstruments] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleAddInstrument = (instrumentData) => {
        // Logic to submit new user data
        handleCloseModal();
    };

    const fetchInstruments = async () => {
        const response = await fetch('http://localhost:5000/c1_1/instrument/get-all-instruments', {
            headers: {'Authorization': `Bearer ${user.token}`},
        });
        const json = await response.json();

        if (response.ok) {
            // Update your state or context with the fetched users
            setInstruments(json)
            
        }
    };

    useEffect(() => {    
        fetchInstruments();
    }, []);

    const deleteInstrument = async (instrumentId) => {
        // Ask for confirmation before deleting
        const isConfirmed = window.confirm("Are you sure you want to delete this instrument?");
        if (!isConfirmed) {
            return; // Stop the function if the instrument clicks 'Cancel'
        }
    
        try {
            const response = await fetch(`http://localhost:5000/c1_1/instrument/${instrumentId}/delete-instrument`, {
                method: 'DELETE',    
                headers: { 'Authorization': `Bearer ${user.token}` },
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            if (response.ok) {
                // Fetch the updated list of users after deletion
                await fetchInstruments();
            }
    
            const data = await response.json();
            console.log('User deleted:', data);
            // Handle the response data (e.g., update state or UI)
        } catch (error) {
            console.error('Error:', error);
            // Handle errors (e.g., show error message)
        }
    };

    const columns = React.useMemo(
        () => [
            {
                Header: 'Description',
                accessor: 'instrumentDescription', 
            },
            {
                Header: 'ID',
                accessor: 'instrumentID', 
            },
            {
                Header: 'Manufacurer',
                accessor: 'instrumentManufacturer', 
            },
            {
                Header: 'Model Number',
                accessor: 'instrumentModelNumber', 
            },
            {
                Header: 'Serial Number',
                accessor: 'instrumentSerialNumber', 
            },
            {
                Header: 'Cal Date',
                accessor: 'instrumentCalDate', 
            },
            {
                Header: 'Cal Interval (months)',
                accessor: 'instrumentIntervalMonths', 
            },
            {
                Header: 'Delete',
                accessor: '_id', // assuming _id is the unique identifier for each report
                Cell: ({ row }) => (
                    <Button variant="outline-danger" onClick={() => deleteInstrument(row.original._id)}>Delete</Button>
                )
            },
        ],
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data: instruments }, useSortBy);

    return (
        <Container>
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
                    {rows.map(row => {
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
            <Button variant="primary" onClick={handleShowModal}>
                Add New Instrument
            </Button>

            <AddNewInstrumentModal
                show={showModal}
                handleClose={handleCloseModal}
                handleSubmit={handleAddInstrument}
                onInstrumentAdded={fetchInstruments}
            />
        </Container>
  )
}

export default InstrumentList
