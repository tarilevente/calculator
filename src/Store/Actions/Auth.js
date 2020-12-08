import * as actionTypes from "./ActionTypes";

export const authStart=()=>{
    return {
        type:actionTypes.AUTH_START
    };
};

export const authSuccess=(token, userId)=>{
    return {
        type:actionTypes.AUTH_SUCCESS,
        idToken:token,
        userId:userId
    };
};

export const logout=()=>{
    return {
        type:actionTypes.AUTH_INITIATE_LOGOUT
    }
}

export const checkAuthTimeout=(expirationTime)=>{
    return {
        type:actionTypes.AUTH_CHECK_TIMEOUT,
        expirationTime:expirationTime
    }
};

export const authFail=(error)=>{
    return{
        type:actionTypes.AUTH_FAIL,
        error:error
    };
};

export const auth=(email,password,isSignUp)=>{
    return {
      type: actionTypes.AUTH_USER,
      email:email,
      password:password,
      isSignUp:isSignUp
    };
};

export const authCheckState=()=>{
    return {
       type: actionTypes.AUTH_CHECK_STATE
    };
};

export const logoutSucceed=()=>{
    return{
        type:actionTypes.AUTH_LOGOUT
    }
};