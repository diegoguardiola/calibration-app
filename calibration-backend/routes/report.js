const express = require('express');
const {
    create,
    findAll,
    findAllByClientCompany
} = require('../controllers/reportController')
const {requireAuth} = require('../middleware/requireAuth')

const router = express.Router()

router.use(requireAuth)

router.post('/create', create)
router.get('/find-all', findAll)
router.get('/:companyName/find-all-by-company', findAllByClientCompany);


module.exports = router;