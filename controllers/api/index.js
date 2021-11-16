const router = require('express').Router();
const userRoutes = require('./userRoutes');
const blogRoutes = require('./blogRoutes');
const postRoute = require('./postRoutes');
// router options
router.use('/users', userRoutes);
router.use('/blogs', blogRoutes);
router.use('/posts', postRoute);
module.exports = router;
