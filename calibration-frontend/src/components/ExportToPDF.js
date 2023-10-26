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
            lineColor: [0, 0, 153],
        },
        didDrawCell: (data) => {
            // If this is a head section cell and it is the last column
            if (data.section === 'head' ) {
                // The y position just below the cell
                let y = data.cell.y + data.cell.height;
                doc.setDrawColor(0, 0, 153);
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
                doc.setDrawColor(0, 0, 153);
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
                doc.setDrawColor(0, 0, 153);
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
            doc.setDrawColor(0, 0, 153);
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
    //Footer
    doc.autoTable({
        startY: 268,
        head: [[{ content: "", colSpan: 2 }]],
        body: [
           ['2689 Citrus Rd Suite D, Rancho Cordova, CA 95742']
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
                doc.setDrawColor(0, 0, 153);
                doc.setLineWidth(0.78); // Set the line thickness to 1 (or any other value you prefer)
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
    const tableData = [];
    calibration.results.tests.forEach(test => {
      // Insert a new row for the test method
      tableData.push([{ content: test.method, colSpan: 8, styles: { 
        fontStyle: 'bold', 
        halign: 'center',
        fillColor: [179, 175, 174], 
    } }]);
      // Map over the testPoints and add them to the tableData
      const testPointsData = test.testPoints.map(point => [
        test.type, // Assuming you want to include the test type as "Function/Range"
        point.nominal,
        point.asFound,
        point.asLeft,
        point.result,
        point.min,
        point.max,
        test.unit // Assuming you want to include the test unit
      ]);
      tableData.push(...testPointsData);
    });
    const tableStyles = {
        borderColor: [0, 0, 0], 
        fillColor: [255, 255, 255],   
        textColor: [0, 0, 0], 
    };
    const cellStyles = {
        lineWidth: 0.3, // Line width for cell borders
        lineColor: [0, 0, 0], // Black cell border color
        halign: 'center'
    };
    doc.autoTable({
        startY: 35,
        head: [['Function/Range', 'Nominal Value', 'As Found', 'As Left', 'Result', 'Min', 'Max', 'Units']],
        body: tableData,
        headStyles: {
            fontSize: 9,
            cellPadding: 0.3,
            textColor: [255, 255, 255],
            borderColor: [0, 0, 0], 
            fillColor: [4, 31, 132], 
            lineColor: [0, 0, 0],
            halign: 'center'
        },
        bodyStyles: {
            fontSize: 8, 
            cellPadding: 0.2,
            lineColor: [0, 0, 153],
        },
        styles: tableStyles,
        columnStyles: {
            0: cellStyles,
            1: cellStyles,
            2: cellStyles,
            3: cellStyles,
            4: cellStyles,
            5: cellStyles,
            6: cellStyles,
            7: cellStyles,
        },
        didDrawCell: (data) => {
            if (data.row.section === 'head') {
              doc.setDrawColor(0); // Set border color to black
              doc.setLineWidth(0.3); // Set border width
              doc.rect(data.cell.x, data.cell.y, data.cell.width, data.cell.height);
            }
          },
        theme: 'plain',
        tableWidth: 180,
    });

    //Footer
    
    doc.save(`Calibration_${calibration.calibration_id}.pdf`);
};
