import * as actionTypes from '../Actions/ActionTypes';
import {updateObject} from '../../shared/utility';

const initialState={
    amount:0,
    lastAmount:0,
    operation:null,
    before:null,
    lastWasOperation:false,
    aboutToSave:false
};

const setAmount=(state, action)=>{
    return updateObject(state, {amount: action.amount});
};

const setLastAmount=(state, action)=>{
    return updateObject(state, {lastAmount: action.lastAmount});
};

const setBefore=(state, action)=>{
    return updateObject(state, {before: action.before});
};

const setOperation=(state, action)=>{
    return updateObject(state, {operation: action.operation});
};

const setLastWasOperation=(state, action)=>{
    return updateObject(state, {lastWasOperation:action.bool});
};

const setAboutToSave=(state, action)=>{
    return updateObject(state,{
        aboutToSave:action.bool
    });
};

const reducer=(state=initialState,action)=>{
    switch (action.type) {
        case actionTypes.SET_AMOUNT: return setAmount(state, action);
        case actionTypes.SET_LAST_AMOUNT: return setLastAmount(state, action);
        case actionTypes.SET_BEFORE: return setBefore(state, action);
        case actionTypes.SET_OPERATION: return setOperation(state, action);
        case actionTypes.SET_LAST_WAS_OPERATION: return setLastWasOperation(state, action);
        case actionTypes.ABOUT_TO_SAVE: return setAboutToSave(state, action);

        default: return state;
    };
};

export default reducer;