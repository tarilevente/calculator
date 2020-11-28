import * as actionTypes from "./ActionTypes";

export const authStart=()=>{
    return {
        type:actionTypes.AUTH_START
    };
};

export const auth=(email,password,isSignUp)=>{
    const authData={
        email:email,
        password:password,
        returnSecureToken:true
    }; 

    return dispatch=>{
        //authenticate the user
        dispatch(authStart());
        
        let url="https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDWPPOtglP7bgNyl7cq8zznxcSkokRJBCg"; //signup link //FireBase auth api <- google results
    };
};