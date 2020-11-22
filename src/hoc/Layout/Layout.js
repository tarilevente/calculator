import React,{useState} from 'react';
import classes from './Layout.module.css';
import Toolbar from '../../Components/Navigation/Toolbar/Toolbar';
import Auxillary from '../Auxillary/Auxillary';
import SideDrawer from '../../Components/Navigation/SideDrawer/SideDrawer';

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
            <SideDrawer 
                open={sideDrawerIsVisible}
                closed={sideDrawerClosedHandler}/>
            <main className={classes.Content}>
                {props.children}
            </main>
        </Auxillary>
    );
}

export default Layout;