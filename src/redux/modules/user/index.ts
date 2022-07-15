import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IUser } from '~types/entities';

interface UserState {
  userData: IUser | null;
  loggedIn: boolean;
}

const initialState: UserState = {
  loggedIn: false,
  userData: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logIn: (state, action: PayloadAction<IUser>) => {
      state.loggedIn = true;
      state.userData = action.payload;
    },
    logOut: state => {
      state.loggedIn = false;
      state.userData = null;
    },
  },
});

export const { logIn, logOut } = userSlice.actions;

export const userReducer = userSlice.reducer;
