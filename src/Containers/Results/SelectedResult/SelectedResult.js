import React from 'react';
import classes from './SelectedResult.module.css';

import Spinner from '../../../Components/UI/Spinner/Spinner';
import DataPage from '../SelectedResult/DataPage/DataPage';
import {connect} from 'react-redux';
import {Link,Route} from 'react-router-dom';

const SelectedResult=props=>{
    const {selectedResult,loading} =props;

    let res=<Spinner />;
    if(!loading){
        res=(
            <>
                <h1>Result: {selectedResult.result}</h1>
                <Link to={props.match.url+'/data/date'} >Date</Link><br/>
                <Link to={props.match.url+'/data/time'} >Time</Link><br/>
                <Route path={`${props.match.path}/data/:dataName`} exact render={()=><DataPage res={selectedResult.date}/>} /> 
            </>
        );
    };

    const backHandler=()=>{
        props.history.push('/results');
    };

    return(
            <div className={classes.SelectedResult}>
                {res}
                <button onClick={backHandler} >Back</button>
            </div>
    );
};

const mapStateToProps=state=>{
    return{
        selectedResult:state.results.selectedResult,
        loading:state.results.loading
    }
};

export default connect(mapStateToProps)(SelectedResult);