import {
    createStore as reduxCreateStore,
    combineReducers,
    applyMiddleware
} from 'redux';
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk';
import {connectRouter, routerMiddleware} from 'connected-react-router'
// Import reducers
import {ClientsReducer} from '../clients/reducers';
import {LoadingReducer} from '../loading/reducers';

// createStoreの再定義 - historyを引数で受け、connected-react-routerの利用を抽象化
export default function createStore(history) {

    // Define individual settings of redux-logger
    let middleWares = [routerMiddleware(history), thunk];
    if (process.env.NODE_ENV === 'development') {
        const logger = createLogger({
            collapsed: true,
            diff: true
        });
        middleWares.push(logger)
    }

    return reduxCreateStore( // オリジナル createStore の別名
        combineReducers({
            clients: ClientsReducer,
            loading: LoadingReducer,
            router: connectRouter(history),
        }),
        applyMiddleware(
            ...middleWares
        )
    );
}