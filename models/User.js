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
            // validate: [validateEmail, 'Please fill a valid email address'],
            // match: /.+\@.+\..+/
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
    id: false,

}
);

userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
  });

//   var validateEmail = function(email) {
//     var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//     return re.test(email)
// };
const User = model('user', userSchema);

module.exports = User;