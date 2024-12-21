const express = require('express');
const router = express.Router();
const {
    createStory,
    getStories,
    getStory,
    updateStory,
    deleteStory,
} = require('../controllers/storyController');

router.post('/', createStory);
router.get('/', getStories);
router.get('/:storyId', getStory);
router.put('/:storyId', updateStory);
router.delete('/:storyId', deleteStory);

module.exports = router;
