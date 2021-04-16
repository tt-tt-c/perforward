import { TextField } from '@material-ui/core'
import React, { useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import { getClientIcon, getClientName } from '../../reducks/clients/selectors'

const BasicInfoForRegister = () => {
    const selector = useSelector(state => state)
    const initialName = getClientName(selector)
    const initialIcon = getClientIcon(selector)
    const [name, setName] = useState(initialName)
    const [icon, setIcon] = useState(initialIcon)
    const [career, setCareer] = useState("")
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

    return (
        <TextField onChange={inputName} value={name} label={labels.name} required />
    )
}

export default BasicInfoForRegister
