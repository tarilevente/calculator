import React, { useEffect } from 'react';
import classes from './SelectedResult.module.css';
import {connect} from 'react-redux';
import Spinner from '../../../Components/UI/Spinner/Spinner';
import { dateFormat } from '../../../shared/utility';

const SelectedResult=props=>{
    const { match: { params: { id } }} = props;
    const {selectedResult,loading} =props;
    // console.log(match);
    // const id=match.params.id;
    // const id=props.match.params.id;

    
    let res=<Spinner />;
    if(!loading){
        const [d,i]=dateFormat(selectedResult.date);
        res=(
            <>
                <h1>Result: {selectedResult.result}</h1>
                <h3>Date: {d}</h3>
                <h3>Time: {i}</h3>
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