import { createSlice } from "@reduxjs/toolkit";

const memberReducer = createSlice({
  name: "memberReducer",
  initialState: {
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
    login: {
      isLogin : false,
      userId : "",

    }
  },
  reducers: {
    setRegisterStep1Data: (state, action) => {
      console.log(action.payload)
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
      console.log(action.payload.goal)
      state.registerStep4.goal = action.payload.goal;
    },
    setloginData: (state, action) => {
      state.login.isLogin = action.payload.isLogin;
      state.login.userId = action.payload.userId;
    }
  },
});

export const {
  setRegisterStep1Data,
  setRegisterStep2Data,
  setRegisterStep3Data,
  setRegisterStep4Data,
  setloginData
} = memberReducer.actions;
export default memberReducer.reducer;
