const express = require('express');
const {
    create,
    update
} = require('../controllers/reportController')

const router = express.Router()

router.post('/create', create)

module.exports = router;