import React from 'react';
import classes from './Calculator.module.css';
import Controls from '../../Components/Calculator/Controls/Controls';
import Monitor from '../../Components/Calculator/Monitor/Monitor';
const Calculator =props=>{

    return(
        <div className={classes.Content}>
            <Monitor />
            <Controls />
        </div>
    );
};

export default Calculator;