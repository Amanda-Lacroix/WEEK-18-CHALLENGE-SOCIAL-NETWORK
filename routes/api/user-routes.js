const router = require('express').Router();
// Import the User and Thought models
const { User, Thought, Reaction } = require('../../models');

// GET all users
router.get('/', async (req, res) => {
	try {
	  const users = await User.find();
	  res.json(users);
	} catch (err) {
	  console.log(err);
	  res.status(500).json(err);
	}
  });
  
  // GET a single user by ID
  router.get('/:id', async (req, res) => {
	try {
	  const user = await User.findById(req.params.id).populate('thoughts').populate('friends');
	  if (!user) {
		res.status(404).json({ message: 'User not found' });
		return;
	  }
	  res.json(user);
	} catch (err) {
	  console.log(err);
	  res.status(500).json(err);
	}
  });
  
  // POST create a new user
  router.post('/', async (req, res) => {
	try {
	  const user = await User.create(req.body);
	  res.json(user);
	} catch (err) {
	  console.log(err);
	  res.status(500).json(err);
	}
  });
  
  // PUT update a user by ID
  router.put('/:id', async (req, res) => {
	try {
	  const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
	  if (!user) {
		res.status(404).json({ message: 'User not found' });
		return;
	  }
	  res.json(user);
	} catch (err) {
	  console.log(err);
	  res.status(500).json(err);
	}
  });
  
  // DELETE remove a user by ID
  router.delete('/:id', async (req, res) => {
	try {
	  const user = await User.findByIdAndDelete(req.params.id);
	  if (!user) {
		res.status(404).json({ message: 'User not found' });
		return;
	  }
	  // BONUS: Remove associated thoughts
	  await Thought.deleteMany({ username: user.username });
	  res.json(user);
	} catch (err) {
	  console.log(err);
	  res.status(500).json(err);
	}
  });
  
  module.exports = router;
