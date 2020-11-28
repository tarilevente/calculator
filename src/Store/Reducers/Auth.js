import { updateObject } from '../../shared/utility';
import * as actionTypes from '../Actions/ActionTypes';

const initialState={
    token:null,
    userId:null,
    error:null,
    loading:false
};

const authStart=(state,action)=>{
    return updateObject(state,{error:null, loading:true});
};

const reducer=(state=initialState, action)=>{
    switch (action.type) {
        case actionTypes.AUTH_START: return authStart(state,action);
            
    
        default: 
            return state;
    }
};

export default reducer;