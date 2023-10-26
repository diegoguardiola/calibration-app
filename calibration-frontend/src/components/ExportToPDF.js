// pdfExport.js
import { jsPDF } from "jspdf";
import 'jspdf-autotable'; // plugin for creating tables
import logo from '../assets/logo.png';

export const exportToPDF = (calibration) => {
    const doc = new jsPDF();

    // Logo
    doc.addImage(logo, 'PNG', 75, 5, 50, 20);

    // Customer Information
    doc.autoTable({
        startY: 35,
        head: [["Customer Information"]],
        body: [
            [calibration.client.company],
            [calibration.client.firstName, ' ', calibration.client.lastName],
            [calibration.client.address],
            [calibration.client.phone],
        ].map(item => [item]), // Wrapping each item in another array
        headStyles: {
            fontSize: 9,
            cellPadding: 0.3,
            fillColor: [255, 255, 255], 
            textColor: [0, 0, 0]
        },
        bodyStyles: {
            fontSize: 8, 
            cellPadding: 0.2,
            lineColor: [0, 0, 225],
        },
        didDrawCell: (data) => {
            // If this is a head section cell and it is the last column
            if (data.section === 'head' ) {
                // The y position just below the cell
                let y = data.cell.y + data.cell.height;
                doc.setDrawColor(0, 0, 255);
                // Draw a line from the left edge of the cell to the right
                doc.line(data.cell.x, y, data.cell.x + data.cell.width, y);
            }
        },
        theme: 'plain',
        tableWidth: 70,
    });
    // Falco Information
    doc.autoTable({
        startY: 35,
        margin: { left: 125 },
        head: [["Serviced By"]],
        body: [
            ['Falco Automation, LLC'],
            ['2689 Citrus Rd Suite D, Rancho Cordova, CA 95742'],
            ['Tel: (650) 449-9011'],
            ['www.falcoautomation.com'],
        ].map(item => [item]), // Wrapping each item in another array
        headStyles: {
            fontSize: 9,
            cellPadding: 0.3,
            halign: 'right',
            fillColor: [255, 255, 255], 
            textColor: [0, 0, 0] 
        },
        bodyStyles: {
            fontSize: 8, 
            cellPadding: 0.2,
            halign: 'right'
        },
        theme: 'plain',
        didDrawCell: (data) => {
            // If this is a head section cell and it is the last column
            if (data.section === 'head' ) {
                // The y position just below the cell
                let y = data.cell.y + data.cell.height;
                doc.setDrawColor(0, 0, 255);
                // Draw a line from the left edge of the cell to the right
                doc.line(data.cell.x, y, data.cell.x + data.cell.width, y);
            }
        },
        tableWidth: 70,
    });
     // Certificate Information Header
     doc.autoTable({
        startY: 60,
        head: [[{ content: "Certificate Information", colSpan: 2 }]],
        headStyles: {
            fontSize: 10,
            cellPadding: 0.3,
            fillColor: [255, 255, 255], 
            textColor: [0, 0, 0],
            halign: 'center',
        },
        theme: 'plain',
        didDrawCell: (data) => {
            // If this is a head section cell and it is the last column
            if (data.section === 'head' ) {
                // The y position just below the cell
                let y = data.cell.y + data.cell.height;
                doc.setDrawColor(0, 0, 255);
                // Draw a line from the left edge of the cell to the right
                doc.line(data.cell.x, y, data.cell.x + data.cell.width, y);
            }
        },
        tableWidth: 180,
    });
    // Certificate Information Col 1
    doc.autoTable({
        startY: 70,
        body: [
            ['Equipment Id:', calibration.equipment.equipmentID],
            ['Equipment Manufacturer:', calibration.equipment.equipmentManufacturer],
            ['Description:', calibration.equipment.description],
            ['Model Number:',calibration.equipment.equipmentModelNumber],
            ['Serial Number:', calibration.equipment.equipmentSerialNumber],
            ['Range:', calibration.equipment.equipmentRange,],
            ['Units:', calibration.equipment.equipmentUnits]
        ],
        bodyStyles: {
            fontSize: 8, 
            cellPadding: 0.2,
            halign: 'left'
        },
        theme: 'plain',
        tableWidth: 88,
    });
    // Certificate Information Col 2
    doc.autoTable({
        startY: 70,
        margin: { left: 110 },
        body: [
            ['Technician:',calibration.results.calibrationTech],
            ['Cal Date:', calibration.results.calDate],
            ['Cal Due Date:', calibration.results.calDate],
            ['Interval:', calibration.results.intervalMonth],
            ['Temperature:', calibration.results.temp,],
            ['Humidity:', calibration.results.humidity],
        ],
        bodyStyles: {
            fontSize: 8, 
            cellPadding: 0.2,
            halign: 'left'
        },
        theme: 'plain',
        tableWidth: 88,
    });    
    // Certificate ISO comments
    doc.autoTable({
    startY: 100,
    head: [[{ content: "", colSpan: 2 }]],
    headStyles: {
        fontSize: 10,
        cellPadding: 0.3,
        fillColor: [255, 255, 255], 
        textColor: [0, 0, 0],
        halign: 'center',
    },
    body: [
       ['Falco Automation certifies the performance of the above instrument has been verified using test equipment of known accuracy, traceable to the International System of Units (SI) through a National Metrology Institute such as NIST, NPL or PTB. The methods and procedures used comply with ISO/IEC 17025. The reported expanded measurement uncertainty is stated as the standard measurement uncertainty multiplied by the coverage factor k=2 such that the coverage probability corresponds to approximately 95%.'],
       [''],
       ['Dimensional testing length measurements are performed in accordance with A2LA R205 – Specific Requirements: Calibration Laboratory Accreditation Program and are deemed equivalent to that of a calibration.'],
       [''],
       ['This certificate and associated attachments relate only to the items calibrated. No representation is made about the long-term stability of this unit. Any number of factors can influence the calibration that may cause the unit to drift out of specification before the calibration interval has expired. Calibration due dates appearing on the certificate or label are determined by the customer for administrative purposes and do not imply continued conformance to specifications.'],
       [''],
       ['This certificate shall not be reproduced, except in full, without the written approval of the issuing calibration laboratory.'],
       [''],
       ['Data Report Attached.'], 
    ],
    bodyStyles: {
        fontSize: 8, 
        cellPadding: 0.2,
        halign: 'left'
    },
    theme: 'plain',
    didDrawCell: (data) => {
        // If this is a head section cell and it is the last column
        if (data.section === 'head' ) {
            // The y position just below the cell
            let y = data.cell.y + data.cell.height - 3;
            doc.setDrawColor(0, 0, 255);
            // Draw a line from the left edge of the cell to the right
            doc.line(data.cell.x, y, data.cell.x + data.cell.width, y);
        }
    },
    tableWidth: 180,
    });
    // Calibration Standards/Instruments
    doc.autoTable({
        startY: 160,
        head: [['Instrument ID', 'Description', 'Manufacturer', 'Model', 'Serial', 'Cal Date', 'Due Date']],
        body: [
            [calibration.instrument.instrumentID, calibration.instrument.instrumentDescription
            ,calibration.instrument.instrumentManufacturer, calibration.instrument.instrumentModelNumber
            ,calibration.instrument.instrumentSerialNumber,calibration.instrument.instrumentCalDate
            ,calibration.instrument.instrumentCalDate]
        ],
        headStyles: {
            fontSize: 9,
            cellPadding: 0.3,
            halign: 'center',
            fillColor: [255, 255, 255], 
            textColor: [0, 0, 0],
            columnWidth: [50, 60, 40, 60, 60, 60, 60],
        },
        bodyStyles: {
            fontSize: 8, 
            cellPadding: 0.2,
            halign: 'center',
            columnWidth: [60, 50, 40, 60, 60, 60, 60],
        },
         // Set specific widths for each column
        theme: 'plain',
        didDrawCell: (data) => {
            // If this is a head section cell and it is the last column
            if (data.section === 'head' ) {
                // The y position just below the cell
                let y = data.cell.y + data.cell.height;
                doc.setDrawColor(0, 0, 255);
                // Draw a line from the left edge of the cell to the right
                doc.line(data.cell.x, y, data.cell.x + data.cell.width, y);
            }
        },
        tableWidth: 180,
    });

    //pagebreak
    doc.addPage();

    // Logo
    doc.addImage(logo, 'PNG', 75, 5, 50, 20);
    // Calibration Table
    const tableData = calibration.tests.testPoints.map((point) => ([
        calibration.tests[0].testPoints.nominal, // Convert to a number if needed
        calibration.tests[0].testPoints.asFound, // Convert to a number if needed
        calibration.tests[0].testPoints.asLeft,   // Convert to a number if needed
        calibration.tests[0].testPoints.result,
        calibration.tests[0].testPoints.min,         // Convert to a number if needed
        calibration.tests[0].testPoints.max
    ]))
    const tableStyles = {
        borderColor: [0, 0, 0], // Black border color
        fillColor: [255, 255, 255],   // Black fill color
        textColor: [0, 0, 0], // White text color
    };
    // Configure cell styles
    const cellStyles = {
        lineWidth: 0.3, // Line width for cell borders
        lineColor: [0, 0, 0], // Black cell border color
    };

    doc.autoTable({
        startY: 35,
        head: [['Function/Range', 'Nominal Value', 'As Found', 'As Left', 'Result', 'Min', 'Max', 'Units']],
        body: tableData,
        headStyles: {
            fontSize: 9,
            cellPadding: 0.3,
            fillColor: [255, 255, 255], 
            textColor: [0, 0, 0]
        },
        bodyStyles: {
            fontSize: 8, 
            cellPadding: 0.2,
            lineColor: [0, 0, 225],
        },
        styles: tableStyles,
        columnStyles: {
            0: cellStyles,
            1: cellStyles,
            2: cellStyles,
        },
        theme: 'plain',
        tableWidth: 150,
    });




        // Calibration Results
        doc.autoTable({
            startY: 470,
            head: [['Setpoint', 'As Found', 'As Left']],
            body: [
                
                //[calibration.setpoint1, calibration.asFound1, calibration.asLeft1],
                //[calibration.setpoint2, calibration.asFound2, calibration.asLeft2],
                //[calibration.setpoint3, calibration.asFound3, calibration.asLeft3],
            ],
            headStyles: {
                fontSize: 9,
                cellPadding: 0.3,
                fillColor: [255, 255, 255], 
                textColor: [0, 0, 0],
                halign: 'center',
            },
            bodyStyles: {
                fontSize: 8, 
                cellPadding: 0.2,
                halign: 'center',
            },
            
            tableWidth: 470,
        });

    //Pass/Fail Statements
    const textWidth = 365; // Desired width for text wrapping
    const text1 = 'Statements of Pass or Fail Conformance: The uncertainty of the measurement has been considered when determining compliance with specification. All measurements and test results guard banded to ensure the probability of false-accepts does not exceed {guard percent} in compliance with {standard}';
    const text2 = 'Field Environmental Conditions: Temperature: between 17 and 23 degrees Celsius; rate of change not to exceed 1.0 C per hour. Relative humidity: from 30 to 70%. These conditions satisfy NIST requirements.'
    const text3 = 'IMPORTANT: The "Calibration valid through" date shown above has been specified to us by this client. Falco Automation, LLC takes no position regarding the suitability or appropriateness of this interval.'
    const text4 = 'Calibration Report Status:'
    const text5 = 'PASS- Term used when compliance statement is given, and the measurement result is within accepted criteria.'
    const text6 = 'FAIL- Term used when compliance statement is given, and the measurement result falls out of accepted criteria. '
    const text7 = 'ADJUSTED- When adjustments are made to an instrument which changes the value of measurement from what was measured as found to new value. as left'

    const splitText1 = doc.splitTextToSize(text1, textWidth);
    const splitText2 = doc.splitTextToSize(text2, textWidth);
    const splitText3 = doc.splitTextToSize(text3, textWidth);
    const splitText4 = doc.splitTextToSize(text4, textWidth);
    const splitText5 = doc.splitTextToSize(text5, textWidth);
    const splitText6 = doc.splitTextToSize(text6, textWidth);
    const splitText7 = doc.splitTextToSize(text7, textWidth);
    doc.setFontSize(8);

    doc.text(splitText1, 10, 119);
    doc.text(splitText2, 10, 134);
    doc.text(splitText3, 10, 205);
    doc.text(splitText4, 10, 220);
    doc.text(splitText5, 10, 224);
    doc.text(splitText6, 10, 228);
    doc.text(splitText7, 10, 232);

    // Comments
    doc.autoTable({
        startY: 140,
        head: [["Comments"]],
        body: [
            //[calibration.comments],
        ].map(item => [item]), // Wrapping each item in another array
        headStyles: {
            fontSize: 9,
            cellPadding: 0.3,
            halign: 'center',
            fillColor: [255, 255, 255], 
            textColor: [0, 0, 0] 
        },
        bodyStyles: {
            fontSize: 8,
            cellPadding: 0.2,
            lineWidth: 0.5, // specify the line width for the table body
            lineColor: [0, 0, 225],
            minCellHeight: 30,
        },
        theme: 'plain',
        didDrawCell: (data) => {
            // If this is a head section cell and it is the last column
            if (data.section === 'head' ) {
                // The y position just below the cell
                let y = data.cell.y + data.cell.height;
                doc.setDrawColor(0, 0, 255);
                // Draw a line from the left edge of the cell to the right
                doc.line(data.cell.x, y, data.cell.x + data.cell.width, y);
            }
        },
        tableWidth: 180,
    });

    // Convert the date format
    //const dateParts = calibration.dateOfCalibration.split("T")[0].split("-");
    //const formattedDateofCalibration = `${dateParts[0]}-${dateParts[1]}-${dateParts[2]}`;
    //const dateParts2 = calibration.calibrationDueDate.split("T")[0].split("-");
    //const formattedCalibrationDueDate = `${dateParts2[0]}-${dateParts2[1]}-${dateParts2[2]}`;
    //const dateParts3 = calibration.createdAt.split("T")[0].split("-");
    //const formattedCalibrationCreatedAt = `${dateParts3[0]}-${dateParts3[1]}-${dateParts3[2]}`;
     // Sign Off
     doc.autoTable({
        startY: 175,
        head: [[{ content: "", colSpan: 6 }]],
        body: [
            //['Calibration Technician', calibration.calibrationTech, 'Technician Signature', '___________________', 'Date of Calibration', formattedDateofCalibration],
            //['', '', '', '', 'Calibration Due Date', formattedCalibrationDueDate],
            //['Reviewed By', '', 'Reviewer Signature', '___________________', 'Date Cert Issued',   formattedCalibrationCreatedAt],
        ],
        headStyles: {
            fontSize: 10,
            cellPadding: 0.3,
            fillColor: [255, 255, 255], 
            textColor: [0, 0, 0],
            halign: 'center',
        },
        bodyStyles: {
            fontSize: 8, 
            cellPadding: 0.2,
            halign: 'center',
        },
        theme: 'plain',
        tableWidth: 170,
    });


    doc.save(`Calibration_${calibration.calibration_id}.pdf`);
};
