import React, { useState } from 'react';
import classes from './Auth.module.css';
import Input from '../../Components/UI/Input/Input';
import {updateObject, checkValidity} from '../../shared/utility';
import Button from '../../Components/UI/Button/Button';

const Auth=props=>{
    const [authForm,setAuthForm]=useState({
        email:{
            elementType:'input',
            elementConfig:{
                type:'email',
                placeholder:'Mail Address'
            },
            value:'',
            validation:{
                required:true,
                isEmail:true
            },
            valid:false,
            touched:false
        },
        password:{
            elementType:'input',
            elementConfig:{
                type:'password',
                placeholder:'Password'
            },
            value:'',
            validation:{
                required:true,
                minLength:6
            },
            valid:false,
            touched:false
        }
    });

    const inputChangedHandler=(event, controlName)=>{
        const updatedControls=updateObject(authForm,{
            [controlName]:updateObject(authForm[controlName],{
                value: event.target.value,
                valid: checkValidity(event.target.value, authForm[controlName].validation),
                touched:true
            })
        });
        setAuthForm(updatedControls);
    };

    const submitHandler=(event)=>{
        event.preventDefault();
        console.log('onAuth: '+authForm.email.value+' '+authForm.password.value);
    };

    let formElementsArray=[];
    //feltöltöm a tömböt, mert utána könnyen végig map-elem!
    for(let key in authForm){
        formElementsArray.push({
            id:key,
            config:authForm[key]
        });
    }

    let form=formElementsArray.map(formElement=>{
        return <Input 
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={(event)=>inputChangedHandler(event,formElement.id)} />
    });
    
    console.log(form);

    return(
        <div className={classes.Auth}>
            <form onSubmit={submitHandler}>
                {form}
                <Button btnType="Success" >SUBMIT</Button>
            </form>
        </div>
    );
};

export default Auth;