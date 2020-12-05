import React,{useEffect} from 'react';
import  {connect} from 'react-redux';
import classes from './Results.module.css';
import Result from './Result/Result';
import * as actions from '../../Store/Actions/index';
import Spinner from '../../Components/UI/Spinner/Spinner';

import {Link} from 'react-router-dom';

const Results=props=>{
    const {onFetchResults, results, error, uid, loading, token, selectedResult}=props;

    useEffect(()=>{
        onFetchResults(uid, token);
    },[onFetchResults, uid, token]);

    const selectedHandler=rid=>{
        props.onFetchSelectedResult(uid, token, rid);
    };

    let res=<Spinner />;
    if(!loading && !error){
        res=results.map(r=>{
            return(
                <Link to={"/result/"+r.id} key={r.id} >
                    <Result 
                        {...props}
                        date={r.date}
                        result={r.result}
                        clicked={()=>selectedHandler(r.id)}/>
                </Link>
            );
        });
    } 
    if(error){
        res=<p>{error.response.data.error}</p>;
    }
    return(
        <div className={classes.Results}>
            <h2>My results</h2>
            {res}            
        </div>
    );
};

const mapStateToProps=state=>{  
    return{
        uid:state.auth.userId,
        results:state.results.results,
        loading:state.results.loading,
        error:state.results.error,
        token:state.auth.token
    };
};

const mapDispatchToProps=dispatch=>{
    return{
        onFetchResults:(uid,token)=>dispatch(actions.fetchResults(uid,token)),
        onFetchSelectedResult:(uid,token,rid)=>dispatch(actions.fetchSelectedResult(uid,token,rid))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(React.memo(Results));