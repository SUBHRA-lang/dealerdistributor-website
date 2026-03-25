import axios from 'axios';

const API = `${process.env.REACT_APP_BACKEND_URL || ''}/api`;

// Categories API
export const categoriesAPI = {
  getAll: () => axios.get(`${API}/categories`),
  getBySlug: (slug) => axios.get(`${API}/categories/${slug}`)
};

// Distributors API
export const distributorsAPI = {
  getAll: (params) => axios.get(`${API}/distributors`, { params }),
  getById: (id) => axios.get(`${API}/distributors/${id}`),
  getFeatured: () => axios.get(`${API}/distributors/featured`)
};

// Blog API
export const blogAPI = {
  getPosts: (params) => axios.get(`${API}/blog/posts`, { params }),
  getPostById: (id) => axios.get(`${API}/blog/posts/${id}`)
};

// Testimonials API
export const testimonialsAPI = {
  getAll: (params) => axios.get(`${API}/testimonials`, { params }),
  getFeatured: () => axios.get(`${API}/testimonials/featured`)
};

// Requirements API
export const requirementsAPI = {
  create: (data) => axios.post(`${API}/requirements`, data)
};

// Contact API
export const contactAPI = {
  submit: (data) => axios.post(`${API}/contact`, data)
};

// Newsletter API
export const newsletterAPI = {
  subscribe: (email) => axios.post(`${API}/newsletter/subscribe`, { email })
};

// Auth API
export const authAPI = {
  register: (data) => axios.post(`${API}/join`, data),
  login: (data) => axios.post(`${API}/signin`, data)
};

// Callback API
export const callbackAPI = {
  submit: (data) => axios.post(`${API}/callback`, data)
};

export default {
  categories: categoriesAPI,
  distributors: distributorsAPI,
  blog: blogAPI,
  testimonials: testimonialsAPI,
  requirements: requirementsAPI,
  contact: contactAPI,
  newsletter: newsletterAPI,
  auth: authAPI,
  callback: callbackAPI
};
