import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { serverUrl } from "../components/elements/hooks";

const notesSlice = createSlice({
  name: "notes",
  initialState: {
    editor: true,
    activeTitleId: 0,
    heads: { data: [], hasMore: true },
    doc: { loading: false, data: [], saving: false },
    viewallToggle: false,
    navbarHeight: 100,
  },
  reducers: {
    setEditor: (state, action) => {
      state.editor = action.payload;
    },
    setactiveTitleId: (state, action) => {
      state.activeTitleId = action.payload;
    },
    setViewAllToggle: (state, action) => {
      state.viewallToggle = action.payload;
    },
    setNavbarHeight: (state, action) => {
      state.navbarHeight = action.payload;
    },
    addDocField: (state, action) => {
      let { type } = action.payload;
      if (type == "Codebox") {
        state.doc.push({ id: 12, type: "Codebox", con: "Your code here" });
      } else if (type == "Textbox") {
        state.doc.push({ id: 13, type: "Textbox", con: "Your text here" });
      }
    },
    changeText: (state, action) => {
      let { id, type, text } = action.payload;
      if (type == "con") {
        state.doc.data.find((item) => item.id == id).con = text;
      } else if (type == "title") {
        state.doc.data.find((item) => item.id == id).title = text;
      }
    },
    changeHead: (state, action) => {
      console.log(action.payload);
      let { text } = action.payload;
      state.heads.find((item) => item.id == state.activeTitleId).head = text;
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
        return { ...state, doc: { loading: true, data: [] } };
      })
      .addCase(getNoteFields.fulfilled, (state, action) => {
        return { ...state, doc: { data: action.payload, loading: false } };
      });
    builder.addCase(newNote.fulfilled, (state, action) => {
      let { id, head, fields } = action.payload;
      console.log(action.payload);
      return {
        ...state,
        heads: {
          data: [{ id, head }, ...state.heads.data],
          hasMore: state.heads.hasMore,
        },
        doc: { loading: false, data: fields },
        activeTitleId: id,
      };
    });
    builder.addCase(updateNotehead.fulfilled, (state, action) => {
      let { id, head } = action.payload;
      state.heads.data.find((item) => item.id == id).head = head;
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
  changeHead,
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
    console.log(note);
    let res = await axios.put(
      `${serverUrl}/notes/note/${note.id}?type=head`,
      note
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
