import React, { useState, useEffect } from 'react';
import { exportToPDF } from '../components/ExportToPDF';
import { useAuthContext } from "../hooks/useAuthContext";
import { useCalibrationContext } from "../hooks/useCalibrationContext";
import { useTable, useSortBy } from 'react-table';


const CalibrationListClient = () => {

    const {user} = useAuthContext()
    const {calibrations, dispatch} = useCalibrationContext()

    useEffect(() => {
        const fetchCalibrations = async () => {
            // Assuming the company name is stored in the user object
            const companyName = user.company;
    
            // Update the request URL with the new endpoint and pass the company name as a query parameter
            const response = await fetch(`http://localhost:5000/c1_1/report/${companyName}/find-all-by-company`, {
                headers: {'Authorization': `Bearer ${user.token}`},
            });
    
            const json = await response.json();
    
            if (response.ok) {
                dispatch({type: 'SET_CALIBRATIONS', payload: json});
            } else {
                // Handle any errors, such as showing a message to the user
            }
        }
    
        if (user) {
            fetchCalibrations();
        }
    }, [dispatch, user]);
    
     
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
    );
};

export default CalibrationListClient;