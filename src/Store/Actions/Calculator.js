import * as actionTypes from '../Actions/ActionTypes';

export const setAmount=(amount)=>{
    return{
        type:actionTypes.SET_AMOUNT,
        amount:amount
    };
};

export const setLastAmount=(lastAmount)=>{
    return{
        type:actionTypes.SET_LAST_AMOUNT,
        lastAmount:lastAmount
    };
};

export const setBefore=(before)=>{
    return {
        type:actionTypes.SET_BEFORE,
        before:before
    };
};

export const setOperation=(operation)=>{
    return {
        type:actionTypes.SET_OPERATION,
        operation:operation
    };
};

export const setLastWasOperation=(bool)=>{
    return{
        type:actionTypes.SET_LAST_WAS_OPERATION,
        bool:bool
    };
};

export const aboutToSave=(bool)=>{
    return{
        type:actionTypes.ABOUT_TO_SAVE,
        bool:bool
    };
};