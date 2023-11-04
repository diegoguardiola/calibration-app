const Report = require('../models/reportModel'); // Adjust the path to where your model is located


// Create and Save a new Report
const create = async (req, res) => {


    // Create a Report
    const {
        equipment,
        instrument,
        results,
        client,
    } = req.body
    
    // Save Report in the database
    try {
        const user_id = req.user._id
        const reportData = await Report.create({
            equipment,
            instrument,
            results,
            client,
            user_id
        })
        res.status(200).json(reportData);
    } catch (error) {
      res.status(400).json({error: error.message});
    }
};



// Retrieve all Reports from the database
/*const findAll = async (req, res) => {
    try {
        const reports = await Report.find();
        res.send(reports);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving reports."
        });
    }
};*/

const findAll = async (req, res) => {
    const user_id = req.user._id

  const reports = await Report.find({ user_id }).sort({ createdAt: -1 })
  
    res.status(200).json(reports)
}

// Select client by company name and return all data associated with the client
const findAllByClientCompany = async (req, res) => {
    const companyName = req.query.companyName;
  
    try {
        const clients = await Report.find({ company: companyName });
        res.json(clients);
    } catch (error) {
        console.error("Error fetching clients by company:", error);
        res.status(500).send("Internal Server Error");
    }
  };
  


// Find a single Report with a reportId
const findOne = async (req, res) => {
    const reportId = req.params.reportId;

    try {
        const report = await Report.findById(reportId);
        if (!report) {
            return res.status(404).send({
                message: "Report not found with id " + reportId
            });
        }
        res.send(report);
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Report not found with id " + reportId
            });
        }
        return res.status(500).send({
            message: "Error retrieving report with id " + reportId
        });
    }
};

// Update a Report identified by the reportId in the request
const update = async (req, res) => {
    const reportId = req.params.reportId;

    // Validate Request
    if (!req.body) {
        return res.status(400).send({
            message: "Report content can't be empty!"
        });
    }

    try {
        const report = await Report.findByIdAndUpdate(reportId, req.body, { new: true });
        if (!report) {
            return res.status(404).send({
                message: "Report not found with id " + reportId
            });
        }
        res.send(report);
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Report not found with id " + reportId
            });
        }
        return res.status(500).send({
            message: "Error updating report with id " + reportId
        });
    }
};

// Delete a Report with the specified reportId in the request
/*const delete = async (req, res) => {
    const reportId = req.params.reportId;

    try {
        const report = await Report.findByIdAndRemove(reportId);
        if (!report) {
            return res.status(404).send({
                message: "Report not found with id " + reportId
            });
        }
        res.send({ message: "Report deleted successfully!" });
    } catch (err) {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Report not found with id " + reportId
            });
        }
        return res.status(500).send({
            message: "Could not delete report with id " + reportId
        });
    }
};*/

module.exports = {create, findAll, findOne, update, findAllByClientCompany}
