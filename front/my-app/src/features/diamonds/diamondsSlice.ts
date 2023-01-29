import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import Diamond from '../../models/Diamond';
import { getDiamonds, addDiamond, updDiamond, delDiamond } from './diamondsAPI';

export interface diamondsState {
  diamond:Diamond[],
  refresh:boolean
}

const initialState: diamondsState = {
  diamond:[],
  refresh: false
};

// get all diamonds
export const getDiamondsAsync = createAsyncThunk(
  'diamonds/getDiamonds',
  async () => {
    const response = await getDiamonds();
    return response.data;
  }
);

// add diamond
export const addDiamondAsync = createAsyncThunk(
  'diamonds/addDiamond',
  async (diamond:Diamond) =>{
    const response = await addDiamond(diamond);
    return response.data;
  }
);

// update diamond
export const updDiamondAsync = createAsyncThunk(
  'diamonds/updDiamond',
  async (diamond:Diamond) =>{
    const response = await updDiamond(diamond);
    return response.data;
  }
);

// delete diamond
export const delDiamondAsync = createAsyncThunk(
  'diamonds/delDiamond',
  async (id:number) =>{
    const response = await delDiamond(id);
    return response.data;
  }
);

// create sliser
export const diamondsSlice = createSlice({
  name: 'diamonds',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDiamondsAsync.fulfilled, (state,action) => {
        state.diamond = action.payload
      })
      .addCase(addDiamondAsync.fulfilled, (state) => {
        state.refresh = !state.refresh
      })
      .addCase(updDiamondAsync.fulfilled, (state) => {
        state.refresh = !state.refresh
      })
      .addCase(delDiamondAsync.fulfilled, (state) => {
        state.refresh = !state.refresh
      });   
  },
});

export const { } = diamondsSlice.actions;
export const selectRefresh = (state: RootState) => state.diamonds.refresh;
export const selectDiamonds = (state: RootState) => state.diamonds.diamond;
export default diamondsSlice.reducer;
