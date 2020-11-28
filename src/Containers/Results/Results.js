import React,{useState,useEffect} from 'react';
import  {connect} from 'react-redux';
import classes from './Results.module.css';

const Results=props=>{
    return(
        <div className={classes.Results}>Results</div>
    );
};

const mapStateToProps=state=>{  
    return{

    };
};

const mapDispatchToProps=dispatch=>{
    return{

    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Results);