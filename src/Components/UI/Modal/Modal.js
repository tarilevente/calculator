import React from 'react';
import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';
import Auxillary from '../../../hoc/Auxillary/Auxillary';


const Modal = props =>{
    return(
        <Auxillary>
            <Backdrop show={props.show} clicked={props.modalClosed} />
            <div className={classes.Modal}
                style={{
                    transform:props.show?'translateY(0)':'translateY(-100vh)',
                    opacity:props.show?'1':'0'
                }}>
                {props.children}
            </div>

        </Auxillary>
    );
};

export default React.memo(
    Modal,
    (prevProps, nextProps)=>
        nextProps.show === prevProps.show &&
        nextProps.children === prevProps.children
);