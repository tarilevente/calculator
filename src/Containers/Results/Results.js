import React,{useEffect} from 'react';
import classes from './Results.module.css';

import Result from './Result/Result';
import Spinner from '../../Components/UI/Spinner/Spinner';
import Modal from '../../Components/UI/Modal/Modal';
import Hide from '../../Components/UI/Hide/Hide';

import  {connect} from 'react-redux';
import * as actions from '../../Store/Actions/index';
import {Link} from 'react-router-dom';
import * as actionTypes from '../../Store/Actions/ActionTypes';

const Results=props=>{
    const {onFetchResults, results, error, uid, loading, token}=props;

    useEffect(()=>{
        onFetchResults(uid, token);
    },[onFetchResults, uid, token]);

    const selectedHandler=rid=>{
        props.onFetchSelectedResult(uid, token, rid);
    };

    const modalClosedHandler=()=>{
        props.history.push('/');
    };

    let res=<Spinner />;
    if(!loading && !error){
        res=results.map(r=>{
            return(
                <Link to={`/result/${r.id}`} key={r.id} >
                    <Result 
                        {...props}
                        date={r.date}
                        result={r.result}
                        clicked={()=>selectedHandler(r.id)}
                        id={r.id}/>
                </Link>
            );
        });
    };

    if(error){
        res=(
            <Modal show={error!==null} modalClosed={modalClosedHandler}>
                {error.message}
            </Modal>);
    };

    const hideHandler=(e)=>{
        e.preventDefault();
        props.onHideChange(!props.hide);
    };

    let hide=null;
    if(!loading && !error){
        hide=<Hide hideHandler={hideHandler} hide={props.hide}/>
    }

    return(
        <div className={classes.Results}>
            <h2>My results</h2>
            {hide}
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
        token:state.auth.token,
        hide:state.results.hide
    };
};

const mapDispatchToProps=dispatch=>{
    return{
        onFetchResults:(uid,token)=>dispatch(actions.fetchResults(uid,token)),
        onFetchSelectedResult:(uid,token,rid)=>dispatch(actions.fetchSelectedResult(uid,token,rid)),
        onHideChange:(bool)=>dispatch({type:actionTypes.HIDE_CHANGE, bool:bool})
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(React.memo(Results));