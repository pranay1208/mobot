import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./reducers";

export const reduxStore = createStore(rootReducer);

type RootState = ReturnType<typeof reduxStore.getState>;
type AppDispatch = typeof reduxStore.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
