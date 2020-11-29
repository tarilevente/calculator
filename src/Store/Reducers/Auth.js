import { updateObject } from '../../shared/utility';
import * as actionTypes from '../Actions/ActionTypes';

const initialState={
    token:null,
    userId:null,
    error:null,
    loading:false,
    authRedirectPath:'/'
};

const authStart=(state,action)=>{
    return updateObject(state,{error:null, loading:true});
};

const authSuccess=(state, action)=>{
    return updateObject(state,{
        token:action.idToken,
        userId:action.userId,
        loading:false,
        error:null
    });
};

const logout=(state, action)=>{
    return updateObject(state,{
        error:null,
        loading:false,
        token: null,
        userId:null
    });
};

const authFail=(state, action)=>{
    return updateObject(state,{
        error:action.error,
        loading:false
    });
};

const setRedirectPath=(state, action)=>{
    return updateObject(state,{
        authRedirectPath:action.path
    });
};

const reducer=(state=initialState, action)=>{
    switch (action.type) {
        case actionTypes.AUTH_START: return authStart(state,action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_LOGOUT: return logout(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.SET_AUTH_REDIRECT_PATH: return setRedirectPath(state, action);
        default: 
            return state;
    }
};

export default reducer;