const express = require('express');
const {
    create,
    findAll
} = require('../controllers/reportController')
const {requireAuth} = require('../middleware/requireAuth')

const router = express.Router()

router.use(requireAuth)

router.post('/create', create)
router.get('/find-all', findAll)

module.exports = router;