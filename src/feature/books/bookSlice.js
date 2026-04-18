import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  books: [],
  selectedBook: null,
};

const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    addBook: (state, action) => {
      state.books.push(action.payload);
    },

    updateBook: (state, action) => {
      const index = state.books.findIndex(
        (book) => book.id === action.payload.id
      );
      if (index !== -1) {
        state.books[index] = action.payload;
      }
    },

    deleteBook: (state, action) => {
      state.books = state.books.filter(
        (book) => book.id !== action.payload
      );
    },

    selectBook: (state, action) => {
      state.selectedBook = action.payload;
    },
  },
});

export const { addBook, updateBook, deleteBook, selectBook } =
  bookSlice.actions;

export default bookSlice.reducer;