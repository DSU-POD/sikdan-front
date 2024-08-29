import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  predict: {
    foods: [],
    nutrient: [],
    total_calories: 0,
    url: "",
  },

  writeData: {
    dietName: "",
    contents: "",
  },
};
const feedReducer = createSlice({
  name: "feedReducer",
  initialState,
  reducers: {
    setPredict: (state, action) => {
      state.predict.total_calories = action.payload.predict.total_calories;
      state.predict.foods = action.payload.predict.foods;
      state.predict.nutrient = action.payload.predict.nutrient;
      state.predict.url = action.payload.url;
    },
    setWriteData: (state, action) => {
      state.writeData.dietName = action.payload.dietName;
      state.writeData.contents = action.payload.contents;
    },
  },
});

export const { setPredict, setWriteData } = feedReducer.actions;
export default feedReducer.reducer;
