import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const ApiBanjir = "https://api.tugas-cool.my.id/geni";

// Fetch all Banjir data
export const fetchBanjir = createAsyncThunk("banjir/fetchBanjir", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(ApiBanjir);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Error fetching data.");
  }
});

// Add Banjir data
export const addBanjir = createAsyncThunk("banjir/addBanjir", async (newBanjir, { rejectWithValue }) => {
  try {

    const response = await axios.post(ApiBanjir, newBanjir);

    return response.data;
  } catch (error) {
    console.error("Error dari backend:", error.response?.data || error.message);
    return rejectWithValue(error.response?.data?.message || "Error adding data.");
  }
});


// Update Banjir data
export const updateBanjir = createAsyncThunk(
  "banjir/updateBanjir",
  async ({ id, changes }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`${ApiBanjir}/${id}`, changes);
      return { id, changes: response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Error updating data.");
    }
  }
);

// Delete Banjir data
export const deleteBanjir = createAsyncThunk("banjir/deleteBanjir", async (id, { rejectWithValue }) => {
  try {
    await axios.delete(`${ApiBanjir}/${id}`);
    return id;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Error deleting data.");
  }
});


const banjirSlice = createSlice({
  name: "banjir",
  initialState: {
    data: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBanjir.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload || [];
      })
      .addCase(addBanjir.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(updateBanjir.fulfilled, (state, action) => {
        const { id, changes } = action.payload;
        const index = state.data.findIndex((item) => item._id === id); // Gunakan _id
        if (index !== -1) {
          state.data[index] = { ...state.data[index], ...changes };
        }
      })
      .addCase(deleteBanjir.fulfilled, (state, action) => {
        state.data = state.data.filter((item) => item._id !== action.payload); // Gunakan _id
      });
  },
});


export default banjirSlice.reducer;
