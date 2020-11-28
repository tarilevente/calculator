import * as actions from '../Actions/ActionTypes';
import {updateObject} from '../../shared/utility';

const initialState={
    loading: false,
    results: [],
    error:null
};

const saveResStart=(state, action)=>{
    return updateObject(state,{loading:true});
};

const saveResSuccess=(state, action)=>{
    const newResult=updateObject(action.resultData,{id:action.resultId});
    return updateObject(state,{
        loading:false,
        results:state.results.results.concat(newResult)
    });
};

const reducer=(state=initialState,action)=>{
    switch (action.type) {
        case actions.SAVE_RES_START: return saveResStart(state, action);
        case actions.SAVE_RES_SUCCESS: return saveResSuccess(state, action);

        default:
            return state;
    }
};

export default reducer;