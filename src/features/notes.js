import { createSlice } from "@reduxjs/toolkit";

const notesSlice = createSlice({
  name: "notes",
  initialState: {
    activeTitle: 0,
    titles: [
      { id: 1, title: "First Note" },
      { id: 2, title: "Second Note" },
      { id: 3, title: "Third Note" },
      { id: 4, title: "Fourth Note" },
      { id: 5, title: "Fifth Note" },
    ],
  },
  reducers: {
    setActiveTitle: (state, action) => {
      state.activeTitle = action.payload;
    },
  },
  extraReducers: (builder) => {
    // builder.addCase(checkLocalUser.fulfilled, (state, action) => {
    //   if (action.payload !== null) {
    //     state.data.find((item) => item.id == 6).name = "Account";
    //     state.data.find((item) => item.id == 6).link = "/account";
    //     state.data.find((item) => item.id == 7).name = "Logout";
    //     state.data.find((item) => item.id == 7).link = "/logout";
    //   }
    // });
  },
});
// export const getProducts = createAsyncThunk("product/get", async () => {
//   let data = await fetch("https://fakestoreapi.com/products");
//   let result = await data.json();
//   return result;
// });
export const { setActiveTitle } = notesSlice.actions;
export default notesSlice.reducer;
