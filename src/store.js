import todosReducer from "./feauters/todosSlice";
import authReducer from "./feauters/authSlice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: ["auth", "todos"],
};

const authPersistConfig = {
  key: "auth",
  version: 1,
  storage,
  blacklist: ["loading", "regError", "loginError"],
};

const rootReducer = combineReducers({
  todos: todosReducer,
  auth: persistReducer(authPersistConfig, authReducer),
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
