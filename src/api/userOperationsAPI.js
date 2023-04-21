import axios from "axios";
const URL = process.env.REACT_APP_BACKEND_URL;

// POST request API to register a new user
export async function registerUser(body) {
    try {
        const reqUrl = `${URL}/api/users/register`;
        const result = axios.post(reqUrl, body);
        if (result) {
            return result;
        }
    } catch (error) {
        console.log(error);
    }
}

// POST request API to login a user
export async function loginUser(body) {
    try {
        const reqUrl = `${URL}/api/users/login`;
        const result = axios.post(reqUrl, body);
        if (result) {
            return result;
        }
        return result;
    } catch (error) {
        console.log(error);
    }
}

// Private route to create product
export async function privateRoute(token, body) {
    try {
        const reqUrl = `${URL}/api/products/new`;
        const result = axios.post(
            reqUrl,
            { body },
            { headers: { Authorization: `Bearer ${token}` } }
        );

        return result;
    } catch (error) {
        console.log(error);
    }
}

// TODO private route to update/edit product
