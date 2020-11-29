import React from 'react';
import logo from '../../Assets/images/logo.png';
import classes from './Logo.module.css';

const Logo=props=>{
    return(
        <a style={{height:props.height}} href="/"> 
            <div className={classes.Logo} >
                <img src={logo} alt="Calculator Logo" ></img>
            </div>
        </a>
    );
};

export default Logo;