import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { push } from 'connected-react-router'
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import { getIsSignedIn } from '../../reducks/clients/selectors';
import { signOut } from '../../reducks/clients/operations';

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'relative'
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    menu: {
        position: 'absolute',
        right: 0,
        left: 'auto',
        width: '100vw'
    }
}));

const HeaderMenu = (props) => {
    const classes = useStyles();
    const selector = useSelector(state => state)
    const isSignedIn = getIsSignedIn(selector)
    const dispatch = useDispatch()
    const [anchorEl, setAnchorEl] = useState(false);
    const handleClick = useCallback(() => {
        setAnchorEl(!anchorEl)
    }, [setAnchorEl])
    const handleClose = useCallback(() => {
        setAnchorEl(false)
    }, [setAnchorEl])

    const funcs = {
        signIn: handleClose,
    }

    const menusForAll = [
        { id: 'menu-list--help', func: () => { dispatch(push('/help')) }, value: 'ヘルプ' }
    ]

    const menusForClients = [
        { id: 'menu-list--signout', func: () => { dispatch(signOut()) }, value: 'サインアウト' },
        { id: 'menu-list--chat', func: () => { dispatch(push('/chat')) }, value: 'チャット' },
        { id: 'menu-list--req-history', func: () => { dispatch(push('/request/history')) }, value: '依頼履歴' },
        { id: 'menu-list--account', func: () => { dispatch(push('/account')) }, value: 'アカウント' },
        { id: 'menu-list--account', func: () => { dispatch(push('/performer/register')) }, value: 'パフォーマーになる' },
    ]

    const menusForPerformers = [
        { id: 'menu-list--schedule', func: () => { dispatch(push('/schedule')) }, value: 'スケジュール' },
    ]

    const menusForVisitors = [
        { id: 'menu-list--signin', func: () => { props.onOpen() }, value: '登録 / サインイン' },
    ]

    return (
        <>
            <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="open drawer"
                aria-haspopup={true}
                onClick={() => handleClick()}
            >
                <MenuIcon />
            </IconButton>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={anchorEl}
                onClose={() => handleClose()}
            >
                {!isSignedIn && (
                    menusForVisitors.map(menu => (
                        <MenuItem key={menu.id} onClick={() => {
                            handleClose()
                            menu.func()
                        }}>{menu.value}</MenuItem>
                    ))
                )}

                {isSignedIn && (
                    menusForClients.map(menu => (
                        <MenuItem key={menu.id} onClick={() => {
                            handleClose()
                            menu.func()
                        }}>{menu.value}</MenuItem>
                    ))
                )}

                {menusForAll.map(menu => (
                    <MenuItem key={menu.id} onClick={() => {
                        handleClose()
                        menu.func()
                    }}>{menu.value}</MenuItem>
                )
                )}
            </Menu>
        </>
    )
}

export default HeaderMenu