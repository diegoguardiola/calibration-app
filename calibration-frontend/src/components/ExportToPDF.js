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
            [calibration.clientName],
            [calibration.clientAddress],
            [calibration.clientEmail],
            [calibration.clientPhone],
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
            ['350 Industrial Rd, San Carlos, CA 94070'],
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

     // Equipment Information
     doc.autoTable({
        startY: 60,
        head: [[{ content: "Equipment Information", colSpan: 2 }]],
        body: [
            ['Equipment Id', calibration.equipmentId],
            ['Equipment Manufacturer', calibration.equipmentManufacturer],
            ['Model Number', calibration.equipmentModelNumber],
            ['Serial Number', calibration.equipmentSerialNumber],
            ['Tolerance', calibration.equipmentTolerance],
            ['Unit', calibration.unit],
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
        },
        theme: 'plain',
        tableWidth: 70,
    });
    
    // Calibration Equipment Information
    doc.autoTable({
        startY: 60,
        margin: { left: 125 },
        head: [[{ content: "Equipment Information", colSpan: 2 }]],
        body: [
            ['Calibration Method', calibration.calibrationMethod],
            ['Calibration Procedure', calibration.calibrationProcedure],
            ['Calibration Tool Id', calibration.calibrationToolId],
            ['Manufacturer', calibration.calibrationToolManufacturer],
            ['Model Number', calibration.calibrationToolMN],
            ['Serial Number', calibration.calibrationToolSN],
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
            halign: 'right',
        },
        theme: 'plain',
        tableWidth: 70,
    });

        // Results and Line
        doc.autoTable({
            startY: 89,
            head: [["Calibration Results"]],
            body: [
                [''],
            ].map(item => [item]), // Wrapping each item in another array
            headStyles: {
                fontSize: 9,
                cellPadding: 0.3,
                halign: 'center',
                fillColor: [255, 255, 255], 
                textColor: [0, 0, 0] 
            },
            bodyStyles: {
                cellPadding: 0.2,
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

        // Calibration Results
        doc.autoTable({
            startY: 94,
            head: [['Setpoint', 'As Found', 'As Left']],
            body: [
                
                [calibration.setpoint1, calibration.asFound1, calibration.asLeft1],
                [calibration.setpoint2, calibration.asFound2, calibration.asLeft2],
                [calibration.setpoint3, calibration.asFound3, calibration.asLeft3],
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
            
            tableWidth: 170,
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
            [calibration.comments],
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

     // Sign Off
     doc.autoTable({
        startY: 175,
        head: [[{ content: "", colSpan: 6 }]],
        body: [
            ['Calibration Technician', calibration.calibrationTech, 'Technician Signature', '___________________', 'Date of Calibration', calibration.dateOfCalibration],
            ['Reviewed By', '', 'Reviewer Signature', '___________________', 'Calibration Due Date', calibration.calibrationDueDate],
            ['', '', '', '', 'Date Cert Issued',  calibration.createdAt],
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
