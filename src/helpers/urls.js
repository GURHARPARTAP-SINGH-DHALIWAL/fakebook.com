const API_ROOT='http://codeial.codingninjas.com:8000/api/v2';
// Urls are made functions as sometimes we need to pass parameters
export const API_Urls = {
  login: () => `${API_ROOT}/users/login`,
  signup: () => `${API_ROOT}/users/signup`,
  editProfile: () => `${API_ROOT}/users/edit`,
  userProfile: (id) => `${API_ROOT}/users/${id}`,
  fetchFriends:()=>`${API_ROOT}/friendship/fetch_user_friends`,
  fetchPosts: (page = 1, limit = 5) =>
    `${API_ROOT}/posts?page=${page}&limit=${limit}`,
};