import { configureStore } from "@reduxjs/toolkit";
import boardSlice from "./boardSlice";
import uiSlice from "./uiSlice";

const store = configureStore({
    reducer: {
        board: boardSlice,
        ui: uiSlice
    }
});

export default store;
export type AppRootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;