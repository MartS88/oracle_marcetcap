import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  trendingArr: [],
};

const trendingSlice = createSlice({
  name: 'trending',
  initialState,
  reducers: {
    setTrendingData: (state, action) => {
      state.trendingArr = action.payload;
    },
  },
  selectors: {
    selectTrending: state => state,
  },
});

export const { setTrendingData } = trendingSlice.actions;
export const { selectTrending } = trendingSlice.selectors;
export default trendingSlice.reducer;
