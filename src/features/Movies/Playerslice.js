import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


var movieId;
export const playvideo = createAsyncThunk(" playvideo", async (id) => {
  const tmdbResponse = await fetch(
    `https://api.themoviedb.org/3/find/${id}?api_key=2abbad7566917904443668242b04d029&external_source=imdb_id`
  );
  const tmdbData = await tmdbResponse.json();
  console.log(tmdbData);
  // const movieId = tmdbData.movie_results[0]?.id;
  const resultTypes = [
    "movie_results",
    "tv_results",
    "tv_episode_results",
    "person_results",
    "tv_season_results",
  ];

  for (const type of resultTypes) {
    if (tmdbData[type]?.[0]?.id) {
      movieId = tmdbData[type][0].id;
      break;
    }
  }

  const videosResponse = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=2abbad7566917904443668242b04d029`
  );
  const videosData = await videosResponse.json();
  const videoKey = videosData.results[0]?.key;
  // console.log( videoKey )
  return videoKey;
});

const initialState = {
  player: {},
  loading: false,
  error: null, 
};

const PlayerSlice = createSlice({
  name: "PlayerSlice", 
  initialState,
  reducers: {
    removeid: (state) => {
      state.player = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(playvideo.pending, (state) => {
      state.loading = true;
      state.error = null; 
      console.log("pending");
    });
    builder.addCase(playvideo.fulfilled, (state, action) => {
      state.loading = false;
      state.player = action.payload;
      console.log("fulfilled");
    });
    builder.addCase(playvideo.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error; 
    });
  },
});

export const { removeid } = PlayerSlice.actions;
export default PlayerSlice.reducer;