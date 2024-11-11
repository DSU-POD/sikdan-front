import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  registerStep1: {
    userId: "",
    password: "",
    nickname: "",
    email: "",
  },
  registerStep2: {
    gender: "",
    age: "",
  },
  registerStep3: {
    height: 0,
    weight: 0,
    workOut: 0,
    trainerYn: "",
  },
  registerStep4: {
    goal: "",
  },
  loginData: {
    isLogin: false,
    userId: "",
    nickname: "",
    type: "",
  },
  socialLoginData: {
    naver_id: "",
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
    },
    setRegisterStep2Data: (state, action) => {
      state.registerStep2.gender = action.payload.gender;
      state.registerStep2.age = action.payload.age;
    },
    setRegisterStep3Data: (state, action) => {
      console.log(action.payload);
      state.registerStep3.height = action.payload.height;
      state.registerStep3.weight = action.payload.weight;
      state.registerStep3.workOut = action.payload.workOut;
      state.registerStep3.trainerYn = action.payload.trainerYn;
    },
    setRegisterStep4Data: (state, action) => {
      state.registerStep4.goal = action.payload.goal;
    },
    setLoginData: (state, action) => {
      state.loginData.isLogin = action.payload.isLogin;
      state.loginData.userId = action.payload.userId;
      state.loginData.nickname = action.payload.nickname;
      state.loginData.type = action.payload.type;
    },
    setSocialLoginData: (state, action) => {
      state.socialLoginData.naver_id = action.payload.naver_id;
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
  setSocialLoginData,
  resetAllState,
} = memberReducer.actions;
export default memberReducer.reducer;
