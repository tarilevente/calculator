import {put, delay} from 'redux-saga/effects';
import * as actions from '../Actions/index';

import {apikey} from '../../apikey';
import axios from 'axios';

export function* logoutSaga(){
    yield localStorage.removeItem('token');
    yield localStorage.removeItem('expirationDate');
    yield localStorage.removeItem('userId');
    yield put(actions.logoutSucceed());
};

 export function* checkAuthTimeoutSaga(action){
     yield delay(action.expirationTime*1000);
     yield put(actions.logout());
 };

 export function* authUserSaga(action){
    const authData={
        email:action.email,
        password:action.password,
        returnSecureToken:true
    }; 

    yield put(actions.authStart());
    let url="https://identitytoolkit.googleapis.com/v1/accounts:signUp?key="+apikey; //signup link //FireBase auth api <- google results
    if(!action.isSignUp){
        url="https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key="+apikey;
    };

    try{
        const response= yield axios.post(url,authData);

        const expirationDate=new Date(new Date().getTime()+response.data.expiresIn*1000);
        yield localStorage.setItem('token',response.data.idToken);
        yield localStorage.setItem('expirationDate',expirationDate);
        yield localStorage.setItem('userId',response.data.localId);
        yield put(actions.authSuccess(response.data.idToken,response.data.localId));
        yield put(actions.checkAuthTimeout(response.data.expiresIn));
    } 
    catch(error){
        yield put(actions.authFail(error.response.data.error.message));
    };
 };

 export function* authCheckStateSaga(){
    const token=localStorage.getItem('token');
    if(!token){
        yield put(actions.logout());
    } else {
        const expirationDate=new Date(localStorage.getItem('expirationDate'));
        if(expirationDate <= new Date()){
            yield put(actions.logout());
        } else {
            const userId=localStorage.getItem('userId');
            yield put(actions.authSuccess(token,userId));
            yield put(actions.checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000 ));
        }
    };
 };