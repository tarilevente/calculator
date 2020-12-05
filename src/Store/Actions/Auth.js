import * as actionTypes from "./ActionTypes";
import {apikey} from '../../apikey';
import axios from 'axios';

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
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type:actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout=(expirationTime)=>{
    return dispatch=>{
        setTimeout(()=>{
            dispatch(logout());
        },expirationTime*1000);
    }
};

export const authFail=(error)=>{
    return{
        type:actionTypes.AUTH_FAIL,
        error:error
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
        let url="https://identitytoolkit.googleapis.com/v1/accounts:signUp?key="+apikey; //signup link //FireBase auth api <- google results
        if(!isSignUp){
            url="https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key="+apikey;
        };

        axios.post(url,authData)
            .then(response=>{
                const expirationDate=new Date(new Date().getTime()+response.data.expiresIn*1000);
                localStorage.setItem('token',response.data.idToken);
                localStorage.setItem('expirationDate',expirationDate);
                localStorage.setItem('userId',response.data.localId);
                dispatch(authSuccess(response.data.idToken,response.data.localId));
                dispatch(checkAuthTimeout(response.data.expiresIn));
            })
            .catch(error=>{
                dispatch(authFail(error.response.data.error.message));
            });
    };
};

export const authCheckState=()=>{
    return dispatch=>{
        const token=localStorage.getItem('token');
        if(!token){
            dispatch(logout());
        } else {
            const expirationDate=new Date(localStorage.getItem('expirationDate'));
            if(expirationDate <= new Date()){
                dispatch(logout());
            } else {
                const userId=localStorage.getItem('userId');
                dispatch(authSuccess(token,userId));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000 ));
            }
        };
    };
};