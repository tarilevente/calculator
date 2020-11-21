import React from 'react';
import logo from '../../Assets/images/logo.png';
import classes from './Logo.module.css';

const Logo=props=>{
    return(
        <div
            className={classes.Logo} 
            style={{height:props.height}} 
            onClick={props.toggle}>
            <img src={logo} alt="Calculator Logo" ></img>
        </div>
    );
};

export default Logo;