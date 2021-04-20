import { Button, Dialog, DialogTitle, Grid, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import React, { useEffect, useState } from 'react'
import {generateUuid} from '../../function/common'

const useStyles = makeStyles({
	root: {
		minWidth: '400px',
		padding: '50px'
	},
	grid: {
		marginTop: '30px'
	},
	dialogTitle: {
		padding: '0',
	}
})

const SkillsDialog = (props) => {
	const classes = useStyles()
	const { setOpen, skills, open, setSkills, index } = props;

	let initSkillValue = (index < skills.length) ? skills[index].value : ''

	const [skillValue, setSkillValue] = useState(initSkillValue)

	const handleClose = () => {
		setOpen(false)
	}
	const inputSkill = () => {
		if (index < skills.length) {
			let newSkills = skills
			newSkills[index] = {
				...newSkills[index],
				value: skillValue,
			}
			setSkills(newSkills)
		}
		else {
			if (skillValue === "") { return }
			else {
				setSkills([...skills, {value: skillValue,key: generateUuid()}])
			}
		}
	}

	useEffect(() => {
		initSkillValue = (index < skills.length) ? skills[index].value : ''
		setSkillValue(initSkillValue)
	}, [index])

	return (
		<>
			<Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
				<div className={classes.root} >
					<DialogTitle className={classes.dialogTitle} >スキル</DialogTitle>
					<TextField onChange={(e) => setSkillValue(e.target.value )} value={skillValue} fullWidth placeholder={'スキルを入力してください'} />
					<Grid container direction="row" justify="flex-end" className={classes.grid}>
						<Button onClick={handleClose}>キャンセル</Button>
						<Button onClick={() => {
							inputSkill()
							handleClose()
						}}>保存</Button>
					</Grid>
				</div>
			</Dialog>
		</>
	)
}

export default SkillsDialog
