const Story = require('../models/story');
const { getUserDetails } = require('../utils/apiClient');

// Create a new story
exports.createStory = async (req, res) => {
    const { user_id, title, content, short_content, tags, preview_img, img_link, badge, season } = req.body;

    try {
        // Verify user exists in the User repo
        const user = await getUserDetails(user_id);
        if (!user) {
            return res.status(404).json({ message: 'User not found in user repo' });
        }

        // Create and save the story
        const story = new Story({
            user_id,
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
        res.status(500).json({ message: 'Error creating story', error: error.message });
    }
};

// Get all stories
exports.getStories = async (req, res) => {
    try {
        const stories = await Story.find();

        // Add user details to each story
        const storiesWithUsers = await Promise.all(
            stories.map(async (story) => {
                const user = await getUserDetails(story.user_id);
                return {
                    ...story._doc,
                    user: user || { name: 'Unknown User', username: 'N/A' },
                };
            })
        );

        res.status(200).json(storiesWithUsers);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching stories', error: error.message });
    }
};

// Get a single story by ID
exports.getStory = async (req, res) => {
    const { storyId } = req.params;

    try {
        const story = await Story.findById(storyId);
        if (!story) return res.status(404).json({ message: 'Story not found' });

        const user = await getUserDetails(story.user_id);

        res.status(200).json({
            ...story._doc,
            user: user || { name: 'Unknown User', username: 'N/A' },
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching story', error: error.message });
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
