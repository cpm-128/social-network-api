const router = require('express').Router();
const apiRoutes = require('./api');

// add prefix of /api to all the api routes imported from the api dir
router.use('/api', apiRoutes);

router.use((req, res) => {
    res.status(404).json({ message: '>> 404 Error <<' });
});

module.exports = router;