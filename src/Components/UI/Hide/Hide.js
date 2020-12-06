import React from 'react';
import classes from './Hide.module.css';
import CSSTransition from 'react-transition-group/CSSTransition';

const animationTiming={
    enter:150,
    exit:250
};

const Hide=props=>{

    return(
        <>
            <div className={classes.HideButtonContainer}>
                <a href="/" onClick={props.hideHandler}>{props.hide?"Reveal them!":"Hide them!"}</a>
            </div>
            <CSSTransition 
                mountOnEnter 
                unmountOnExit 
                in={props.hide} 
                timeout={animationTiming}
                classNames={{
                    enter: '',
                    enterActive: 'ModalOpen',
                    exit: '',
                    exitActive: 'ModalClosed'
                }}>
                <div className={classes.Modal}>Modal</div>
            </CSSTransition>
        </>
    );
};

export default Hide;