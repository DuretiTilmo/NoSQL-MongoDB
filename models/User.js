const { Schema, model } = require('mongoose');

const userSchema = new Schema(
{ 
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            // validate: 
        },

        thoughts: [
            {
            type: Schema.Types.ObjectId,
            ref: 'Thought',
            },
        ],

        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            }
        ],

},
{
    toJSON: {
      virtuals: true,
    },
}
);

// friendCount.virtual('friends').get(function(){ 
//     return this.friends;
// })
const User = model('user', userSchema);

module.exports = User;