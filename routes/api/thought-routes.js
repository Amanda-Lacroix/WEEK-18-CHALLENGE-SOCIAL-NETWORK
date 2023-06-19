const router = require('express').Router();
// Import the User and Thought models
const { User, Thought } = require('../../models');

// API Routes

// GET all thoughts
router.get('/', async (req, res) => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET a single thought by ID
router.get('/:id', async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.id);
    if (!thought) {
      res.status(404).json({ message: 'Thought not found' });
      return;
    }
    res.json(thought);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// POST create a new thought
router.post('/', async (req, res) => {
  try {
    const thought = await Thought.create(req.body);
    const user = await User.findById(thought.userId);
    user.thoughts.push(thought._id);
    await user.save();
    res.json(thought);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// PUT update a thought by ID
router.put('/:id', async (req, res) => {
  try {
    const thought = await Thought.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!thought) {
      res.status(404).json({ message: 'Thought not found' });
      return;
    }
    res.json(thought);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// DELETE remove a thought by ID
router.delete('/:id', async (req, res) => {
  try {
    const thought = await Thought.findByIdAndDelete(req.params.id);
    if (!thought) {
      res.status(404).json({ message: 'Thought not found' });
      return;
    }
    const user = await User.findById(thought.userId);
    user.thoughts.pull(thought._id);
    await user.save();
    res.json(thought);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// POST create a reaction to a thought
router.post('/:thoughtId/reactions', async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    if (!thought) {
      res.status(404).json({ message: 'Thought not found' });
      return;
    }
    thought.reactions.push(req.body);
    const savedThought = await thought.save();
    res.json(savedThought);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// DELETE remove a reaction from a thought
router.delete('/:thoughtId/reactions/:reactionId', async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    if (!thought) {
      res.status(404).json({ message: 'Thought not found' });
      return;
    }
    thought.reactions.pull({ _id: req.params.reactionId });
    const savedThought = await thought.save();
    res.json(savedThought);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;

