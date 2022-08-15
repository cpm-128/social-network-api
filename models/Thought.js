const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');


const ReactionSchema = new Schema (
    {
        // set a custom id, instead of default _id, to avoid confusion with parent Thought_id
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            trim: true,
            minlength: 1,
            maxlength: 280,
            required: 'You must enter a message for your thought that does not exceed 280 characters.'
        },
        username: {
            type: String,
            trim: true,
            required: 'You must enter your username.'
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        }
    }
)

const ThoughtSchema = new Schema (
    {
        thoughtText: {
            type: String,
            trim: true,
            minlength: 1,
            maxlength: 280,
            required: 'You must enter a message for your thought that does not exceed 280 characters.'
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        },
        username: {
            type: String,
            trim: true,
            required: 'You must enter your username.'
        },
        // populate associated reactions
        // reactions are nexted directly, not referred to
        reactions: [ReactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        }
    }
);

// VIRTUAL: total count of reactions per thought
ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;