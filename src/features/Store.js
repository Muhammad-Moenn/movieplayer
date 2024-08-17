import { configureStore } from "@reduxjs/toolkit";
import movieReducer from './Movies/MovieSlice';
import PlayerSlice from "./Movies/Playerslice";
import UserSlice from "./Movies/UserSlice";

const store = configureStore({
    reducer: {
        movies: movieReducer,
        player: PlayerSlice,
        users: UserSlice,
    },
});

export default store;
