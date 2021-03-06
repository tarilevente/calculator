import * as actions from '../Actions/ActionTypes';
import {updateObject} from '../../shared/utility';

const initialState={
    loading: false,
    results: [],
    selectedResult:null,
    error:null,
    hide:false
};

const saveResStart=(state, action)=>{
    return updateObject(state,{loading:true});
};

const saveResSuccess=(state, action)=>{
    const newResult=updateObject(action.resultData,{id:action.resultId});
    return updateObject(state,{
        loading:false,
        results:state.results.concat(newResult)
    });
};

const saveResFail=(state,action)=>{
    return updateObject(state,{
        error:action.error.message,
        loading:false
    });
};

const fetchResultsStart=(state, action)=>{
    return updateObject(state,{
        loading:true
    });
};

const fetchResultsSuccess=(state, action)=>{
    return updateObject(state,{
        loading:false,
        results:action.res,
        error:null
    });
};

const fetchResultsFailed=(state, action)=>{
    return updateObject(state,{
        loading:false,
        error:action.err
    });
};
const fetchSelectedResultStart=(state, action)=>{
    return updateObject(state,{
        loading:true
    });
};

const fetchSelectedResultSuccess=(state, action)=>{
    return updateObject(state,{
        loading:false,
        selectedResult:action.res,
        error:null
    });
};

const fetchSelectedResultFailed=(state, action)=>{
    return updateObject(state,{
        loading:false,
        error:action.err
    });
};

const hideChange=(state, action)=>{
    return updateObject(state,{hide:action.bool});
};

const reducer=(state=initialState,action)=>{
    switch (action.type) {
        case actions.SAVE_RES_START: return saveResStart(state, action);
        case actions.SAVE_RES_SUCCESS: return saveResSuccess(state, action);
        case actions.SAVE_RES_FAIL: return saveResFail(state, action);
        case actions.FETCH_RES_START: return fetchResultsStart(state, action);
        case actions.FETCH_RES_SUCCESS: return fetchResultsSuccess(state, action);
        case actions.FETCH_RES_FAILED: return fetchResultsFailed(state, action);
        case actions.FETCH_SINGLE_RES_START: return fetchSelectedResultStart(state, action);
        case actions.FETCH_SINGLE_RES_SUCCESS: return fetchSelectedResultSuccess(state, action);
        case actions.FETCH_SINGLE_RES_FAILED: return fetchSelectedResultFailed(state, action);
        case actions.HIDE_CHANGE: return hideChange(state, action);

        default:
            return state;
    }
};

export default reducer;