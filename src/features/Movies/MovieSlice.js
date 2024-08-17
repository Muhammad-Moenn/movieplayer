import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";


export const fetchmovies=createAsyncThunk('fetchmovie',async(input)=>{
    const response=await fetch(`https://www.omdbapi.com/?apikey=75c2f7cf&s=${input}&type=movie`)
    const data=await response.json()
    return data;
})
export const fetchshows=createAsyncThunk('fetchshows',async(input)=>{
    const response=await fetch(`https://www.omdbapi.com/?apikey=75c2f7cf&s=${input}&type=series`)
    const data=await response.json()
    return data;
})
export const fetchdetails=createAsyncThunk('fetchdetails',async(id)=>{
    const response=await fetch(`https://www.omdbapi.com/?apikey=75c2f7cf&i=${id}&Plot=full`)
    const data=await response.json()
    return data;
})


const initialState = {
    movies: {},
    shows: {},
    details: {},
    handlesearchmovies: '',
    loading: false,
    error: null,
};

const MovieSlice = createSlice({
    name: 'MovieSlice',
    initialState,
    reducers: {
        removemoviedetail: (state) => {
            state.details = {};
        },
        handlesearchmoviesathomepage: (state, action) => {
            state.handlesearchmovies = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchmovies.pending, (state) => {
            state.loading = true;
            state.error = null;
            console.log("pending");
        });
        builder.addCase(fetchmovies.fulfilled, (state, action) => {
            state.loading = false;
            state.movies = action.payload;
            console.log("fulfilled");
        });
        builder.addCase(fetchmovies.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to fetch movies';
            console.log("error");
        });
        builder.addCase(fetchshows.fulfilled, (state, action) => {
            state.shows = action.payload;
            console.log("fulfilled shows");
        });
        builder.addCase(fetchdetails.fulfilled, (state, action) => {
            state.details = action.payload;
            console.log("fulfilled details");
        });
    },
});

export const { removemoviedetail, handlesearchmoviesathomepage } = MovieSlice.actions;
export default MovieSlice.reducer;