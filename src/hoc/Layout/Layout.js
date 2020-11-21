import React,{useState} from 'react';
import classes from './Layout.module.css';
import Toolbar from '../../Components/Navigation/Toolbar/Toolbar';
import Auxillary from '../Auxillary/Auxillary';

const Layout =props=>{
    const [sideDrawerIsVisible, setSideDrawerIsVisible]=useState(false);

    const sideDrawerClosedHandler=()=>{
        setSideDrawerIsVisible(false);
    }

    const sideDrawerToggleHandler=()=>{
        setSideDrawerIsVisible(!sideDrawerIsVisible);
    }

    return(
        <Auxillary className={classes.Content}>
            <Toolbar drawerToggleClicked={sideDrawerToggleHandler} />
            <p>Layout</p>
        </Auxillary>
    );
}

export default Layout;