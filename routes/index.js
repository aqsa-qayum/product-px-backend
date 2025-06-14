
const express = require('express');
const authRouter = require('./authRoutes');
const workspaceRouter = require('./workspaceRoutes');
const userRouter = require('./userRoutes');
const dbRouter = require('./dbConnectionRoutes');
const mapRouter = require('./mappingRoutes');

const router = express.Router();

router.get('/', function (req, res) {
    res.status(200).json({
        status: 200,
        success: true,
        message: 'Welcome to Backend APIs',
        data: {},
    });
});

router.use('/auth', authRouter);
router.use('/workspace', workspaceRouter);
router.use('/users', userRouter);
router.use('/dbconnections', dbRouter);
router.use('/mapping', mapRouter);

module.exports = router;