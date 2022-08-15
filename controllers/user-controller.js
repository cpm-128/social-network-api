const { User } = require('../models');

const userController = {

    // GET all users method
    getAllUser(req, res) {
        // referencing the User model using the mongoose 'find' method
        User.find({})
        // populate the thoughts with the thoughtBody, not just the thoughtId
        //TODO: uncomment out the populate callback when the 'thoughts' path exists
        // .populate({
        //     path: 'thoughts',
        //     select: '-__v'
        // })
        .select('-__v')
        // // mongoose sort method, descending by id aka newest first
        .sort({ _id: -1 })
        .then(dbAllUserData => res.json(dbAllUserData))
        .catch(err => {
            console.log('>> ERROR: dbAllUserData >>', err);
            res.status(400).json(err);
        });
    },

    // GET single user by id method
    getSingleUserById({ params }, res) {
        User.findOne({ _id: params.id })
        // populate the thoughts with the thoughtBody
        //TODO: uncomment out the populate callback when the 'thoughts' path exists
        // .populate({
        //     path: 'thoughts',
        //     select: '-__v'
        // })
        .select('-__v')
        .then(dbSingleUserData => {
            // if no user, send 404 error
            if (!dbSingleUserData) {
                res.status(404).json({ message: 'No user found with this id.' });
                return;
            }
            res.json(dbSingleUserData);
        })
        .catch(err => {
            console.log('>> ERROR: dbSingleUserData >>', err);
            res.status(400).json(err);
        });
    },

    // CREATE user
    createUser({ body }, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(400).json(err));
    },

    // PUT UPDATE single user by id
    updateUser({ params, body }, res) {
        // new: true is necessary to return the updated document/object. else, returns original
        // where clause must be first (id), then the updated data (body)
        // include the validators that were put in place in the model
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true})
            .then(dbUpdateUserData => {
                if (!dbUpdateUserData) {
                    res.status(404).json({ message: 'No user found with this id.' });
                    return;
                }
                res.json(dbUpdateUserData);
            })
            .catch(err => res.status(400).json(err));
    },

    // DELETE single user by id
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(dbDeleteUserData => {
                if (!dbDeleteUserData) {
                    res.status(404).json({ message: 'No user found with this id.' });
                    return;
                }
                res.json(dbDeleteUserData);
            })
            .catch(err => res.status(400).json(err));
    }
};

module.exports = userController;