import { TypedUseSelectorHook,useDispatch,useSelector } from "react-redux";
import { AppDispatch,AppState } from "./store";

/**
 * useAppDispatch is a hook that returns the dispatch function of the application
 * useAppSelector is a hook that returns the current state of the application
 */

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
