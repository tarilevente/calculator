import {takeEvery} from 'redux-saga/effects';

import * as actionTypes from '../Actions/ActionTypes';
import {logoutSaga, checkAuthTimeoutSaga, authUserSaga, authCheckStateSaga} from './Auth';
import {saveResultSaga, fetchResultsSaga, fetchSingleResultSaga} from './Results';

export function* watchAuth(){
    yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga);
    yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga);
    yield takeEvery(actionTypes.AUTH_USER, authUserSaga);
    yield takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga);
};

export function* watchResults(){
    yield takeEvery(actionTypes.SAVE_RES_INITIALIZE, saveResultSaga);
    yield takeEvery(actionTypes.FETCH_RES_INITIALIZE, fetchResultsSaga);
    yield takeEvery(actionTypes.FETCH_SINGLE_RES_INITIALIZE, fetchSingleResultSaga);
}


