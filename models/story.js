const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
    user_id: { type: String, required: true },
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
});

const Story = mongoose.model('Story', storySchema);

module.exports = Story;
