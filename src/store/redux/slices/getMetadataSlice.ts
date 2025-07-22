import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchMetadata } from '../../api/getMetadataAPI';

interface MetadataState {
  loading: boolean;
  data: any | null;
  error: string | null;
}

const initialState: MetadataState = {
  loading: false,
  data: null,
  error: null,
};

export const getMetadataThunk = createAsyncThunk(
  'metadata/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchMetadata();
      return response;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data?.message || err.message);
    }
  }
);

const getMetadataSlice = createSlice({
  name: 'metadata',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMetadataThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMetadataThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(getMetadataThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default getMetadataSlice.reducer;
