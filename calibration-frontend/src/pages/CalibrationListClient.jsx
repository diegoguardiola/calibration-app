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
         
    }})
    
     
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