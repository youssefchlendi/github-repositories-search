import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "../store/dataSlice";
export const store = configureStore({
	  reducer: {
		data: dataReducer,
	  }
});

export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof store.getState>;