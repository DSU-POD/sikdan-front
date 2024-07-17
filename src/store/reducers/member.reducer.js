import { createSlice } from "@reduxjs/toolkit";

const memberReducer = createSlice({
  name: "memberReducer",
  initialState: {
    registerStep1: {
      userId: "",
      password: "",
      nickname: "",
      email: "",
      type: "",
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
  },
  reducers: {
    setRegisterStep1Data: (state, action) => {
      state.registerStep1.userId = action.userId;
      state.registerStep1.password = action.password;
      state.registerStep1.nickname = action.nickname;
      state.registerStep1.email = action.email;
      state.registerStep1.type = action.type;
    },
    setRegisterStep2Data: (state, action) => {
      state.registerStep2.gender = action.gender;
      state.registerStep2.age = action.age;
    },
    setRegisterStep3Data: (state, action) => {
      state.registerStep3.height = 0;
      state.registerStep3.weight = 0;
    },
  },
});

export const {
  setRegisterStep1Data,
  setRegisterStep2Data,
  setRegisterStep3Data,
} = memberReducer.actions;
export default memberReducer.reducers;
