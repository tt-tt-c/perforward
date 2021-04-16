import React, { useMemo, useState } from 'react'
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { Divider } from '@material-ui/core';
import { providerAuth } from '../../reducks/clients/operations';
import { fb } from '../../firebase';
import { useDispatch } from 'react-redux';

const styles = makeStyles(theme => ({
	root: {
		margin: 0,
		padding: theme.spacing(3),
		paddingBottom: theme.spacing(1),
		fontSize: "16px"
	},
	closeButton: {
		position: 'absolute',
		right: theme.spacing(1),
		top: theme.spacing(1),
		color: theme.palette.grey[500],
	},
	signInButton: {
		display: 'block',
		width: '90%',
		margin: `${theme.spacing(1)}px auto !important`,
	},
	actions: {
		display: 'block',
	}
}))

const SignInDialog = (props) => {
	const classes = styles()

	let open = props.open
	const onClose = props.onClose

	const dispatch = useDispatch()

	const title = "登録 / サインイン"
	const googleLogin = {
		title: 'Googleアカウントをお持ちの方',
		provider: new fb.auth.GoogleAuthProvider(),
	}
	const facebookLogin = {
		title: 'Facebookアカウントをお持ちの方',
		provider: new fb.auth.FacebookAuthProvider(),
	}

	return (
		<Dialog onClose={onClose} aria-labelledby="customized-dialog-title" open={open}>
			<MuiDialogTitle disableTypography className={classes.root}>
				<Typography variant="h5">{title}</Typography>
				<IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
					<CloseIcon />
				</IconButton>
			</MuiDialogTitle>

			<Divider />

			{props.message && (
				<MuiDialogContent>
					<Typography >
						{props.message}
					</Typography>
				</MuiDialogContent>
			)}
			<MuiDialogActions className={classes.actions}>
				<Button className={classes.signInButton} autoFocus variant="outlined" onClick={() => {
					onClose()
					dispatch(providerAuth(googleLogin.provider))
				}} color="secondary">
					{googleLogin.title}
				</Button>
				<Button className={classes.signInButton} autoFocus variant="outlined" onClick={() => {
					onClose()
					dispatch(providerAuth(facebookLogin.provider))
				}} color="primary">
					{facebookLogin.title}
				</Button>
			</MuiDialogActions>



		</Dialog>
	)
}

export default SignInDialog
