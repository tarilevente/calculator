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