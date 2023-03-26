const { Thought, User, Reaction } = require("../models");

module.exports = {
  // get all thoughts
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  // get thoughts by its id
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought found with that ID" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // create a new thought
  // createThought(req, res) {
  //   Thought.create(req.body)
  //     .then((thought) =>{
  //       return User.findOneAndUpdate(
  //         { _id: req.body.userId },
  //         { $addToSet: { thougths: thought._id} },
  //         { new: true }
  //       );
  //     })
  //     .then((user) => 
  //     !user
  //     ? res.status(404).json({ message: 'No user found with this id'})
  //     : res.json('Created a thought!')
  //     )
  //     .catch((err) => {
  //       console.log(err);
  //       return res.status(500).json(err);
  //     });
  // },

  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  },

  // update a single thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought found with that ID" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  // delete a thought by its id
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought found with that ID" })
          : User.findOneAndUpdate(
              { thoughts: req.params.thoughtId },
              { $pull: { thoughts: req.params.thoughtId } },
              { new: true }
            )
      )
      .then(() => res.json({ message: "Thought deleted!" }))
      .catch((err) => res.status(500).json(err));
  },
  // Add a reaction
  createReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thoughts with this id!" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  // delete a reaction by its id
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with this id!" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
};
