import React,{useState} from 'react';
import classes from './Layout.module.css';
import Toolbar from '../../Components/Navigation/Toolbar/Toolbar';
import Auxillary from '../Auxillary/Auxillary';
import SideDrawer from '../../Components/Navigation/SideDrawer/SideDrawer';
import {connect} from 'react-redux';

const Layout =props=>{
    const [sideDrawerIsVisible, setSideDrawerIsVisible]=useState(false);

    const sideDrawerClosedHandler=()=>{
        setSideDrawerIsVisible(false);
    };

    const sideDrawerToggleHandler=()=>{
        setSideDrawerIsVisible(!sideDrawerIsVisible);
    };

    return(
        <Auxillary className={classes.Content}>
            <Toolbar 
                drawerToggleClicked={sideDrawerToggleHandler} 
                isAuth={props.isAuth}/>
            <SideDrawer 
                open={sideDrawerIsVisible}
                isAuth={props.isAuth}
                closed={sideDrawerClosedHandler}/>
            <main className={classes.Content}>
                {props.children}
            </main>
        </Auxillary>
    );
}

const mapStateToProps=state=>{
    return{
        isAuth:state.auth.token!==null
    }
};

export default connect(mapStateToProps)(Layout);