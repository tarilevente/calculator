import React from 'react';
import classes from './ControlElement.module.css';

const ControlElement=props=>{
    const color=props.color;
    const bg=props.bg;
    return(
        <div className={classes.ControlElement}
            // onClick={props.clicked}
            style={{color:color,backgroundColor:bg}}>
            {props.children}
        </div>
    );
};

export default ControlElement;