import { combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { configureStore } from "@reduxjs/toolkit";
import memberReducer from "./reducers/member.reducer";
import feedReducer from "./reducers/feed.reducer";

const rootReducer = combineReducers({
  memberReducer: memberReducer,
  feedReducer: feedReducer,
});

const persistConfig = {
  key: process.env.NEXT_PUBLIC_PERSIST_KEY,
  storage,
  whitelist: ["memberReducer", "feedReducer"],
};

const rootPersistReducer = persistReducer(persistConfig, rootReducer);

let store;

const initializeStore = () => {
  const store = configureStore({
    reducer: rootPersistReducer,
    devTools: true,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });

  store.__persistor = persistStore(store);
  return store;
};

export const getStore = () => {
  if (typeof window === "undefined") return initializeStore();
  if (!store) store = initializeStore();
  return store;
};

export const getPersistor = () => getStore().__persistor;
