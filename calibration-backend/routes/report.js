const express = require('express');
const {
    create,
    findAll,
    findAllByClientCompany,
    findOne,
    update
} = require('../controllers/reportController')
const {requireAuth} = require('../middleware/requireAuth')

const router = express.Router()

router.use(requireAuth)

router.post('/create', create)
router.get('/find-all', findAll)
router.get('/:companyName/find-all-by-company', findAllByClientCompany);
router.get('/:reportId', findOne)
router.put('/update/:reportId', update)


module.exports = router;