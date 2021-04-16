import { push } from 'connected-react-router'
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SignInDialog } from './components/Common'
import {ClientRegisterDialog} from './components/Common/'
import { listenAuthState } from './reducks/clients/operations'
import { getIsAuthed, getIsSignedIn } from './reducks/clients/selectors'

const Auth = ({ children }) => {
    const selector = useSelector(state => state)
    const dispatch = useDispatch()
    const isSignedIn = getIsSignedIn(selector)
    const [open, setOpen] = useState(true)

    const onClose = useCallback(() => {
        setOpen(false)
        dispatch(push('/'))
    }, [setOpen])

    const dialogMessage = "登録者のみ閲覧可能なページです．Sign In/Upをしてください"

    useEffect(() => {
        if (!isSignedIn) {
            dispatch(listenAuthState())
        }
    }, [])

    if (!isSignedIn) {
        return <SignInDialog open={open} onClose={onClose} message={dialogMessage} />
    } else return children
}

export default Auth
