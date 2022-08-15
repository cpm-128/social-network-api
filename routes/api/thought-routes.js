const router = require('express').Router();

// import the controller methods
const {
    addThought,
    getAllThought,
    getSingleThought,
    updateThought,
    removeThought,
    addReaction,
    removeReaction
} = require('../../controllers/thought-controller');

// set up GET all and POST at /api/thoughts
router
    .route('/')
    .get(getAllThought)
    .post(addThought);

// set up GET single, PUT, and DELETE at api/thoughts/:id
router
    .route('/:id')
    .get(getSingleThought)
    .put(updateThought)
    .delete(removeThought);

// set up POST and DELETE for reactions at /api/thoughts/:thoughtId/reactions
router
    .route('/:thoughtId/reactions')
    .post(addReaction)
    .delete(removeReaction);

module.exports = router;