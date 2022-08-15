const { Thought, User } = require('../models');

const thoughtController = {
// ========
// THOUGHTS
// ========

    // CREATE/POST new thought that BELONGS to a user (user is the parent)
    // push the created thought_id to the associated user's [thoughts]
    addThought({ params, body }, res) {
        console.log('>> addThought body >>', body);
        Thought.create(body)
            .then(({ _id }) => {
                console.log('>> thought id >>', _id)
                console.log('>> user _id >>', body.userId)
                return User.findOneAndUpdate(
                    { _id: body.userId },
                    { $push: { thoughts: _id } },
                    { new: true }
                );
            })
            .then(dbAddThoughtData => {
                if (!dbAddThoughtData) {
                    res.status(404).json({ message: 'No user found with thid id.' });
                    return;
                }
                res.json(dbAddThoughtData);
            })
            .catch(err => res.json(err));
    },

    // GET all thoughts
    getAllThought(req, res) {
        Thought.find({})
        .select('-__v')
        .sort({ _id: -1 })
        .then(dbAllThoughtData => res.json(dbAllThoughtData))
        .catch(err => {
            console.log('>> ERROR: dbAllThoughtData >>', err);
            res.status(400).json(err);
        });
    },

    // GET single thought by _id
    getSingleThought({ params }, res) {
        Thought.findOne({ _id: params.id })
        .select('-__v')
        .then(dbSingleThoughtData => {
            if (!dbSingleThoughtData) {
                res.status(404).json({ message: 'No thought found with this id.' });
                return;
            }
            res.json(dbSingleThoughtData);
        })
        .catch(err => {
            console.log('>> ERROR: dbSingleThoughtData >>', err);
            res.status(400).json(err);
        });
    },

    // UPDATE/PUT single thought by _id
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(dbUpdateThoughtData => {
                if (!dbUpdateThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id.' });
                    return;
                }
                res.json(dbUpdateThoughtData);
            })
            .catch(err => res.status(400).json(err));
    },

    // DELETE thought by _id
    // then use its id to REMOVE it from the user it's associated with
    removeThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
            .then(deletedThought => {
                console.log('>> thought: params.id >>', params.id)
                if (!deletedThought) {
                    return res.status(404).json({ message: 'No thought found with this id.' });
                }
                return User.findOneAndUpdate(
                    //TODO: THE USERID IS NOT IN THE PARAMS
                    { _id: params.userId },
                    { $pull: { thoughts: params.thoughtId } },
                    { new: true }
                );
            })
            .then(dbRemoveThoughtData => {
                if (!dbRemoveThoughtData) {
                    res.status(404).json({ message: 'No user found with this id.' });
                    return;
                }
                res.json(dbRemoveThoughtData);
            })
            .catch(err => res.json(err));
    },

// =========
// REACTIONS
// =========
    // CREATE/POST a reaction on a thought
    addReaction({ params, body}, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: {reactions: body } },
            { new: true, runValidators: true }
        )
            .then(dbAddReactionData => {
                if (!dbAddReactionData) {
                    res.status(404).json({ message: 'No user found with this id.' });
                    return;
                }
                res.json(dbAddReactionData);
            })
            .catch(err => res.json(err));
    },

    // DELETE a reaction from a thought
    removeReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            // remove the specific reaction from the reactions array where the reactionId matches the value of the params.reactionId passed in from the route
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true }
        )
            .then(dbRemoveReactionData => res.json(dbRemoveReactionData))
            .catch(err => res.json(err));
    }
};

module.exports = thoughtController;