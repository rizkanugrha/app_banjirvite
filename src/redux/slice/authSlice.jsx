import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://demo-api.syaifur.io/api/login",
        credentials
      );

      if (response.data.code === 200) {
        localStorage.setItem("authToken", response.data.data.token);
        return response.data.data;
      }
      return rejectWithValue(response.data.message);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "An error occurred"
      );
    }
  }
);

export const logoutUser = createAsyncThunk("auth/logout", async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) {
      throw new Error("No token found");
    }

    const response = await axios.post(
      "http://demo-api.syaifur.io/api/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data.code === 200) {
      localStorage.removeItem("authToken");
      return response.data;
    }
    return rejectWithValue(response.data.message);
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "An error occurred");
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: localStorage.getItem("authToken"),
    status: "idle",
    error: null,
    success: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.status = "idle";
      localStorage.removeItem("authToken");
    },
    resetStatus: (state) => {
      state.status = "idle";
      state.error = null;
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.success = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.token = action.payload.token;
        state.success = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        state.success = null;
      });
  },
});

export const { logout, resetStatus } = authSlice.actions;
export default authSlice.reducer;
