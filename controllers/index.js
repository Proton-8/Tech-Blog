const router = require('express').Router();

const apiRoutes = require('./api');
const dashboardRoutes = require('./dashboard-routes');
const homeRoutes = require('./homeRoutes');
router.use('/dashboard', dashboardRoutes);
router.use('/', homeRoutes);
router.use('/api', apiRoutes);

module.exports = router;
