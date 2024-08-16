import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  registerStep1: {
    userId: "",
    password: "",
    nickname: "",
    email: "",
    trainer_yn: "",
  },
  registerStep2: {
    gender: "",
    age: "",
  },
  registerStep3: {
    height: 0,
    weight: 0,
  },
  registerStep4: {
    goal: "",
  },
  loginData: {
    isLogin: false,
    userId: "",
  },
};
const memberReducer = createSlice({
  name: "memberReducer",
  initialState,
  reducers: {
    setRegisterStep1Data: (state, action) => {
      state.registerStep1.userId = action.payload.userId;
      state.registerStep1.password = action.payload.password;
      state.registerStep1.nickname = action.payload.nickname;
      state.registerStep1.email = action.payload.email;
      state.registerStep1.trainer_yn = action.payload.trainer_yn;
    },
    setRegisterStep2Data: (state, action) => {
      state.registerStep2.gender = action.payload.gender;
      state.registerStep2.age = action.payload.age;
    },
    setRegisterStep3Data: (state, action) => {
      state.registerStep3.height = action.payload.height;
      state.registerStep3.weight = action.payload.weight;
    },
    setRegisterStep4Data: (state, action) => {
      state.registerStep4.goal = action.payload.goal;
    },
    setLoginData: (state, action) => {
      state.loginData.isLogin = action.payload.isLogin;
      state.loginData.userId = action.payload.userId;
    },
    resetAllState: () => initialState,
  },
});

export const {
  setRegisterStep1Data,
  setRegisterStep2Data,
  setRegisterStep3Data,
  setRegisterStep4Data,
  setLoginData,
  resetAllState,
} = memberReducer.actions;
export default memberReducer.reducer;
