const router = require('express').Router();

// Import the Thought model
const { Thought } = require('../models');

// API Routes
// GET all thoughts
async getAllThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

// // GET a single thought by ID
// router.get('/:id', (req, res) => {

// });

// // POST create a new thought
// router.post('/', (req, res) => {

// });

// // PUT update a thought by ID
// router.put('/:id', (req, res) => {

// });

// // DELETE remove a thought by ID
// router.delete('/:id', (req, res) => {

// });

// Export the router
module.exports = router;
