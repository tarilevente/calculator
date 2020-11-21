import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems=props=>(
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact>Calculator</NavigationItem>
        <NavigationItem link="/auth">Sign in</NavigationItem>
    </ul>
);

export default NavigationItems;