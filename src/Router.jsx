import React from 'react'
import { Switch, Route } from 'react-router'
import { PerformerRegister, Top } from './templates'
import Auth from './Auth'
import { Loading,ClientRegisterDialog } from './components/Common'
import { useSelector } from 'react-redux'
import { getIsAuthed, getIsSignedIn } from './reducks/clients/selectors'

const Router = () => {
    const selector = useSelector(state => state)
    const isSignedIn = getIsSignedIn(selector)
    const isAuthed = getIsAuthed(selector)

    if (!isSignedIn && isAuthed) {
        return (<ClientRegisterDialog />)
    } else {
        return (
            <Loading>
                <Switch>
                    <Route exact path={"(/)?"} component={Top} />

                    <Auth>
                        <Switch>
                            <Route exact path={"/performer/register"} component={PerformerRegister} />
                            <Route path={".*"} component={Top} />
                        </Switch>
                    </Auth>
                </Switch>
            </Loading>
        )
    }
}

export default Router
