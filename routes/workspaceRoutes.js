const express = require('express');
const { createWorkspace, getWorkspace } = require('../controllers/workspaceController');
const router = express.Router();

router.post('/', createWorkspace);
router.get('/', getWorkspace);

module.exports = router;