import React from 'react';
import classes from './SelectedResult.module.css';

import Spinner from '../../../Components/UI/Spinner/Spinner';
import DataPage from '../SelectedResult/DataPage/DataPage';
import {connect} from 'react-redux';
import {Route} from 'react-router-dom';
import NavigationItem from '../../../Components/Navigation/NavigationItems/NavigationItem/NavigationItem';

const SelectedResult=props=>{
    const {selectedResult,loading} =props;

    let res=<Spinner />;
    if(!loading){
        res=(
            <>
                <h1>Result: {selectedResult.result}</h1>
                <div className={classes.ButtonDiv}>
                    <NavigationItem 
                        link={props.match.url+'/data/date'}
                        exact={true} >Date</NavigationItem>
                    <NavigationItem 
                        link={props.match.url+'/data/time'} 
                        exact={true}>Time</NavigationItem>
                </div>
                <Route path={`${props.match.path}/data/:dataName`} exact render={()=><DataPage res={selectedResult.date}/>} /> 
            </>
        );
    };

    const backHandler=(e)=>{
        e.preventDefault();
        props.history.push('/results');
    };

    return(
            <div className={classes.SelectedResult}>
                {res}
                <a href="/results" onClick={backHandler} >Back</a>
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