import React from 'react';
import logo from '../../Assets/images/logo.png';
import classes from './Logo.module.css';
import {Link} from 'react-router-dom';

const Logo=props=>{
    return(
        <Link style={{height:props.height}} to="/">
            <div className={classes.Logo} >
                <img src={logo} alt="Calculator Logo" ></img>
            </div>
        </Link>
    );
};

export default Logo;