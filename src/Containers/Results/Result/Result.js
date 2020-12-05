import React from 'react';
import classes from './Result.module.css';
import {dateFormat} from '../../../shared/utility';
import {Link} from 'react-router-dom';

const Result = props =>{
    const [d,i]=dateFormat(props.date);
    return(
        <div className={classes.Result}
             onClick={props.clicked}>
                <p>Date: {d}</p>
                <p>Time: {i}</p>
                <p>Result: {props.result}</p>
        </div>
    );
};

export default Result;