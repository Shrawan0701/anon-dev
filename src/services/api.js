import axios from "axios";

const API = process.env.REACT_APP_API_URL;

// Posts
export const fetchPosts = (sort) => axios.get(`${API}/posts?sort=${sort}`);
export const fetchPostsByCompany = (company) => axios.get(`${API}/posts/company/${company}`);
export const upvotePost = (id) => axios.put(`${API}/posts/${id}/upvote`);
export const downvotePost = (id) => axios.put(`${API}/posts/${id}/downvote`);
export const addPost = (data) => axios.post(`${API}/posts`, data);
export const reportPost = (id) => axios.put(`${API}/posts/${id}/report`);

// Comments
export const fetchComments = (postId) => axios.get(`${API}/comments/${postId}`);
export const addComment = (postId, data) => axios.post(`${API}/comments/${postId}`, data);


export const upvoteComment = (id) => axios.put(`${API}/comments/${id}/upvote`);
export const downvoteComment = (id) => axios.put(`${API}/comments/${id}/downvote`);
