import { createSlice, PayloadAction } from '@reduxjs/toolkit';
interface AuthState {
  authenticated: boolean;
}

const initialState: AuthState = {
  authenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.authenticated = action.payload;
    },
  },
  selectors: {
    selectAuth: state => state,
  },
});

export const { setAuthenticated } = authSlice.actions;
export const { selectAuth } = authSlice.selectors;
export default authSlice.reducer;
