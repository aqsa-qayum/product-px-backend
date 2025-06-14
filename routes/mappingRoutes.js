const express = require('express');
const router = express.Router();
const mappingController = require('../controllers/mappingController');

router.post('/', mappingController.createMapping);
router.get('/:userId', mappingController.getMappingsByUser);
router.put('/:userId', mappingController.updateMapping);
router.delete('/:userId', mappingController.deleteMapping);

module.exports = router;
