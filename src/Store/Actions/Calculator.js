import * as actionTypes from '../Actions/ActionTypes';

export const setAmount=(amount)=>{
    return{
        type:actionTypes.SET_AMOUNT,
        amount:amount
    };
};

export const aboutToSave=(bool)=>{
    return{
        type:actionTypes.ABOUT_TO_SAVE,
        bool:bool
    };
};