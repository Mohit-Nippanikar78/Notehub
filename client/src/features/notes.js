import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { serverUrl } from "../components/elements/hooks";

const notesSlice = createSlice({
  name: "notes",
  initialState: {
    editor: false,
    activeTitleId: 0,
    heads: { data: [], hasMore: true },
    doc: {
      loading: false,
      docId: 0,
      head: "",
      data: [],
      shorturl: { data: "", unique: true },
      saving: false,
    },
    viewallToggle: false,
    navbarHeight: 100,
  },
  reducers: {
    setEditor: (state, action) => {
      state.editor = action.payload;
    },
    setactiveTitleId: (state, action) => {
      state.activeTitleId = action.payload;
      state.viewallToggle = false;
      //action.payload !== 0 && (state.doc.docId = action.payload);
    },
    setViewAllToggle: (state, action) => {
      state.viewallToggle = action.payload;
    },
    setNavbarHeight: (state, action) => {
      state.navbarHeight = action.payload;
    },
    changeText: (state, action) => {
      let { id, type, text } = action.payload;
      if (type == "con") {
        state.doc.data.find((item) => item.id == id).con = text;
      } else if (type == "title") {
        state.doc.data.find((item) => item.id == id).title = text;
      }
    },
    setDocData: (state, action) => {
      let { id, fields, shorturl, head } = action.payload;
      return {
        ...state,
        doc: {
          docId: id,
          head,
          data: fields,
          shorturl: { data: shorturl },
          loading: false,
        },
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getNoteHeads.fulfilled, (state, action) => {
      let { data, hasMore } = action.payload;

      return {
        ...state,
        heads: { data: [...state.heads.data, ...data], hasMore },
      };
    });
    builder
      .addCase(getNoteFields.pending, (state, action) => {
        state.doc.data = [];
        state.doc.loading = true;
      })
      .addCase(getNoteFields.fulfilled, (state, action) => {
        let { id, fields, shorturl, head } = action.payload;
        return {
          ...state,
          doc: {
            docId: id,
            head,
            data: fields,
            shorturl: { data: shorturl },
            loading: false,
          },
        };
      });
    builder.addCase(newNote.fulfilled, (state, action) => {
      let { id, head, fields, shorturl } = action.payload;
      console.log({
        docId: id,
        head,
        loading: false,
        data: fields,
        shorturl: { data: shorturl, unique: true },
      });
      return {
        ...state,
        heads: {
          data: [{ id, head }, ...state.heads.data],
          hasMore: state.heads.hasMore,
        },
        doc: {
          ...state.doc,
          docId: id,
          head,
          loading: false,
          data: fields,
          shorturl: { data: shorturl },
        },
        activeTitleId: id,
      };
    });
    builder.addCase(updateNotehead.fulfilled, (state, action) => {
      let { id, head } = action.payload;
      state.heads.data.find((item) => item.id == id).head = head;
    });
    builder
      .addCase(updateShorturl.pending, (state) => {
        state.doc.saving = true;
      })
      .addCase(updateShorturl.fulfilled, (state, action) => {
        let { id, shorturl, unique } = action.payload;
        state.doc.saving = false;
        state.doc.shorturl = { data: shorturl, unique };
      });
    builder.addCase(newField.fulfilled, (state, action) => {
      state.doc.data.push(action.payload);
    });
    builder.addCase(deleteNote.fulfilled, (state, action) => {
      let { deletedId } = action.payload;
      state.doc.data = [];
      state.activeTitleId = 0;
      state.heads.data = state.heads.data.filter(
        (item) => item.id != deletedId
      );
    });
    builder
      .addCase(updateField.pending, (state) => {
        state.doc.saving = true;
      })
      .addCase(updateField.fulfilled, (state, action) => {
        action.payload.status == "OK" && (state.doc.saving = false);
      });
    builder.addCase(deleteField.fulfilled, (state, action) => {
      let { deletedBoxId } = action.payload;
      state.doc.data = state.doc.data.filter((item) => item.id != deletedBoxId);
    });
  },
});
export const {
  setactiveTitleId,
  setViewAllToggle,
  setNavbarHeight,
  addDocField,
  setEditor,
  changeText,
  setDocData,
} = notesSlice.actions;
export const getNoteHeads = createAsyncThunk("notes/get", async (page) => {
  let res = await axios.get(`${serverUrl}/notes/heads?page=${page}`);
  return res.data;
});
export const getNoteFields = createAsyncThunk("fields/get", async (id) => {
  let res = await axios.get(`${serverUrl}/notes/note/fields/${id}`);
  return res.data;
});
export const newNote = createAsyncThunk("notes/add", async () => {
  let res = await axios.post(`${serverUrl}/notes/add`);
  return res.data;
});

export const updateNotehead = createAsyncThunk(
  "noteshead/update",
  async (note) => {
    let res = await axios.put(`${serverUrl}/notes/note/${note.id}?type=head`, {
      head: note.head,
    });
    return res.data;
  }
);
export const updateShorturl = createAsyncThunk(
  "notesshorturl/update",
  async (note) => {
    let res = await axios.put(
      `${serverUrl}/notes/note/${note.id}?type=shorturl`,
      { shorturl: note.shorturl }
    );
    return res.data;
  }
);

//Adding Codebox or Textbox to a note
export const newField = createAsyncThunk("field/add", async (obj) => {
  let { noteId, type } = obj;
  let res = await axios.post(
    `${serverUrl}/notes/note/${noteId}/field?type=${type}`
  );
  return res.data;
});
//Deleting a note
export const deleteNote = createAsyncThunk("note/delete", async (id) => {
  let res = await axios.delete(`${serverUrl}/notes/note/${id}`);
  console.log(res.data);
  return res.data;
});
//updating a Codebox or Textbox
export const updateField = createAsyncThunk("field/update", async (obj) => {
  let { noteId, boxId, type, text, ele } = obj;
  let res = await axios.put(
    `${serverUrl}/notes/note/${noteId}/field/${boxId}?type=${type}&element=${ele}`,
    { text }
  );

  return res.data;
});
//Deleting a Codebox or Textbox
export const deleteField = createAsyncThunk("field/delete", async (obj) => {
  let { noteId, boxId, type } = obj;
  console.log(obj);
  let res = await axios.delete(
    `${serverUrl}/notes/note/${noteId}/field/${boxId}?type=${type}`
  );
  return res.data;
});

export default notesSlice.reducer;
