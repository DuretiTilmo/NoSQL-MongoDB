const { Schema, model } = require('mongoose');
// const userSchema = require('./User');
const reactionSchema = require('./Reaction');

const thoughtSchema = new Schema(
{ 
        thoughtText: {
            type: String,
            required: true,
            maxLength: 280,
        },

        createdAt: {
            type: Date,
            get: (date) => timeSince(date),
          
        },

        username: {
            type: String,
            required: true,            
        },
        
        reactions: [reactionSchema],

},
{
    toJSON: {
      virtuals: true,
    },
    id: false,

}
);
reactionSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
  });

const Thought = model('thought', thoughtSchema);

module.exports = Thought;