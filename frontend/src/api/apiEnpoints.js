import BASE_URL from "./apiConfig";

export const apiEndpoints = {
  GET_BOOKS: `${BASE_URL}/book`,
  GET_BOOK_DETAILS: (id) => `${BASE_URL}/book/${id}`,
SEARCH_BOOKS: (query) => `${BASE_URL}/book/search?query=${query}`,
    ADD_BOOK: `${BASE_URL}/book`,
    SIGNUP: `${BASE_URL}/user/signup`,
    LOGIN: `${BASE_URL}/user/login`,
    ADD_TO_CART: `${BASE_URL}/cart/add`,
    GET_USER_PROFILE: (userId) => `${BASE_URL}/user/${userId}`,
    GET_USER_ORDERS: (userId) => `${BASE_URL}/user/${userId}/orders`,
    GET_CART_ITEMS: (userId) => `${BASE_URL}/cart/${userId}`,
    UPDATE_CART_ITEM: (userId, itemId) => `${BASE_URL}/cart/update/${userId}/${itemId}`,
    REMOVE_FROM_CART: (userId, itemId) => `${BASE_URL}/cart/remove/${userId}/${itemId}`,
    
};