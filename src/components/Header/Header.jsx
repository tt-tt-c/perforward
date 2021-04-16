import { AppBar, Toolbar } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import React, { useState, useCallback } from 'react'
import {useDispatch} from 'react-redux'
import {push} from 'connected-react-router'
import HeaderMenu from './HeaderMenu'
import headerLogo from '../../assets/img/icons/logo.png'
import { SignInDialog } from '../Common'

const styles = makeStyles({
    logo: {
        maxHeight: '80px'
    },
    logoWrap: {
        padding: '5px 0',
        cursor: 'pointer'
    },
    grow: {
        flexGrow: 1,
    },
    appBar: {
        background: '#FFF',
        padding: '0 calc(50% - 500px)'
    },
    toolBar: {
        display: 'flex',
        justifyContent: 'space-between'
    }
})

const Header = () => {
    const classes = styles()
    const dispatch = useDispatch()

    const [open, setOpen] = useState()

    const handleOpen = useCallback(() => {
        setOpen(true)
    }, [setOpen])

    const handleClose = useCallback(() => {
        setOpen(false)
    }, [setOpen])

    return (
        <>
            <AppBar className={classes.appBar} >
                <Toolbar className={classes.toolBar}>
                    <h2 onClick={() => {dispatch(push('/'))}} className={classes.logoWrap}><img className={classes.logo} src={headerLogo} alt="Perforward 手軽にパフォーマーが呼べるサービス" /></h2>
                    <HeaderMenu onOpen={handleOpen} />
                </Toolbar>
            </AppBar>
            <SignInDialog onClose={handleClose} open={open} />
        </>
    )
}

export default Header
