const router = require('express').Router();
const userRoutes = require('./userRoutes');
const blogRoutes = require('./blogRoutes');
const postRoute = require('./postRoutes');
const dashboardRoutes = require('./dashboardRoutes')
// router options
router.use('/users', userRoutes);
router.use('/blogs', blogRoutes);
router.use('/posts', postRoute);
router.use('/dashboard', dashboardRoutes);
module.exports = router;
