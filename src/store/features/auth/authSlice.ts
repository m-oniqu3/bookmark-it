import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type AuthState = {
  user: string | null;
  isSignedIn: boolean;
};

const initialState: AuthState = {
  user: JSON.parse(localStorage.getItem("bkmk_user") as string)?.user || null,
  isSignedIn: JSON.parse(localStorage.getItem("bkmk_user") as string)?.isSignedIn || false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AuthState>) => {
      const { user, isSignedIn } = action.payload;

      state.user = user;
      state.isSignedIn = isSignedIn;
    },
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
