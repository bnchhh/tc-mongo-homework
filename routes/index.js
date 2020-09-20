const userRoutes = require('./user.route');
const articleRoutes = require('./article.route');

const express = require('express');
const router = express.Router();

router.use('/user', userRoutes);
router.use('/article', articleRoutes);

module.exports = router;
