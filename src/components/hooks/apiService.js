import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL || 'https://default-api-url.com';
console.log("Requesting URL:", `${apiUrl}/users`);


// Hanya tampilkan log ini jika sedang dalam mode pengembangan (development)
if (import.meta.env.MODE === 'development') {
  console.log("Requesting URL:", `${apiUrl}/users`);

}

// Set up the axios instance with base URL
const api = axios.create({
  baseURL: apiUrl,  // Gunakan apiUrl yang sudah didefinisikan
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;

// Interceptor for requests
api.interceptors.request.use(
  (config) => {
    // Menambahkan token autentikasi ke header jika ada
    const token = localStorage.getItem('authToken'); // Ambil token dari localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.warn('No auth token found, request may fail');
    }

    console.log("Request API URL: ", apiUrl); // Menampilkan URL yang digunakan

    return config;
  },
  (error) => {
    // Log jika ada error di request
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Interceptor for responses
api.interceptors.response.use(
  (response) => {
    // Log informasi response untuk debug (hanya di dev)
    if (import.meta.env.MODE === 'development') {
      console.log('Response:', response);
    }
    return response;
  },
  (error) => {
    // Cek jika ada error respons dari server
    if (error.response) {
      if (error.response.status === 401 || error.response.status === 403) {
        // Jika statusnya Unauthorized atau Forbidden
        console.error('Unauthorized access: Please login again');
        
        // Hapus token yang sudah tidak valid
        localStorage.removeItem('authToken');   
        // Arahkan user ke halaman login
        window.location.href = '/login'; // Ganti sesuai dengan route login aplikasi kamu
      }
      console.error(`Error response status: ${error.response.status}`);
    } else if (error.request) {
      // Jika tidak ada response (masalah jaringan atau server tidak merespon)
      console.error('Network Error:', error.message);
    } else {
      // Jika ada error lainnya
      console.error('Unknown Error:', error.message);
    }

    return Promise.reject(error);
  }
);

// CRUD functions

/**
 * Fetch user data (GET) by ID
 * @param {string} userId - The ID of the user to fetch.
 * @returns {Promise<object>} - The user data.
 */
export const fetchUserData = async (userId) => {
  try {
    const response = await api.get(`/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};

/**
 * Update user profile (PUT)
 * @param {string} userId - The ID of the user to update.
 * @param {object} data - The new data for the user profile.
 * @returns {Promise<object>} - The updated user data.
 */
export const updateUserProfile = async (userId, data) => {
  try {
    const response = await api.put(`/users/${userId}`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating user data:', error);
    throw error;
  }
};

export const saveUserProfile = async (userId, updatedProfile) => {
  try {
    const response = await api.put(`/users/${userId}`, updatedProfile);
    return response.data;
  } catch (error) {
    console.error('Error saving user profile:', error);
    throw error;
  }
};

// Menyimpan perubahan profil pengguna ke server
const saveProfile = async () => {
  const updatedProfile = { username, email, avatar, packageType, isSubscribed };
  
  try {
    const response = await api.put(`/users/${selectedAccount.id}`, updatedProfile);
    setSavedAccounts(response.data); // Menyimpan data terbaru di state
  } catch (error) {
    console.error('Error updating profile:', error);
  }
};

/**
 * Delete user profile (DELETE)
 * @param {string} userId - The ID of the user to delete.
 * @returns {Promise<object>} - Success message after deletion.
 */
export const deleteUserProfile = async (userId) => {
  try {
    const response = await api.delete(`/users/${userId}`);
    return { success: true, message: 'User deleted successfully' }; // Return success message
  } catch (error) {
    console.error('Error deleting user data:', error);
    throw error; // Return error untuk diproses lebih lanjut oleh calling function
  }
};

// ADD, UPDATE, DELETE Example API Functions

/**
 * Add a new user (POST)
 * @param {object} data - The user data to add.
 * @returns {Promise<object>} - The newly created user data.
 */
export const addUser = async (data) => {
  try {
    const response = await api.post('/users', data);
    return response.data;
  } catch (error) {
    console.error('Error adding user:', error);
    throw error;
  }
};

/**
 * Update a specific post (PUT)
 * @param {string} postId - The ID of the post to update.
 * @param {object} data - The new data for the post.
 * @returns {Promise<object>} - The updated post data.
 */
export const updatePost = async (postId, data) => {
  try {
    const response = await api.put(`/posts/${postId}`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating post:', error);
    throw error;
  }
};

/**
 * Delete a specific post (DELETE)
 * @param {string} postId - The ID of the post to delete.
 * @returns {Promise<object>} - Success message after deletion.
 */
export const deletePost = async (postId) => {
  try {
    const response = await api.delete(`/posts/${postId}`);
    return { success: true, message: 'Post deleted successfully' }; // Return success message
  } catch (error) {
    console.error('Error deleting post:', error);
    throw error;
  }
};
