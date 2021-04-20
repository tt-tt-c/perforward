import { IconButton, List, ListItem, ListItemIcon, ListItemText, TextField } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/styles'
import React, { useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import { SkillsDialog } from '.'
import { getClientIcon, getClientName } from '../../reducks/clients/selectors'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}))

const BasicInfoForRegister = () => {
    const classes = useStyles()

    const [open, setOpen] = useState(false)
    const [index, setIndex] = useState(0)
    const handleClickOpen = () => {
        setOpen(true)
    }

    const selector = useSelector(state => state)
    const initialName = getClientName(selector)
    const initialIcon = getClientIcon(selector)
    const [name, setName] = useState(initialName)
    const [icon, setIcon] = useState(initialIcon)
    const [career, setCareer] = useState("")
    const [skills, setSkills] = useState([])
    const [note, setNote] = useState("")

    const labels = {
        name: 'パフォーマー名',
        icon: 'アイコン画像',
        career: '経歴',
        note: '備考',
    }

    const inputName = useCallback((e) => {
        setName(e.target.value)
    }, [setName])

    const inputIcon = useCallback((e) => {
        setIcon(e.target.value)
    }, [setIcon])

    const inputCareer = useCallback((e) => {
        setCareer(e.target.value)
    }, [setCareer])

    const inputNote = useCallback((e) => {
        setNote(e.target.value)
    }, [setNote])

    const deleteSkills = (key) => {
        setSkills(skills.filter(item => item.key !== key))
    }

    return (
        <>

            {/* パフォーマー名 */}
            <TextField fullWidth={true} onChange={inputName} value={name} label={labels.name} required />

            {/* アイコン */}

            {/* 経歴 */}
            <TextField fullWidth={true} onChange={inputCareer} multiline rows={5} value={career} label={labels.career} required />

            {/* スキル */}
            <h3>スキル</h3>
            <div className="classes root">
                <List component="nav" aria-label="main mailbox folders">
                    <ListItem key='skillListNew'>
                        <ListItemText onClick={() => {
                            setIndex(skills.length)
                            handleClickOpen()
                        }} primary={'+ 新規追加'} style={{ color: '#f00', cursor: 'pointer' }} />
                    </ListItem>

                    {skills.length > 0 && (
                        skills.map((skill,i) => (
                            <ListItem key={skill.key} button>
                                <ListItemText primary={skill.value} />

                                <ListItemIcon onClick={(e) => {
                                    setIndex(i)
                                    handleClickOpen()
                                    e.stopPropagation()
                                }}>
                                    <IconButton>
                                        <EditIcon />
                                    </IconButton>
                                </ListItemIcon>
                                <ListItemIcon onClick={(e) => {
                                    // setIndex(newSkills.length)
                                    deleteSkills(skill.key)
                                    setIndex(skills.length)
                                    e.stopPropagation()
                                }} >
                                    <IconButton>
                                        <DeleteIcon />
                                    </IconButton>
                                </ListItemIcon>
                            </ListItem>
                        ))
                    )}
                </List>
            </div>

            <SkillsDialog index={index} skills={skills} open={open} setSkills={setSkills} setOpen={setOpen} />




            {/* 備考 */}
            <TextField InputProps={{ readOnly: true, }} fullWidth={true} onChange={inputNote} multiline rows={5} value={note} label={labels.note} required />
        </>
    )
}

export default BasicInfoForRegister

