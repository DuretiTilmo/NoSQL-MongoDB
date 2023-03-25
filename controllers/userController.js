const { User, Thought } = require('../models');

module.exports = {
    // Get all users
    getUsers(req, res) {
      User.find()
        // .populate({ path: 'thoughts', select: '-__v'})
        .then((users) => res.json(users))
        .catch((err) => res.status(500).json(err));
    },
      // Get a single user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
    // .populate({ path: 'thoughts', select: '-__v'})
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
    // create a new user
    createUser(req, res) {
        User.create(req.body)
          .then((user) => res.json(user))
          .catch((err) => res.status(500).json(err));
      },

      // delete a user and associated thoughts
deleteUser(req, res) {
  User.findOneAndRemove({ _id: req.params.userId })
  .then((user) =>
  !user
  ? res.status(404).json({ message: 'No User found with that ID'})
  : Thought.findOneAndUpdate(
      { users: req.params.userId },
      { $pull: { users: req.params.userId }},
      { new: true}
      )
  )
  .then((thought) =>
  !thought
  ? res.status(404).json()
  : res.json({ message: 'User deleted!'})
  )
  .catch((err) => res.status(500).json(err));
},
// update a user
updateUser(req, res) {
  User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true}
  )
  .then((user) =>
  !user
  ? res.status(404).json({ message: 'No user found with that ID'})
  : res.json(user)
  )
  .catch((err) => res.status(500).json(err));
},
      // add a new friend
  addFriend(req, res) {
    User.create(req.body)
      .then((friends) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $addToSet: { friends: req.body.friendId } },
          { new: true }
        );
      })
      .then((user) =>
      !user
        ? res
            .status(404)
            .json()
        : res.json('Added a Friend🎉')
    )
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
},
    // remove a friend
    removeFriend(req, res) {
      User.findOneAndDelete(
        { _id: req.params.friendId },

        { $pull: { friends: req.params.friendId }  },
        { new: true}
      )
      .then((user) => 
      !user
      ? res.status(404).json({message: 'No friend found with this ID'})
      : User.deleteOne({ _id: { $in: user.friends } } )
      )
      .then(() => res.json({ message: 'Friend removed!'}))
      .catch((err) => res.status(500).json(err));
    }
    };