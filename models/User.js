const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
    {
        username: {
            type: String,
            trim: true,
            unique: true,
            required: 'You must enter a username.'
        },
        email: {
            type: String,
            trim: true,
            unique: true,
            required: 'You must enter a valid email address.',
            match: /.+\@.+\..+/
        },
        // an array of _id values referencing the Though model
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        // an array of _id values self-referencing the User model
        // a vritual called friendCount retrieves the length of the user's friends array field on query
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
             }
        ]
    },
    // access the virtuals
    {
        toJson: {
            virtuals: true
        },
        id: false
    }
);

// total count of friends on retrieved user
UserSchema.virtual('friendCount').get(function() {
    return this.friends.reduce((total, friend) => total + friend.length + 1, 0);
});

// create the User model using the UserSchema
const User = model('User', UserSchema);

// export the User model
module.exports = User;