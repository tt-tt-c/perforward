import React, { useCallback, useState } from 'react'
import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import { Divider, TextField } from '@material-ui/core';
import { signUp } from '../../reducks/clients/operations';
import { useDispatch, useSelector } from 'react-redux';
import { getClientName } from '../../reducks/clients/selectors.js'

const styles = makeStyles(theme => ({
    root: {
        margin: 0,
        padding: theme.spacing(3),
        paddingBottom: theme.spacing(1),
        fontSize: "16px",
        minWidth: '300px'
    },
    clientNameField: {
        width: '100%',
        padding: `${theme.spacing(3)}px 0`
    },
    birthdayField: {
        width: '100%',
        padding: `${theme.spacing(3)}px 0`
    },
    actions: {
        display: 'block',
    },
    registerButton: {
        display: 'block',
        width: '90%',
        margin: `${theme.spacing(1)}px auto !important`,
    },
    label: {
        color: "rgba(0, 0, 0, 0.54)",
        display: 'block',
        padding: 0,
        fontSize: "1rem",
        fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
        fontWeight: 400,
        lineHeight: 1,
        letterSpacing: "0.00938em",
        marginTop: theme.spacing(3),
    }
}))

const ClientRegisterDialog = (props) => {
    const classes = styles()
    const dispatch = useDispatch()
    const selector = useSelector(state => state)
    const initClientName = getClientName(selector)
    const [birthday, setBirthday] = useState("")
    const [clientName, setClientName] = useState(initClientName)

    const title = "アカウント登録"
    const onClose = props.onClose
    const regBtnText = '登録する'
    const clientNameLabel = 'アカウント名'
    const birthdayLabel = '生年月日'

    const inputClientName = useCallback((e) => {
        setClientName(e.target.value)
    }, [setClientName])

    const inputBirthday = useCallback((e) => {
        setBirthday(e.target.value)
    }, [setBirthday])

    return (
        <Dialog onClose={null} aria-labelledby="customized-dialog-title" open={true}>
            <MuiDialogTitle disableTypography className={classes.root}>
                <Typography variant="h5">{title}</Typography>
            </MuiDialogTitle>

            <Divider />

            <MuiDialogContent>
                <form>
                    <TextField onChange={inputClientName} value={clientName} className={classes.clientNameField} id='filled-basic' label={clientNameLabel} required />

                    <label className={classes.label}>
                        {birthdayLabel}
                        <span aria-hidden="true" class="MuiFormLabel-asterisk MuiInputLabel-asterisk"> *</span>
                    </label>
                    <TextField onChange={inputBirthday} value={birthday} className={classes.birthdayField} id='filled-basic' type='date' required />
                </form>
            </MuiDialogContent>

            <MuiDialogActions className={classes.actions}>
                <Button className={classes.registerButton} autoFocus onClick={() => dispatch(signUp(clientName, birthday))} color="primary">
                    {regBtnText}
                </Button>
            </MuiDialogActions>



        </Dialog>
    )
}

export default ClientRegisterDialog
