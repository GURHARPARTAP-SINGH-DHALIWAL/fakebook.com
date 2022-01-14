const API_ROOT='http://codeial.codingninjas.com:8000/api/v2';
// Urls are made functions as sometimes we need to pass parameters
export const API_Urls = {
  login: () => `${API_ROOT}/users/login`,
  signup: () => `${API_ROOT}/users/signup`,
  editProfile: () => `${API_ROOT}/users/edit`,
  userProfile: (id) => `${API_ROOT}/users/${id}`,
  fetchFriends: () => `${API_ROOT}/friendship/fetch_user_friends`,
  createPost: () => `${API_ROOT}/posts/create`,
  addComment: () => `${API_ROOT}/comments`,
  toggleLike: (id, likeType) => `${API_ROOT}/likes/toggle?likeable_id=${id}&likeable_type=${likeType}`,
  addFriend: (userId) =>
    `${API_ROOT}/friendship/create_friendship?user_id=${userId}`,
  removeFriend: (userId) =>
    `${API_ROOT}/friendship/remove_friendship?user_id=${userId}`,
  fetchPosts: (page = 1, limit = 5) =>
    `${API_ROOT}/posts?page=${page}&limit=${limit}`,
};