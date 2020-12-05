import * as actionTypes from '../Actions/ActionTypes';
import {updateObject} from '../../shared/utility';

const initialState={
    amount:0,
    aboutToSave:false
};

const setAmount=(state, action)=>{
    return updateObject(state, {amount: action.amount});
};

const setAboutToSave=(state, action)=>{
    return updateObject(state,{
        aboutToSave:action.bool
    });
};

const reducer=(state=initialState,action)=>{
    switch (action.type) {
        case actionTypes.SET_AMOUNT: return setAmount(state, action);
        case actionTypes.ABOUT_TO_SAVE: return setAboutToSave(state, action);

        default: return state;
    };
};

export default reducer;