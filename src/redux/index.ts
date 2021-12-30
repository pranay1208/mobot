import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { createStore } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from "./reducers";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["credentials"],
};

export const reduxStore = createStore(
  persistReducer(persistConfig, rootReducer)
);
export const persistor = persistStore(reduxStore);

type RootState = ReturnType<typeof reduxStore.getState>;
type AppDispatch = typeof reduxStore.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
