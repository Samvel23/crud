import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllUsers = createAsyncThunk("users/get", async () => {
  const { data } = await axios.get("http://localhost:3000/users");
  return data;
});
export const deleteUser = createAsyncThunk("users/delete", async (id) => {
  await axios.delete(`http://localhost:3000/users/${id}`);
  return id;
});
export const addUser = createAsyncThunk("users/add", async (user) => {
  const { data } = await axios.post("http://localhost:3000/users", user);
  return data;
});
export const updateUser = createAsyncThunk("user/update", async (user) => {
  const { data } = await axios.put(
    `http://localhost:3000/users/${user.id}`,
    user
  );
  return data;
});
const UserSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    isLoading: false,
  },
  reducers: {
    setUsers(state, action) {
      state.users = action.payload;
    },
    deleteUserFromArray(state, action) {
      deleteUser(action.payload).then(() => {
        state.users = state.users.filter((user) => user.id !== action.payload);
      });
    },
    addUserToArray(state, action) {
        addUser(action.payload).then((user) => {
            state.users = [...state.users, user];
        })
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.isLoading = false;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user.id !== action.payload);
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.users = [...state.users, action.payload]
      })
  },
});

export const userReducer = UserSlice.reducer;
export const { setUsers, deleteUserFromArray, addUserToArray } = UserSlice.actions;
