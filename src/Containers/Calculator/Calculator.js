import React,{useEffect, useReducer, useState} from 'react';
import classes from './Calculator.module.css';

import Controls from '../../Components/Calculator/Controls/Controls';
import Monitor from '../../Components/Calculator/Monitor/Monitor';
import Button from '../../Components/UI/Button/Button';
import Spinner from '../../Components/UI/Spinner/Spinner';

import {charReplace as replace} from '../../shared/utility';

import {connect} from 'react-redux';
import * as actions from '../../Store/Actions/index';

const initialState={
    lastAmount:0,
    operation:null,
    before:null,
    lastWasOperation:false
};

const calculatorReducer=(calculationState=initialState, action)=>{
    switch (action.type) {
        case "onSetLastAmount":
            console.log('anyád');return {...calculationState, lastAmount:action.lastAmount};
        case "onSetOperation":
            return {...calculationState, operation:action.operation};
        case "onSetBefore":
            return {...calculationState, before:action.before};
        case "onSetLastWasOperation":
            return {...calculationState, lastWasOperation:action.lastWasOperation};
    
        default: 
             throw new Error(action.type);
    }
};

const Calculator =props=>{
    const {amount, token, userId, aboutToSave, onAboutToSave, onSave, onSetAmount}=props;

    const [isValidAmount,setIsValidAmount]=useState(true);
    const [isValidBefore,setIsValidBefore]=useState(true);
    const [ableToSave,setAbleToSave]=useState(false);

    const [calculationState, dispatch]=useReducer(calculatorReducer,initialState);

    const isNumber=(arr)=>{ return arr[0] === "NUMBER"; };
    const isOp=(arr)=>{ return arr[0] === "OPERATIONS" };
    const isBackCat=(arr)=>{ return arr[1] === "BACK" };
    const isBackOp=(val)=>{ return val === "BACK"};
    const isCancelOp=(val)=>{ return val === "CANCEL"};
    const isComma=(arr)=>{ return arr[1] === "COMMA" };
    const isEqual=(arr)=>{ return arr[1] === "EQUAL" };
    const isTypicOp=(arr)=>{ return arr[1] === "TYPIC_OPERATIONS" };

    const clickedHandler=(cat,val)=>{
        setAbleToSave(false);
        if(isNumber(cat)){  return numberIsNext(val); }; 
        if(isOp(cat)){ 
            if(isBackCat(cat)){ 
                if(isBackOp(val)){ return backOperation(); };
                if(isCancelOp(val)){ return cancelOperation();}; 
                throw new Error("Hiba a Calculator clickhandler-ben");
            };
            if( isComma(cat) ){ return commaOperation(); };
            if( isEqual(cat) ){ return equalOperation(); };
            if(isTypicOp(cat)){ return typicOperation(val); }
            throw new Error("Hiba a Calculator clickhandler-ben");
        };
        throw new Error("Hiba a Calculator clickhandler-ben");
    }

    const numberIsNext=(val)=>{
        if(!amount){ 
            onSetAmount(val); 
            dispatch({type:"onSetLastWasOperation", operation:false}); 
        } else if(
            amount.length<14){
            const actAmount = amount + val;
            onSetAmount(actAmount); 
            dispatch({type:"onSetLastWasOperation", operation:false}); 
        };
    };

    const typicOperation=(val)=>{
        let operation='';
        switch (val) {
            case 'DIVIDE_SPEC': dispatch({type:"onSetOperation", operation:'DIVIDE_SPEC'}); operation='%'; 
                                dispatch({type:"onSetBefore", before:(Number(amount).toString()+'%')});
                break;
            case 'DIVIDE':  dispatch({type:"onSetOperation", operation:'DIVIDE'}); operation='/'; 
                            dispatch({type:"onSetBefore", before:(Number(amount).toString()+'/')});
                break;
            case 'X':       dispatch({type:"onSetOperation", operation:'X'}); operation='*'; 
                            dispatch({type:"onSetBefore", before:(Number(amount).toString()+'*')});
                break;
            case 'NEG':     dispatch({type:"onSetOperation", operation:'NEG'}); operation='-'; 
                            dispatch({type:"onSetBefore", before:(Number(amount).toString()+'-')});
                break;
            case 'PLUS':    dispatch({type:"onSetOperation", operation:'PLUS'}); operation='+'; 
                            dispatch({type:"onSetBefore", before:(Number(amount).toString()+'+')});
                break;
            case 'CHANGE': 
                return changeOperation();
            default: 
                throw new Error('Hiba a Calculator.js : typicOperation-nál');
        }
        if(calculationState.lastWasOperation){
            dispatch({type:"onSetBefore", before:(Number(calculationState.lastAmount).toString()+operation)});
            dispatch({type:"onSetLastWasOperation", operation:true});
        }else{
            dispatch({type:"onSetLastWasOperation", operation:true});
            dispatch({type:"onSetLastAmount", lastAmount:amount});
            onSetAmount(0);
        }
    };

    const equalOperation=()=>{
        const a= +amount;
        const lastAm= +calculationState.lastAmount;
        const op= calculationState.operation;
        let res=null;
        switch (op) {
            case 'PLUS': res=lastAm+a; dispatch({type:"onSetBefore", before:Number(lastAm).toString()+'+'+a});
                break;
            case 'NEG': res=lastAm-a; dispatch({type:"onSetBefore", before:Number(lastAm).toString()+'-'+a});
                break;
            case 'X': res=lastAm*a; dispatch({type:"onSetBefore", before:Number(lastAm).toString()+'*'+a});
                break;
            case 'DIVIDE': res=lastAm/a; dispatch({type:"onSetBefore", before:Number(lastAm).toString()+'/'+a});
                break;
            case 'DIVIDE_SPEC': res=lastAm%a; dispatch({type:"onSetBefore", before:Number(lastAm).toString()+'%'+a});
                break;
            default:
                return res=a;
        };
        dispatch({type:"onSetLastAmount", lastAmount:a});
        onSetAmount(res);
        dispatch({type:"onSetLastWasOperation", lastWasOperation:false});
        onAboutToSave(false);

        if(a){setAbleToSave(true);}
    };

    const backOperation=()=>{
        if(amount.length>1){
            onSetAmount(amount.substring(0,amount.length-1));
            dispatch({type:"onSetBefore", before:null});
        }else{
            onSetAmount(0);
            dispatch({type:"onSetBefore", before:null});
        }
        dispatch({type:"onSetOperation", operation:null});
        dispatch({type:"onSetLastWasOperation", lastWasOperation:false});
    };

    const cancelOperation=()=>{
        onSetAmount(0);
        dispatch({type:"onSetLastAmount", lastAmount:0});
        dispatch({type:"onSetOperation", operation:null});
        dispatch({type:'onSetBefore', before:null});
        dispatch({type:"onSetLastWasOperation", lastWasOperation:false});
    };

    const commaOperation=()=>{
        if(amount.indexOf('.')===-1){
            const digit=amount.concat('.'); 
            onSetAmount(digit);
        };
    };

    const changeOperation=()=>{
        onSetAmount(-amount);
    };    

    const isValidNumber=(num)=>{
        return typeof +num == 'number' && isFinite(num);
    };

    useEffect(()=>{
        if(amount && amount.toString().length>15){ setIsValidAmount(false); } 
            else { setIsValidAmount(true); };
        if(calculationState.before && calculationState.before.toString().length>20){ setIsValidBefore(false); }
            else{ setIsValidBefore(true); };
    },[amount,calculationState.before]);

    useEffect(()=>{
        if(aboutToSave){
            //redirect nincs megoldva
            onSave(amount,userId,token);
            onAboutToSave(false);
            props.history.push("/results");
        }
    });
    
    const saveHandler=(event)=>{
        event.preventDefault();
        if(props.isAuthenticated){
            onSave(amount,userId,token);
        }else{
            onAboutToSave(true);
            props.history.push("/auth");
        }
    };

    let am= amount? replace(amount,".",","):0;
    let bef= calculationState.before? replace(calculationState.before,".",","):null; 
    if(!isValidAmount){
        am= amount? amount.toString().substring(0,15).replace(".",",")+'!!!': 0;
    };
    //charReplace is because of the double numbers!
    if(amount && !isValidNumber(replace(amount,",","9"))){am= "Hibás számítás!";}; 
    if(!isValidBefore){
        bef= calculationState.before? replace(calculationState.before.toString().substring(0,20),".",","):null;
    };

    let monitor=<Monitor amount={am} before={bef} />;
    let save=(
        <div className={classes.saveDiv}>
            <form onSubmit={saveHandler}>
                <Button disabled={!ableToSave}
                        btnType={!ableToSave?'Danger':'Success'}        
                >{props.isAuthenticated?'SAVE RESULT':'SIGN UP & SAVE'}</Button>
            </form>
        </div>
    );

    let controls=<Controls clicked={clickedHandler}/>;
    if(props.resultLoading){controls=<Spinner />;}
    
    return(
        <div>
            <div className={classes.Content}>
                {monitor}
                {controls}
            </div>
            {save}
        </div>
    );
};

const mapStateToProps=state=>{
    return{
        amount:state.calculator.amount,
        token:state.auth.token,
        userId:state.auth.userId,
        resultLoading:state.results.loading,
        isAuthenticated:state.auth.token!==null,
        aboutToSave:state.calculator.aboutToSave
    };
};

const mapDispatchToProps=dispatch=>{
    return{
        onSetAmount:(am)=>dispatch(actions.setAmount(am)), //action creators miatt NEM {type:"...", amount:am}// A return (JSObj lesz dispatch-elve)
        onSave:(res,uid,token)=>dispatch(actions.saveResult(res,uid,token)),
        onAboutToSave:(bool)=>dispatch(actions.aboutToSave(bool))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(React.memo(Calculator));