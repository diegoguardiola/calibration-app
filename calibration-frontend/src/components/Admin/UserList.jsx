import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Dropdown, Button } from 'react-bootstrap';
import { useTable, useSortBy } from 'react-table';
import { useAuthContext } from '../../hooks/useAuthContext';
import CreateNewUserModal from './CreateNewUserModal';

function UserList() {

    const {user} = useAuthContext()
    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleCreateUser = (userData) => {
        // Logic to submit new user data
        handleCloseModal();
    };

    const fetchUsers = async () => {
        const response = await fetch('http://localhost:5000/user/get-all-users', {
            headers: {'Authorization': `Bearer ${user.token}`},
        });
        const json = await response.json();

        if (response.ok) {
            // Update your state or context with the fetched users
            setUsers(json)
        }
    };

    useEffect(() => {    
        fetchUsers();
    }, []);

    const deleteUser = async (userId) => {
        // Ask for confirmation before deleting
        const isConfirmed = window.confirm("Are you sure you want to delete this user?");
        if (!isConfirmed) {
            return; // Stop the function if the user clicks 'Cancel'
        }
    
        try {
            const response = await fetch(`http://localhost:5000/user/${userId}/delete-user`, {
                method: 'DELETE',    
                headers: { 'Authorization': `Bearer ${user.token}` },
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            if (response.ok) {
                // Fetch the updated list of users after deletion
                await fetchUsers();
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
                Header: 'Name',
                // No accessor is directly provided here
                Cell: ({ row }) => {
                    // Access the individual values from the row object
                    return `${row.original.firstName} ${row.original.lastName}`;
                },
            },
            {
                Header: 'Email',
                accessor: 'email', 
            },
            {
                Header: 'Company',
                accessor: 'company', 
            },
            {
                Header: 'Role',
                accessor: 'role', 
            },
            {
                Header: 'Delete',
                accessor: '_id', // assuming _id is the unique identifier for each report
                Cell: ({ row }) => (
                    <Button variant="outline-danger" onClick={() => deleteUser(row.original._id)}>Delete</Button>
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
    } = useTable({ columns, data: users }, useSortBy);
    
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
                Create New User
            </Button>

            <CreateNewUserModal
                show={showModal}
                handleClose={handleCloseModal}
                handleSubmit={handleCreateUser}
                onUserCreated={fetchUsers}
            />
        </Container>
    );
    
}

export default UserList
