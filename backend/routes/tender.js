const express = require('express');
const {
    createTender,
    getTenders,
    getTender,
    updateTender,
    deleteTender
} = require('../controllers/tenderController');

const router = express.Router();

router.get('/', getTenders);

router.get('/:id', getTender);

router.post('/', createTender);

router.delete('/:id', deleteTender);

router.patch('/:id', updateTender);

module.exports = router;