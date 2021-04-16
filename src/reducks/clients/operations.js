import { auth, FirebaseTimestamp, db } from '../../firebase'
import {
    signOutAction,
    signInAction,
    authAction,
} from "./actions";
import { push } from 'connected-react-router'
import { hideLoadingAction, showLoadingAction } from '../loading/actions';

export const signOut = () => {
    return async (dispatch) => {
        auth.signOut()
            .then(() => {
                dispatch(signOutAction())
            })
    }
}

export const listenAuthState = () => {
    return async (dispatch) => {
        dispatch(showLoadingAction(''))
        return auth.onAuthStateChanged(user => {
            if (user) {
                const uid = user.uid
                db.collection('clients').doc(uid).get()
                    .then((snapshot) => {
                        const client = snapshot.data()
                        if (client) {
                            dispatch(signInAction({
                                _id: uid,
                                birthday: client.birthday,
                                clientName: client.clientName,
                                email: client.email,
                            }))
                        } else {
                            dispatch(authAction({
                                _id: uid,
                                clientName: user.displayName,
                                email: user.email,
                            }))
                        }
                        dispatch(hideLoadingAction())
                    }).catch((error) => {
                        throw new Error(error)
                    })
            } else {
                dispatch(push('/'))
                dispatch(hideLoadingAction())
            }
        })
    }
}

export const signUp = (clientName, birthday) => {
    return async (dispatch, getState) => {
        //Validation

        if (clientName === "" || birthday === "") {
            alert("必須項目が未入力です")
            return false
        }

        const client = getState().clients

        return db.collection('clients').doc(client._id).set({
            _id: client._id,
            birthday: birthday,
            clientName: clientName,
            email: client.email,
        }).then(result => {
            dispatch(signInAction({
                _id: client._id,
                birthday: birthday,
                clientName: clientName,
                email: client.email,
            }))
        })
    }
}

export const providerAuth = (provider) => {
    return async (dispatch) => {
        console.log(dispatch)
        return auth.signInWithPopup(provider)
            .then(result => {
                const user = result.user
                if (user) {
                    const uid = user.uid
                    db.collection('clients').doc(uid).get()
                        .then((snapshot) => {
                            const client = snapshot.data()
                            if (client) {
                                dispatch(signInAction({
                                    _id: uid,
                                    birthday: client.birthday,
                                    clientName: client.clientName,
                                    email: client.email,
                                }))
                                alert('サインインしました')
                            } else {
                                dispatch(authAction({
                                    _id: uid,
                                    clientName: user.displayName,
                                    email: user.email,
                                }))
                            }
                        }).catch((error) => {
                            throw new Error(error)
                        })
                } else {
                    throw new Error('ユーザーデータが存在しませんでした');
                }
            })
    }
}