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
            result:result,
            date:new Date()
        };
        axios.post('/results.json?auth='+token,saveData)
            .then(response=>{
                dispatch(saveSuccess(response.data.name,saveData)); //name: child name, generated by Firebase
            })
            .catch(err=>{
                dispatch(saveFailed(err));
            });
    };
};

export const fetchResultsStart=()=>{
    return{
        type:actions.FETCH_RES_START
    };
};

export const fetchResultsSuccess=(res)=>{
    return{
        type:actions.FETCH_RES_SUCCESS,
        res:res
    };
};

export const fetchResultsFailed=(err)=>{
    return{
        type:actions.FETCH_RES_FAILED,
        err:err
    };
};

export const fetchResults=(uid,token)=>{
    return dispatch=>{
        dispatch(fetchResultsStart());
        const queryParams='?auth='+token+'&orderBy="userId"&equalTo="'+uid+'"';
        axios.get('/results.json'+queryParams) //'orderBy="userId"&equalTo="'+uid+'"'
            .then(res=>{
                let fetchedResults=[];
                for(let key in res.data){
                    fetchedResults.push({
                        ...res.data[key],
                        id:key
                    });
                }
                dispatch(fetchResultsSuccess(fetchedResults));
            })
            .catch(err=>{
                dispatch(fetchResultsFailed(err));
            });
    };
};

export const fetchSelectedResultStart=()=>{
    return{
        type:actions.FETCH_SINGLE_RES_START
    };
};

export const fetchSelectedResultSuccess=(res)=>{
    return{
        type:actions.FETCH_SINGLE_RES_SUCCESS,
        res:res
    };
};

export const fetchSelectedResultFailed=(err)=>{
    return{
        type:actions.FETCH_SINGLE_RES_FAILED,
        err:err
    };
};
export const fetchSelectedResult=(uid,token,rid)=>{
    return dispatch=>{
        dispatch(fetchSelectedResultStart());
        const queryParams='?auth='+token+'&orderBy="userId"&equalTo="'+uid+'"';
        axios.get('/results.json'+queryParams)
            .then(res=>{
                let fetchedResults=[];
                for(let key in res.data){
                    fetchedResults.push({
                        ...res.data[key],
                        id:key
                    });
                }
                let selectedResult=fetchedResults.find(e=>e.id===rid);
                dispatch(fetchSelectedResultSuccess(selectedResult));
            })
            .catch(err=>{
                dispatch(fetchSelectedResultFailed(err));
            });
    };
};
