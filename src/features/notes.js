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
      { id: 6, title: "Sixth Note" },
      { id: 7, title: "Seventh Note" },
      { id: 8, title: "Eighth Note" },
      { id: 9, title: "Ninth Note" },
      { id: 10, title: "Tenth Note" },
      { id: 11, title: "Eleventh Note" },
      { id: 12, title: "Twelfth Note" },
      { id: 13, title: "Thirteenth Note" },
      { id: 14, title: "Fourteenth Note" },
      { id: 15, title: "Fifteenth Note" },
      { id: 16, title: "Sixteenth Note" },
      { id: 17, title: "Seventeenth Note" },
      { id: 18, title: "Eighteenth Note" },
    ],
    viewallToggle:false,
    navbarHeight:100,

  },
  reducers: {
    setActiveTitle: (state, action) => {
      state.activeTitle = action.payload;
    },
    setViewAllToggle: (state, action) => {
      state.viewallToggle = action.payload;
    },
    setNavbarHeight: (state, action) => {
      state.navbarHeight = action.payload;
    }

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
export const { setActiveTitle ,setViewAllToggle,setNavbarHeight} = notesSlice.actions;
export default notesSlice.reducer;
