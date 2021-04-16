export const SIGN_IN = "SIGN_IN";
export const signInAction = (clientsState) => {
    return {
        type: "SIGN_IN",
        payload: {
            _id: clientsState._id,
            birthday: clientsState.birthday,
            clientName: clientsState.clientName,
            email: clientsState.email,
            isSignedIn: true,
            isAuthed: clientsState
        }
    }
};

export const AUTH = 'AUTH'
export const authAction = (clientsState) => {
 return {
    type: 'AUTH',
    payload: {
        _id: clientsState._id,
            birthday: clientsState.birthday,
            clientName: clientsState.clientName,
            email: clientsState.email,
            isSignedIn: false,
            isAuthed: true,
    }
 }
}

export const SIGN_OUT = "SIGN_OUT";
export const signOutAction = () => {
    return {
        type: "SIGN_OUT",
        payload: null,
    }
};
