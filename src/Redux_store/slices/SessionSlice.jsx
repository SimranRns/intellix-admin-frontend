import { createSlice } from "@reduxjs/toolkit";
import { create_Session, Get_Session } from "../Api/SessionApi";

const initialState = {
    Session: [],
    loading: false,
    error: null,
};

const SessionSlice = createSlice({
    name: 'Session',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

        //Create_Session

            .addCase(create_Session.pending, (state) => {
                state.loading = true;
            })
            .addCase(create_Session.fulfilled, (state, action) => {
                state.loading = false;
                state.Session.push(action.payload);
            })
            .addCase(create_Session.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            //Get_Session
            .addCase(Get_Session.pending, (state) => {
                state.loading = true;
              })
              .addCase(Get_Session.fulfilled, (state, action) => {
                state.loading = false;
                state.Session = action.payload;
              })
              .addCase(Get_Session.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
              })

    },
});

export default SessionSlice.reducer;