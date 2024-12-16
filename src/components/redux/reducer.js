import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getData,
  addUser,
  updateUserProfile,
  deleteUserProfile,
} from '../hooks/apiService';

// Thunk untuk mengambil semua data pengguna
export const fetchSavedAccountsThunk = createAsyncThunk('user/fetchSavedAccounts', async () => {
  const response = await getData();
  console.log("Response dari API:", response);
  return response;
});

// Thunk untuk menambahkan pengguna
export const addUserThunk = createAsyncThunk('user/addUser', async (user) => {
  const response = await addUser(user);
  return response;
});

// Thunk untuk mengedit pengguna
export const editUserThunk = createAsyncThunk(
  'user/editUser',
  async ({ id, user }) => {
    const response = await updateUserProfile(id, user);
    return response;
  }
);

// Thunk untuk menghapus pengguna
export const deleteAccountThunk = createAsyncThunk(
  'user/deleteAccount',
  async (id, { dispatch }) => {
    console.log("Menghapus akun dengan id:", id);
    await deleteUserProfile(id);
    dispatch(fetchSavedAccountsThunk());
    return id;
  }
);


// State awal
const initialState = {
  userData: [],
  loading: false,
  error: null,
};

// Membuat slice dengan Redux Toolkit

const userSlice = createSlice({
  name: 'user',
  initialState: {
    savedAccounts: [],
    loading: false,
    error: null,
    selectedAccount: null,
  },
  reducers: {
    setSelectedAccount: (state, action) => {
      state.selectedAccount = action.payload; // Memperbarui akun yang dipilih
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSavedAccountsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSavedAccountsThunk.fulfilled, (state, action) => {
        state.savedAccounts = action.payload;
        state.loading = false;
      })
      .addCase(fetchSavedAccountsThunk.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export const { setSelectedAccount } = userSlice.actions;

export default userSlice.reducer;
