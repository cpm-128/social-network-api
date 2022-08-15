// import all the API routes to prefix their endpoint names and package them all up

const router = require('express').Router();
const userRoutes = require('./user-routes');

// add prefixe of /users to routes created in user-routes.js
router.use('/users', userRoutes);

module.exports = router;