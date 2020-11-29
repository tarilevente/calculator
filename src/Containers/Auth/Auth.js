import React, { useEffect, useState } from 'react';

import classes from './Auth.module.css';
import {updateObject, checkValidity} from '../../shared/utility';
import {connect} from 'react-redux';

import Input from '../../Components/UI/Input/Input';
import Button from '../../Components/UI/Button/Button';
import Spinner from '../../Components/UI/Spinner/Spinner';

import * as actions from '../../Store/Actions/index';
import {Redirect} from 'react-router-dom';

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
        },
        registration:{
            elementType:'select',
            elementConfig:{
                options:[
                    {value:'Login', displayValue:'Login'},    
                    {value:'SignUp', displayValue:'Sign up'}    
                ]
            },
            value:'Login',
            validation:{},
            valid:true
        }
    });

    const {aboutToSave,getAuthRedirectPath,onSetAuthRedirectPath,isAuthenticated}=props;

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
    
    console.log('isAuthenticated: '+isAuthenticated);
    console.log('getAuthRedPath: '+getAuthRedirectPath);
    let authRedirect=null;
    if(isAuthenticated){
        authRedirect=<Redirect to={getAuthRedirectPath} />;
    }

    useEffect(()=>{
        if(!aboutToSave && getAuthRedirectPath!=='/'){
            onSetAuthRedirectPath('/');
        }
    },[aboutToSave,getAuthRedirectPath,onSetAuthRedirectPath]);

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

    if(props.loading){form=<Spinner/>;}

    let errorMsg=null;
    if(props.error){errorMsg=<h2>{props.error}</h2>;}

    return(
        <div className={classes.Auth}>
            {authRedirect}
            {errorMsg}
            <form onSubmit={submitHandler}>
                {form}
                <Button btnType="Success" >{authForm.registration.value==='Login'?'LOG IN':'SIGN UP'}</Button>
            </form>
        </div>
    );
};

const mapStateToProps=state=>{
    return{
        loading:state.auth.loading,
        error:state.auth.error,
        isAuthenticated:state.auth.userId!==null,
        aboutToSave:state.calculator.aboutToSave,
        getAuthRedirectPath:state.auth.authRedirectPath
    };
};

const mapDispatchToProps=dispatch=>{
    return{
        onAuth:(mail,pwd,isSign)=>dispatch(actions.auth(mail,pwd,isSign)),
        onSetAuthRedirectPath:(path)=>dispatch(actions.setRedirectPath(path))
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(Auth);