import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk for creating a user
export const createuser = createAsyncThunk("user/createuser", async (data) => {
  try {
    const response = await fetch(
      'https://66b9b486fa763ff550f93227.mockapi.io/reduxtoolkit',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }
    );
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    throw new Error("Failed to create user");
  }
});

// Async thunk for showing users
export const showuser = createAsyncThunk("user/showuser", async () => {
  try {
    const response = await fetch(
      'https://66b9b486fa763ff550f93227.mockapi.io/reduxtoolkit'
    );
    const result = await response.json();
    console.log("result", result);
    return result;
  } catch (error) {
    throw new Error("Failed to fetch users");
  }
});

const initialState = {
  user: [],
  getusers: [],
  loading: false,
  error: null,
};

const UserSlice = createSlice({
  name: "Userdetail",
  initialState,
  reducers: {
    removeuser: (state) => {
      state.user = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createuser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createuser.fulfilled, (state, action) => {
        state.loading = false;
        state.user.push(action.payload);
      })
      .addCase(createuser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(showuser.pending, (state) => {
        state.loading = true;
      })
      .addCase(showuser.fulfilled, (state, action) => {
        state.loading = false;
        state.getusers = action.payload;
        console.log("fulfilled", state.getusers);
      })
      .addCase(showuser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        console.log("Error occurred:", action.error.message);
      });
  },
});

export const { removeuser } = UserSlice.actions;
export default UserSlice.reducer;
