const router = require('express').Router();

// import the controller methods
const {
    getAllUser,
    getSingleUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
} = require('../../controllers/user-controller');

// set up GET all and POST at /api/users
router
    .route('/')
    .get(getAllUser)
    .post(createUser);

// set up GET single, PUT, and DELETE at /api/users/:id
router
    .route('/:id')
    .get(getSingleUserById)
    .put(updateUser)
    .delete(deleteUser);

// set up PUT and DELETE at /api/users/:userId/friends/:friendId
router
    .route('/:userId/friends/:friendId')
    .put(addFriend)
    .delete(removeFriend);

module.exports = router;