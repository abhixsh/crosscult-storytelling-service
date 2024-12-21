const axios = require('axios');

// Fetch user details by username
exports.getUserDetailsByUsername = async (username) => {
    try {
        const response = await axios.get(`${process.env.USER_SERVICE_URL}/users/username/${username}`);
        return response.data;  // Assuming this API endpoint gives you a user object with name, username, etc.
    } catch (error) {
        console.error('Error fetching user details:', error.message);
        return null;  // Return null if user fetching fails
    }
};
