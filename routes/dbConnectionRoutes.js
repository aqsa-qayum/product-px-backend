const express = require('express');
const { createDB, getDBs, getPostgresDBStructure  } = require('../controllers/dbConnectionController');
const router = express.Router();

router.post('/', createDB);
router.get('/', getDBs);
router.post('/get-postgres-structure', getPostgresDBStructure);

module.exports = router;