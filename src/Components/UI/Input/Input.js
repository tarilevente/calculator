import React from 'react';
import classes from './Input.module.css';

const Input = React.forwardRef((props,ref) =>{
    let inputElement=null;
    const inputClasses=[classes.InputElement];

    switch (props.elementType) {
        case 'input':
            inputElement=<input 
                className={inputClasses.join(' ')}
                {...props.elementConfig} 
                value={props.value}
                onChange={props.changed}
                ref={ref}/>
            break;
    
        case  'select' :
            inputElement = (
                <select
                    className={inputClasses.join(' ')}
                    value={props.value}
                    onChange={props.changed}
                    ref={ref}>
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>
            );
            break;

        default:
            inputElement=<input 
                className={inputClasses.join(' ')} 
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}
                ref={ref}/>
            break;
    }
    return(
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    );
});

export default Input;