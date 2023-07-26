import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toggleDarkClasses } from "../components/elements/hooks";
const userSlice = createSlice({
  name: "user",
  initialState: {
    theme: "dark",
  },
  reducers: {
    setTheme: (state, action) => {
      if (["light", "dark"].includes(action.payload)) {
        state.theme = action.payload;
        toggleDarkClasses(action);
        localStorage.setItem("theme", action.payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getInitTheme.fulfilled, (state, action) => {
      state.theme = action.payload;
      toggleDarkClasses(action);
    });
  },
});
export const getInitTheme = createAsyncThunk("theme/initial", async () => {
  let data = localStorage.getItem("theme");
  if (data === null) {
    localStorage.setItem("theme", "light");
    return "light";
  }
  return data;
});

export const { setTheme } = userSlice.actions;
export default userSlice.reducer;
