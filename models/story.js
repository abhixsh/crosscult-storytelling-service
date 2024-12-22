const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
    username: { type: String, required: true }, // User is identified by their username
    title: { type: String, required: true },
    content: { type: String, required: true },
    short_content: { type: String },
    tags: { type: [String] },
    preview_img: { type: String },
    img_link: { type: String },
    badge: { type: String },
    season: { type: String },
    month: { type: String },
    posted_date: { type: Date, default: Date.now },
    country: { type: String },
});

const Story = mongoose.model('Story', storySchema);

module.exports = Story;
