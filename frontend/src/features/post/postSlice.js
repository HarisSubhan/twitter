import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { reset } from "../auth/authSlice";
import { postTweet } from "./postService";

const initialState = {
  post: [],
  myPost: [],
  postLoading: false,
  postSuccess: false,
  postError: false,
  postMessage: "",
};

export const uploadTweet = createAsyncThunk(
  "post/add-tweet",
  async (tweetData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await postTweet(tweetData, token);
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    postReset: (state) => {
      state.postLoading = false;
      state.postSuccess = false;
      state.postError = false;
      state.postMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadTweet.pending, (state) => {
        state.postLoading = true;
      })
      .addCase(uploadTweet.rejected, (state, action) => {
        state.postLoading = false;
        state.postError = true;
        state.postError = true;
      })
      .addCase(uploadTweet.fulfilled, (state, action) => {
        state.postLoading = false;
        state.postSuccess = true;
        state.posts.push(action.payload);
      });
  },
});

export const { postReset } = postSlice.actions;
export default postSlice.reducer;