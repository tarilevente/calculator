import React,{useEffect} from 'react';
import  {connect} from 'react-redux';
import classes from './Results.module.css';
import Result from './Result/Result';
import * as actions from '../../Store/Actions/index';
import Spinner from '../../Components/UI/Spinner/Spinner';

const Results=props=>{
    const {onFetchResults, results, error, uid, loading, token}=props;

    useEffect(()=>{
        onFetchResults(uid, token);
    },[onFetchResults, uid, token]);

    let res=<Spinner />;
    if(!loading && !error){
        res=results.map(r=>{
            return <Result 
                key={r.id}
                date={r.date}
                result={r.result}/>
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
        onFetchResults:(uid,token)=>dispatch(actions.fetchResults(uid,token))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(React.memo(Results));