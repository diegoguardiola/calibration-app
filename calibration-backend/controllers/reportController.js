const Report = require('../models/reportModel'); // Adjust the path to where your model is located


// Create and Save a new Report
const create = async (req, res) => {
    // Validate request
    if (!req.body) {
        return res.status(400).send({
            message: "Report content can't be empty!"
        });
    }

    // Extract user token from the request headers
    const userToken = req.headers.authorization && req.headers.authorization.split(' ')[1];

    if (!userToken) {
        return res.status(401).send({
            message: "Authorization token is missing!"
        });
    }

    // Note: You might want to validate or use the userToken here as needed

    // Create a Report
    const report = new Report({
        equipment: req.body.equipment,
        instrument: req.body.instrument,
        results: req.body.results,
        client: req.body.client,
        // You can also add the userToken to the report if needed
        // userToken: userToken
    });
    
    // Save Report in the database
    try {
        const data = await report.save();
        res.send(data);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Report."
        });
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

module.exports = {create, findAll, findOne, update}
