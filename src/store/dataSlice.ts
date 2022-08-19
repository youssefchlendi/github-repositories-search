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

export  const fetchDataAsync = createAsyncThunk<Data,string>(
	"data/fetchData",
	async (userId, thunkApi): Promise<Data> => {
		const response = await fetchApi(userId);
		return response;
	}
)

const dataSlice = createSlice({
	name: "data",
	initialState,
	reducers: {},
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