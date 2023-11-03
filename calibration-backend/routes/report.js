const express = require('express');
const {
    create,
    findAll,
    findAllByClient
} = require('../controllers/reportController')
const {requireAuth} = require('../middleware/requireAuth')

const router = express.Router()

router.use(requireAuth)

router.post('/create', create)
router.get('/find-all', findAll)
router.get('/find-by-client/:user_id', findAllByClient);


module.exports = router;