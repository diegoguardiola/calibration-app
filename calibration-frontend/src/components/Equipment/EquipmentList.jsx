import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Dropdown, Button } from 'react-bootstrap';
import { useTable, useSortBy, usePagination } from 'react-table';
import { useAuthContext } from '../../hooks/useAuthContext';

function EquipmentList() {

    const {user} = useAuthContext()
    const [companies, setCompanies] = useState([]);
    const [userID, setUserID] = useState(null);
    const [equipment, setEquipment] = useState([]);

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
    
    useEffect(() => {
        // Fetch the data from the endpoint
        fetch('http://localhost:5000/c1_1/user/get-user-company-id') // Replace with the actual endpoint path
        .then(response => response.json())
        .then(data => setCompanies(data))
        .catch(error => console.error('Error fetching companies:', error));
    }, []);

    const handleChange = async  (eventKey) => {
        setUserID(eventKey);
        console.log(eventKey);
    
        const response = await fetch(`http://localhost:5000/c1_1/user/${eventKey}/equipment`, {
            headers: {'Authorization': `Bearer ${user.token}`},
        });
        const json = await response.json();
    
        if (response.ok) {
            // Assuming the data is nested under 'equipmentList'
            setEquipment(json.equipmentList || []);
    
            /* Make an additional fetch call
            return fetch(`http://localhost:5000/c1_1/user/${eventKey}/client-info`);*/
        }
        /*.then(response => response.json())
        .then(additionalData => {
            console.log(additionalData)
            setClientData(additionalData);
            // Do something with the additional data
        })
        .catch(error => console.error('Error fetching data:', error));*/
    };

    useEffect(() => {
        console.log("Equipment State Updated: ", equipment);
    }, [equipment]);
    
    const data = React.useMemo(
        () => equipment || [],
        [equipment]
    );

    const columns = React.useMemo(
        () => [
            {
                Header: 'Name',
                accessor: 'equipmentName', 
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
                    <Button variant="outline-danger" onClick={() => console.log(row.original._id)}>Delete</Button>
                )
            },
        ],
        []
    );

    return (
        <Container>
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
            {/* Pagination Controls */}
            <div>
                <Button onClick={() => previousPage()} disabled={!canPreviousPage}>
                    Previous
                </Button>
                <Button onClick={() => nextPage()} disabled={!canNextPage}>
                    Next
                </Button>
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
            </div>
        </Container>
    )
}

export default EquipmentList
