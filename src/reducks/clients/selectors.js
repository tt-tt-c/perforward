import { createSelector } from "reselect";

const clientsSelector = (state) => state.clients;

export const getClientId = createSelector(
    [clientsSelector],
    state => state._id
);

export const getClientIcon = createSelector(
    [clientsSelector],
    state => state.clientIcon
);

export const getClientName = createSelector(
    [clientsSelector],
    state => state.clientName
);

export const getIsSignedIn = createSelector(
    [clientsSelector],
    state => state.isSignedIn
);

export const getIsAuthed = createSelector(
    [clientsSelector],
    state => state.isAuthed
);

