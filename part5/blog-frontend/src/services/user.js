import axios from "axios";

const baseUrl = "/api/users";
import PropTypes from "prop-types";

const getUser = async (id) => {
    const response = await axios.get(`${baseUrl}/${id}`);
    return response.data;
};

const getAllUsers = async () => {
    const response = await axios.get(`${baseUrl}/`);
    return response.data;
};

const shape = {
    username: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
};

export default { baseUrl, getUser, getAllUsers, shape };
