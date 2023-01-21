import axios from "./axios";

//get category wise products
export const getCategoryProducts = async (Category) => {
    return await axios.get(`/product/get-category-products/${Category}`)
};

