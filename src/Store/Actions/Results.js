import * as actions from './ActionTypes';

export const saveResultStart=()=>{
    return{
        type:actions.SAVE_RES_START
    };
};

export const saveSuccess=(id,resultData)=>{
    return{
        type:actions.SAVE_RES_SUCCESS,
        resultId:id,
        resultData:resultData
    };
};

export const saveFailed=(error)=>{
    return{
        type:actions.SAVE_RES_FAIL,
        error:error
    };
};

export const saveResult=(result,uid,token)=>{
    return{
        type:actions.SAVE_RES_INITIALIZE,
        result:result,
        uid:uid,
        token:token
    };
};

export const fetchResultsStart=()=>{
    return{
        type:actions.FETCH_RES_START
    };
};

export const fetchResultsSuccess=(res)=>{
    return{
        type:actions.FETCH_RES_SUCCESS,
        res:res
    };
};

export const fetchResultsFailed=(err)=>{
    return{
        type:actions.FETCH_RES_FAILED,
        err:err
    };
};

export const fetchResults=(uid,token)=>{
    return {
        type: actions.FETCH_RES_INITIALIZE,
        uid:uid,
        token:token
    };
};

export const fetchSelectedResultStart=()=>{
    return{
        type:actions.FETCH_SINGLE_RES_START
    };
};

export const fetchSelectedResultSuccess=(res)=>{
    return{
        type:actions.FETCH_SINGLE_RES_SUCCESS,
        res:res
    };
};

export const fetchSelectedResultFailed=(err)=>{
    return{
        type:actions.FETCH_SINGLE_RES_FAILED,
        err:err
    };
};
export const fetchSelectedResult=(uid,token,rid)=>{
    return {
        type: actions.FETCH_SINGLE_RES_INITIALIZE,
        uid: uid,
        token: token,
        rid: rid
    };
};