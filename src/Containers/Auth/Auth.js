import React, { useState, useRef, useEffect } from 'react';

import classes from './Auth.module.css';
import {updateObject, checkValidity} from '../../shared/utility';
import {connect} from 'react-redux';

import Input from '../../Components/UI/Input/Input';
import Button from '../../Components/UI/Button/Button';
import Spinner from '../../Components/UI/Spinner/Spinner';

import * as actions from '../../Store/Actions/index';

const Auth=props=>{
    let mainMethod='Login';
    if(props.aboutToSave){mainMethod='SignUp';}

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
        },
        registration:{
            elementType:'select',
            elementConfig:{
                options:[
                    {value:'Login', displayValue:'Login'},    
                    {value:'SignUp', displayValue:'Sign up'}    
                ]
            },
            value: mainMethod,
            validation:{},
            valid:true
        }
    });
    const {aboutToSave}=props;

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
        if(authForm.registration.value==='Login'){
            props.onAuth(authForm.email.value, authForm.password.value,false);
        }else if(authForm.registration.value==='SignUp'){
            props.onAuth(authForm.email.value, authForm.password.value,true);
        }
    };

    let formElementsArray=[];
    for(let key in authForm){
        formElementsArray.push({
            id:key,
            config:authForm[key]
        });
    }

    let refs=useRef([]);
    refs.current=formElementsArray.map(
        (_,index)=>refs.current[index]=React.createRef()
    );  
    let form=formElementsArray.map((formElement,index)=>{
        return <Input 
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={(event)=>inputChangedHandler(event,formElement.id)} 
            ref={refs.current[index]}/>
    });
    
    useEffect(()=>{
        refs.current[0].current.focus();
        refs.current[1].current.disabled=true;
        refs.current[1].current.placeholder="Password - Text a Mail first!";
    },[]);
    
    useEffect(()=>{
        const userInput=document.querySelector('input');
        const val=userInput.value;
        if(val===refs.current[0].current.value && authForm.email.valid===true){
            refs.current[1].current.disabled=false;
        }else{
            refs.current[1].current.value="";
            refs.current[1].current.placeholder="Password - Text a Mail first!";
            refs.current[1].current.disabled=true;
        }
    },[refs, authForm]);


    if(props.loading){form=<Spinner/>;}

    let errorMsg=null;
    if(props.error){errorMsg=<h2>{props.error}</h2>;}

    let buttonString=null;
    if(authForm.registration.value==='Login' && !aboutToSave){ buttonString='LOG IN'}
    else if(authForm.registration.value==='SignUp' && !aboutToSave){ buttonString='SIGN UP'}
    else if(aboutToSave){ 
        buttonString='SIGN UP'; 
    }

    return(
        <div className={classes.Auth}>
            {errorMsg}
            <form onSubmit={submitHandler}>
                {form}
                <Button btnType="Success" >{buttonString}</Button>
            </form>
        </div>
    );
};

const mapStateToProps=state=>{
    return{
        loading:state.auth.loading,
        error:state.auth.error,
        isAuthenticated:state.auth.token!==null,
        aboutToSave:state.calculator.aboutToSave
    };
};

const mapDispatchToProps=dispatch=>{
    return{
        onAuth:(mail,pwd,isSign)=>dispatch(actions.auth(mail,pwd,isSign))
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(Auth);