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
      console.log(action.payload)
      state.registerStep1.userId = action.payload.userId;
      state.registerStep1.password = action.payload.password;
      state.registerStep1.nickname = action.payload.nickname;
      state.registerStep1.email = action.payload.email;
      state.registerStep1.type = action.payload.type;
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
    }
  },
});

export const {
  setRegisterStep1Data,
  setRegisterStep2Data,
  setRegisterStep3Data,
  setRegisterStep4Data
} = memberReducer.actions;
export default memberReducer.reducer;
