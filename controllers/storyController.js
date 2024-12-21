const Story = require('../models/story');
const { getUserDetailsByUsername } = require('../utils/apiClient');

// Create a new story
exports.createStory = async (req, res) => {
    const { username, title, content, short_content, tags, preview_img, img_link, badge, season } = req.body;

    try {
        // Log incoming request data for debugging purposes
        console.log(`Creating story for user: ${username}`);

        const user = await getUserDetailsByUsername(username);

        // Log user data
        console.log('Fetched user data:', user);

        if (!user) {
            // Return message if the user is not found
            return res.status(404).json({ message: 'User not found in User repo' });
        }

        const story = new Story({
            username,
            title,
            content,
            short_content,
            tags,
            preview_img,
            img_link,
            badge,
            season,
            month: new Date().toLocaleString('default', { month: 'long' }),
        });

        await story.save();

        res.status(201).json({ message: 'Story created successfully', story });
    } catch (error) {
        // Log the error for debugging
        console.error('Error creating story:', error.message);

        res.status(500).json({ message: 'Error creating story', error });
    }
};


// Get all stories
exports.getStories = async (req, res) => {
    try {
        const stories = await Story.find();
        res.status(200).json(stories); // Send an array of stories as the response
    } catch (error) {
        res.status(500).json({ message: 'Error fetching stories', error });
    }
};

// Get a single story by its ID
exports.getStory = async (req, res) => {
    const { storyId } = req.params;
    try {
        const story = await Story.findById(storyId);
        if (!story) {
            return res.status(404).json({ message: 'Story not found' });
        }
        res.status(200).json(story);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching story', error });
    }
};

// Update a story
exports.updateStory = async (req, res) => {
    const { storyId } = req.params;
    const { title, content, short_content, tags, preview_img, img_link, badge, season } = req.body;

    try {
        const story = await Story.findByIdAndUpdate(
            storyId,
            { title, content, short_content, tags, preview_img, img_link, badge, season },
            { new: true }
        );

        if (!story) return res.status(404).json({ message: 'Story not found' });
        res.status(200).json(story);
    } catch (error) {
        res.status(500).json({ message: 'Error updating story', error });
    }
};

// Delete a story
exports.deleteStory = async (req, res) => {
    const { storyId } = req.params;

    try {
        const story = await Story.findByIdAndDelete(storyId);
        if (!story) return res.status(404).json({ message: 'Story not found' });

        res.status(200).json({ message: 'Story deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting story', error });
    }
};
