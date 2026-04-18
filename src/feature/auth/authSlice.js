import { createSlice } from "@reduxjs/toolkit";

const userFromStorage = localStorage.getItem("user");

const initialState = {
  user: userFromStorage ? JSON.parse(userFromStorage) : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      console.log("user bilgisi", localStorage.getItem("user"));
      localStorage.removeItem("user");
      console.log("user silindi", localStorage.getItem("user"));
    },
  },
});

export const { loginSuccess, logout} =
  authSlice.actions;

export default authSlice.reducer;