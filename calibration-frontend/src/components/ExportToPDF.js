// pdfExport.js
import { jsPDF } from "jspdf";
import 'jspdf-autotable'; // plugin for creating tables
import logo from '../assets/logo.png';

export const exportToPDF = (calibration) => {
    const doc = new jsPDF();

    // Logo
    doc.addImage(logo, 'PNG', 87, 5, 50, 20);

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
            ['Equipment Manufacturer', calibration.equipmentManufacturer],
            ['Model Number', calibration.equipmentModelNumber],
            ['Serial Number', calibration.equipmentSerialNumber],
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
            ['Calibration Tool', calibration.calibrationTool],
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
            startY: 85,
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
        startY: 100,
        head: [[{ content: "{Procedure} – (Method}", colSpan: 3 }]],
        body: [
            ['Setpoint', 'As Found', 'As Left'],
            [calibration.setpoint, calibration.asFound, calibration.asLeft],
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
        
        tableWidth: 170,
    });

    //Pass/Fail Statements
    const textWidth = 365; // Desired width for text wrapping
    const text1 = 'Statements of Pass or Fail Conformance: The uncertainty of the measurement has been considered when determining compliance with specification. All measurements and test results guard banded to ensure the probability of false-accepts does not exceed {guard percent} in compliance with {standard}';
    const text2 = 'Field Environmental Conditions: Temperature: between 17 and 23 degrees Celsius; rate of change not to exceed 1.0 C per hour. Relative humidity: from 30 to 70%. These conditions satisfy NIST requirements.'

    const splitText1 = doc.splitTextToSize(text1, textWidth);
    const splitText2 = doc.splitTextToSize(text2, textWidth);
    doc.setFontSize(8);

    doc.text(splitText1, 10, 125);
    doc.text(splitText2, 10, 140);


    doc.save(`Calibration_${calibration.calibration_id}.pdf`);
};
