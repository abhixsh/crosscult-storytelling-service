const axios = require('axios');

// Fetch user details by username
exports.getUserDetailsByUsername = async (username) => {
    try {
        const response = await axios.get(`${process.env.USER_SERVICE_URL}/users/username/${username}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user details:', error.message);
        return null;
    }
};
