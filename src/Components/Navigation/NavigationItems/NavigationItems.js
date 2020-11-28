import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';
import Auxillary from '../../../hoc/Auxillary/Auxillary';

const NavigationItems=props=>{
    const {isAuth}=props;

    let render=(<NavigationItem link="/auth">Sign in</NavigationItem>);
    if(isAuth){
        render=(
            <Auxillary>
                <NavigationItem link="/results">Results</NavigationItem>
                <NavigationItem link="/logout">Logout</NavigationItem>
            </Auxillary>
        );
    };

    return(
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/" exact>Calculator</NavigationItem>
            {render}
        </ul>
    );
};

export default NavigationItems;