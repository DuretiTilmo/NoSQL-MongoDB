const { User, Thought } = require('../models');

module.exports = {
    // Get all users
    getUsers(req, res) {
      User.find()
        .then((users) => res.json(users))
        .catch((err) => res.status(500).json(err));
    },
      // Get a single user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
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
        User.findByIdAndDelete({ _id: req.params.userId })
        .then((user) => 
        !user
        ? res.status(404).json({ message: 'No user with that Id'})
        : Thought.deleteMany({ _id: { $in: user.thoughts }})
        )
        .then(() => res.json({ message: 'User and associated thoughts deleted!'}))
        .catch((err) => res.status(500).json(err));
    },
// delete a user by its id
deleteUser(req, res) {
  User.findOneAndRemove({ _id: req.params.UserId })
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

    // add a friend
    addFriend(req, res) {
      User.findByIdAndUpdate(
        { _id: req.params.friendId },
        { $addToSet: { friends: req.body }  },
        { runValidators: true, new: true}
      )
      .then((friends) => 
      !friends
      ? res.status(404).json()
      : res.json(friends)
      )
      .catch((err) =>{
        res.status(500).json(err);
      });
    },
    // remove a friend
    removeFriend(req, res) {
      User.findByIdAndUpdate(
        { _id: req.params.friendId },
        { $pull: { friends: { friendId: req.params.friendId } } },
        { runValidators: true, new: true}
      )
      .then((friends) => 
      !friends
      ? res.status(404).json({message: 'No friend found with this ID'})
      : res.json(friends)
      )
      .catch((err) => res.status(500).json(err));
    }
    };