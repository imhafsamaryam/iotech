import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { fetchAllContent, ContentData } from "../../api/contentApi";

export interface ContentState {
  data: Record<string, ContentData | undefined>;
  loading: boolean;
  error: string | null;
}

const initialState: ContentState = {
  data: {},
  loading: true,
  error: null,
};

export const loadContent = createAsyncThunk<
  { locale: string; data: ContentData },
  string
>("content/loadContent", async (locale) => {
  const data = await fetchAllContent(locale);
  return { locale, data };
});

const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadContent.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        loadContent.fulfilled,
        (
          state,
          action: PayloadAction<{ locale: string; data: ContentData }>
        ) => {
          state.loading = false;
          state.data[action.payload.locale] = action.payload.data;
        }
      )
      .addCase(loadContent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to load content";
      });
  },
});

export default contentSlice.reducer;
