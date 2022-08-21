import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchApi } from "./dataApi";

export interface DataState {
	  loading: boolean;
	  data: Data;
	  error: string;
};

const initialState: DataState = {
	  loading: false,
	  data: {
			repositories: [],
			organizations: [],
			bio: {}
	  },
	  error: ""
}
// createAsyncThunk is a helper function that creates an async action creator
// that dispatches a loading action, then dispatches the result of the async function,
// and finally dispatches an error action if the async function throws an error.
export  const fetchDataAsync = createAsyncThunk<Data,{search:string,sortBy?:string}>(
	"data/fetchData",
	async ({search,sortBy}, thunkApi): Promise<Data> => {
		// call the fetchApi function and wait for the result
		const response = await fetchApi(search,sortBy);
		return response;
	}
)
// createSlice is a helper function that creates a slice of the state tree
// and returns the reducer and the actions.
const dataSlice = createSlice({
	name: "data",
	initialState,
	reducers: {},
	// the extraReducers object is a map of action types to reducer functions.
	// cases in the reducer will be matched against these action types.
	extraReducers: (builder)=>{
		builder
			.addCase(fetchDataAsync.pending,(state:DataState)=>{
				state.loading = true;
			})
			.addCase(fetchDataAsync.fulfilled,(state:DataState,action:PayloadAction<Data>)=>{
				state.loading = false;
				state.data = action.payload;
			})
			.addCase(fetchDataAsync.rejected,(state:DataState)=>{
				state.loading = false;
			})

	},

})

export default dataSlice.reducer;