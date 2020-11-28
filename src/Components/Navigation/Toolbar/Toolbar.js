import React from 'react';
import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const toolbar=(props)=>{
    return(
        <header className={classes.Toolbar}>
            <DrawerToggle clicked={props.drawerToggleClicked} />
            <Logo height="90%" />
            <nav className={classes.DesktopOnly} >
                <NavigationItems isAuth={props.isAuth}/>
            </nav>
        </header>
    );
};

export default toolbar;