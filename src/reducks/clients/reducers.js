import * as Actions from './actions';
import {initialState} from '../store/initialState';

export const ClientsReducer = (state = initialState.clients, action)  => {
    switch (action.type) {
        case Actions.AUTH:
            return {
                ...state,
                ...action.payload
            };
        case Actions.SIGN_IN:
            return {
                ...state,
                ...action.payload
            };
        case Actions.SIGN_OUT:
            return {
                ...initialState.clients
            };
        default:
            return state
    }
};
