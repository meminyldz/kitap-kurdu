import { configureStore } from "@reduxjs/toolkit";
import bookReducer from "../feature/books/bookSlice";
import authRedducer from "../feature/auth/authSlice";

const store = configureStore({
  reducer: {
    books: bookReducer,
    auth: authRedducer
  },
});

export default store;