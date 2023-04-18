import axios from "axios";
const URL = process.env.REACT_APP_BACKEND_URL;

// POST request API to make a new product
export async function createProduct(body) {
    try {
        const reqUrl = `${URL}/api/products/create-new`;
        const result = await axios.post(reqUrl, { body });
        if (result) {
            return result;
        }
    } catch (error) {
        console.log(error);
    }
}

// GET request API to get list of all products, by a category as parameter
export async function getProductsByCategory(category) {
    try {
        const reqUrl = `${URL}/api/products/discover/${category}`;
        const result = await axios.get(reqUrl);
        if (result) {
            return result.data;
        }
    } catch (error) {
        console.log(error);
    }
}

// GET request API to get product by its ID
export async function getProductById(id) {
    try {
        const reqUrl = `${URL}/api/products/${id}`;
        const result = await axios.get(reqUrl);
        if (result) {
            return result.data;
        }
    } catch (error) {
        console.log(error);
    }
}

// PUT Request API to update a products details
export async function updateProductDetails(id, body) {
    try {
        const reqUrl = `${URL}/api/products/update/${id}`;
        const result = await axios.put(reqUrl, { body });
        if (result) {
            return result.data;
        }
    } catch (error) {
        console.log(error);
    }
}

// POST request API to add a comment for a particular product
export async function commentOnProduct(id, comment) {
    try {
        const reqUrl = `${URL}/api/products/comment/${id}`;
        const result = await axios.post(reqUrl, { comment });
        if (result) {
            return result.data;
        }
    } catch (error) {
        console.log(error);
    }
}

// GET request API to upvote a particlar product using its ID
export async function upvoteProduct(id) {
    try {
        const reqUrl = `${URL}/api/products/upvote/${id}`;
        const result = await axios.get(reqUrl);
        if (result) {
            return result.data;
        }
    } catch (error) {
        console.log(error);
    }
}

// GET request to get list of categories
export async function getAllCategories() {
    try {
        const reqUrl = `${URL}/api/categories/all`;
        const result = await axios.get(reqUrl);
        if (result) {
            return result.data;
        }
    } catch (error) {
        console.log(error);
    }
}
