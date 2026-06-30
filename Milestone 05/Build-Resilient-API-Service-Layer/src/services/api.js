import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// =======================
// Request Interceptor
// =======================
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// =======================
// Response Interceptor
// =======================
api.interceptors.response.use(
  (response) => response,

  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          console.warn("Global 401 handler triggered");
          break;

        case 403:
          console.warn("Access Forbidden");
          break;

        default:
          if (error.response.status >= 500) {
            console.error("Server Error");
          }
      }
    }

    return Promise.reject(error);
  }
);

// =======================
// Product APIs
// =======================

export const getProducts = () =>
  api.get("/products");

export const getCategories = () =>
  api.get("/products/categories");

export const getProduct = (id) =>
  api.get(`/products/${id}`);

export const getCategoryProducts = (category) =>
  api.get(`/products/category/${category}`);

// =======================
// Cart APIs
// =======================

export const addToCart = (data) =>
  api.post("/carts", data);

export const getCart = () =>
  api.get("/carts/user/1");

export const removeCart = (id) =>
  api.delete(`/carts/${id}`);

// =======================
// User APIs
// =======================

export const getUser = () =>
  api.get("/users/1");

export const updateUser = (data) =>
  api.put("/users/1", data);

export const submitReview = (data) =>
  api.post("/users", data);

export default api;