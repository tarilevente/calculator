import React from 'react';
import classes from './Monitor.module.css';

const Monitor=props=>{
    return(
        <div>
            <div className={classes.History}>
                {props.before}
            </div>
            <div className={classes.Monitor}>
                {props.amount}
            </div>
        </div>
    );
};

export default Monitor;