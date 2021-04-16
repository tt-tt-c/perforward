import { makeStyles } from '@material-ui/styles'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import loadingGif from '../../assets/img/src/loading.gif'
import { showLoadingAction } from '../../reducks/loading/actions'
import { getLoadingState, getLoadingText } from '../../reducks/loading/selectors'
import CircularProgress from '@material-ui/core/CircularProgress';


const styles = makeStyles({
    root: {
        width: '100%',
        height: '100%',
        position: 'fixed',
        zIndex: 1,
        top: 0,
        left: 0,
        background: 'rgba(0,0,0,0.3)',
        display: 'flex',
        justifyContent: 'center'
    },
    progress: {
        maxWidth: '500px',
        width: '80%',
        position: 'absolute',
        top: '200px',
    }
})
const Loading = ({ children }) => {
    const classes = styles()
    const selector = useSelector(state => state)

    const loadingState = getLoadingState(selector)
    const loadingText = getLoadingText(selector)

    if(loadingState) {
        return (
            < div className={classes.root}>
                <CircularProgress size={100} className={classes.progress} />
            </div >
        )
    } else {
        return children
    }
}

export default Loading
