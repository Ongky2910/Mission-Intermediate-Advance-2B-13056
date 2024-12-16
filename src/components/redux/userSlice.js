import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getData } from '../hooks/apiService';
import {
  fetchSavedAccountsThunk,
  editUserThunk,
  deleteAccountThunk,
} from './reducer';

// State awal
const initialState = {
  savedAccounts: [],
  loading: false,
  error: null,
  selectedAccount: null,
};


const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setSelectedAccount: (state, action) => {
      state.selectedAccount = action.payload; // Perbarui akun yang dipilih
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
      })
      .addCase(editUserThunk.fulfilled, (state, action) => {
        console.log("Edit berhasil:", action.payload);
        state.savedAccounts = state.savedAccounts.map((account) =>
          account.id === action.payload.id ? action.payload : account
        );
      })
      .addCase(deleteAccountThunk.fulfilled, (state) => {
        state.loading = false;
      });
  },
});

// Thunks


export default userSlice.reducer;

export { fetchSavedAccountsThunk, editUserThunk, deleteAccountThunk };