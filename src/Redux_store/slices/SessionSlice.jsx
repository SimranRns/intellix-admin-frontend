import { createSlice } from "@reduxjs/toolkit";
import { addSession, fetchSessionCount, fetchSessions, getSessions, setDefaultSession } from "../Api/SessionApi";

const initialState = {
    Session: [],
    loading: false,
    total: 0,
    error: null,
    count: 0,
};

const SessionSlice = createSlice({
    name: 'Session',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

        //Create_Session

            .addCase(addSession.pending, (state) => {
                state.loading = true;
            })
            .addCase(addSession.fulfilled, (state, action) => {
                state.loading = false;
                state.Session.push(action.payload);
            })
            .addCase(addSession.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error;
            })

            //fetch_Session
            .addCase(fetchSessions.pending, (state) => {
                state.loading = true;
                state.error = null;
              })
              .addCase(fetchSessions.fulfilled, (state, action) => {
                state.loading = false;
                state.Session = action.payload.sessions;
              })
              .addCase(fetchSessions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
              })

            //   get_session 
            .addCase(getSessions.pending, (state) => {
                state.loading = true;
                state.error = null;
              })
              .addCase(getSessions.fulfilled, (state, action) => {
                state.loading = false;
                state.Session = action.payload.sessions.data || [];
                state.total = action.payload.sessions.totalCount || 0;
              })
              .addCase(getSessions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Something went wrong';
              })



            //   default sesssion 
            .addCase(setDefaultSession.pending, (state) => {
                state.loading = true;
                state.error = null;
              })
              .addCase(setDefaultSession.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
              })
              .addCase(setDefaultSession.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to set default session';
              })


            //   count session 

            .addCase(fetchSessionCount.pending, (state) => {
                state.loading = true;
                state.error = null;
              })
              .addCase(fetchSessionCount.fulfilled, (state, action) => {
                state.loading = false;
                state.count = action.payload.count;
              })
              .addCase(fetchSessionCount.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
              })

    },
});

export default SessionSlice.reducer;