const axios = require('axios');

exports.getUserDetails = async (userId) => {
    try {
        const response = await axios.get(`${process.env.USER_SERVICE_URL}/users/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user details:', error.message);
        return null; // Return null if the request fails
    }
};
