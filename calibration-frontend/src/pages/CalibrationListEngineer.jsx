import React, { useState, useEffect } from 'react';
import { exportToPDF } from '../components/ExportToPDF';
import { useAuthContext } from "../hooks/useAuthContext";
import { useCalibrationContext } from "../hooks/useCalibrationContext";
import { useTable, useSortBy } from 'react-table';

import ReportModal from '../components/ReportModal';

const CalibrationListEngineer = () => {

    const {user} = useAuthContext()
    const {calibrations, dispatch} = useCalibrationContext()
    const [modalContent, setModalContent] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        console.log(user)
        const fetchCalibrations = async () => {
            const response = await fetch('http://localhost:5000/report/find-all',{
                headers: {'Authorization': `Bearer ${user.token}`},
      })
      const json = await response.json()

      if (response.ok) {
        console.log(json)
        dispatch({type: 'SET_CALIBRATIONS', payload: json})
      }
    }
      
    if (user) {
        fetchCalibrations()
      }
    }, [dispatch, user])

    const fetchReportDetails = async (reportId) => {
        // Replace with the actual endpoint to fetch report details
        const response = await fetch(`http://localhost:5000/report/${reportId}`, {
            headers: { 'Authorization': `Bearer ${user.token}` },
        });
        const json = await response.json();

        if (response.ok) {
            setModalContent(json);
            setIsModalOpen(true);
        }
    };

    const handleEdit = (reportDetails) => {
        // Implement the logic to handle edit
        console.log('Edit report:', reportDetails);
        // You might want to set the modal content to an editable state or navigate to an edit page
    };
     
    const data = React.useMemo(
        () => calibrations || [],
        [calibrations]
    );

    const columns = React.useMemo(
        () => [
            {
                Header: 'Export',
                accessor: 'export', // accessor is the "key" in the data
                Cell: ({ row }) => (
                    <button className="btn btn-primary" onClick={() => exportToPDF(row.original)}>Export</button>
                )
            },
            {
                Header: 'View Details',
                accessor: '_id', // assuming _id is the unique identifier for each report
                Cell: ({ row }) => (
                    <button className="btn btn-secondary" onClick={() => fetchReportDetails(row.original._id)}>View Details</button>
                )
            },
            {
                Header: 'Equipment ID',
                accessor: 'equipment.equipmentID'
            },
            {
                Header: 'Equipment Description',
                accessor: 'equipment.equipmentDescription'
            },
            {
                Header: 'Equipment Manufacturer',
                accessor: 'equipment.equipmentManufacturer'
            },
            {
                Header: 'Equipment Model Number',
                accessor: 'equipment.equipmentModelNumber'
            },
            {
                Header: 'Date of Calibration',
                accessor: 'results.calDate'
            },
            // ... other column definitions ...
        ],
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data }, useSortBy);


    return (
        <>
            <table {...getTableProps()} className="table">
                <thead className="thead-dark">
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    {column.render('Header')}
                                    <span>
                                        {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                                    </span>
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
                                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            {/* Modal for viewing and editing report details */}
            {isModalOpen && (
                <ReportModal
                show={isModalOpen}
                onHide={() => setIsModalOpen(false)}
                reportDetails={modalContent}
                onEdit={handleEdit}
                />
            )}
        </>
    );
};

export default CalibrationListEngineer;