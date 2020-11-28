import axios from '../../axios';
import * as actions from './ActionTypes';

const saveResultStart=()=>{
    return{
        type:actions.SAVE_RES_START
    };
};

const saveSuccess=(id,resultData)=>{
    return{
        type:actions.SAVE_RES_SUCCESS,
        resultId:id,
        resultData:resultData
    };
};

const saveFailed=(error)=>{
    return{
        type:actions.SAVE_RES_FAIL,
        error:error
    };
};

export const saveResult=(result,uid,token)=>{
    return dispatch=>{    
        dispatch(saveResultStart());
        const saveData={
            userId:uid,
            result:result
        };
        axios.post('/results.json?auth='+token,saveData)
            .then(response=>{
                // console.log(response+' : '+response.data.name);
                dispatch(saveSuccess(response.data.name,saveData));
            })
            .catch(err=>{
                dispatch(saveFailed(err));
            });
    };
};

