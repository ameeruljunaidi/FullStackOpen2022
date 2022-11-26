import axios from "axios";
import { info } from "../utils/logger";

const baseUrl = "api/login";

const login = async (credentials) => {
    const response = await axios.post(baseUrl, credentials);
    info("user logged in");
    return response.data;
};

export default { login };
