import React,{useEffect, useState} from 'react';
import classes from './Calculator.module.css';

import Controls from '../../Components/Calculator/Controls/Controls';
import Monitor from '../../Components/Calculator/Monitor/Monitor';
import Button from '../../Components/UI/Button/Button';
import Spinner from '../../Components/UI/Spinner/Spinner';

import {charReplace as replace} from '../../shared/utility';

import {connect} from 'react-redux';
import * as actions from '../../Store/Actions/index';
import {Redirect} from 'react-router-dom';

const Calculator =props=>{
    const {amount, lastAmount, before, operation, lastWasOperation, token, userId, redirectPath, onAboutToSave, onSave, aboutToSave}=props;

    const [isValidAmount,setIsValidAmount]=useState(true);
    const [isValidBefore,setIsValidBefore]=useState(true);
    const [ableToSave,setAbleToSave]=useState(false);

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
            props.onSetAmount(val); 
            props.onLastWasTypicOperation(false); 
        } else if(
            amount.length<14){
            const actAmount = amount + val;
            props.onSetAmount(actAmount); 
            props.onLastWasTypicOperation(false);
        };
    };

    const typicOperation=(val)=>{
        let operation='';
        switch (val) {
            case 'DIVIDE_SPEC':props.onSetOperation('DIVIDE_SPEC'); operation='%'; props.onSetBefore(Number(amount).toString()+'%');
                break;
            case 'DIVIDE':props.onSetOperation('DIVIDE'); operation='/'; props.onSetBefore(Number(amount).toString()+'/');
                break;
            case 'X':props.onSetOperation('X'); operation='*'; props.onSetBefore(Number(amount).toString()+'*');
                break;
            case 'NEG':props.onSetOperation('NEG'); operation='-'; props.onSetBefore(Number(amount).toString()+'-');
                break;
            case 'PLUS':props.onSetOperation('PLUS'); operation='+'; props.onSetBefore(Number(amount).toString()+'+');
                break;
            case 'CHANGE': 
                return changeOperation();
            default: 
                throw new Error('Hiba a Calculator.js : typicOperation-nál');
        }
        if(lastWasOperation){
            props.onSetBefore(Number(lastAmount).toString()+operation);
            props.onLastWasTypicOperation(true);
        }else{
            props.onLastWasTypicOperation(true);
            props.onSetLastAmount(amount);
            props.onSetAmount(0);
        }
    };

    const equalOperation=()=>{
        const a= +amount;
        const lastAm= +lastAmount;
        const op= operation;
        let res=null;
        switch (op) {
            case 'PLUS': res=lastAm+a; props.onSetBefore(Number(lastAm).toString()+'+'+a);
                break;
            case 'NEG': res=lastAm-a; props.onSetBefore(Number(lastAm).toString()+'-'+a);
                break;
            case 'X': res=lastAm*a; props.onSetBefore(Number(lastAm).toString()+'*'+a);
                break;
            case 'DIVIDE': res=lastAm/a; props.onSetBefore(Number(lastAm).toString()+'/'+a);
                break;
            case 'DIVIDE_SPEC': res=lastAm%a; props.onSetBefore(Number(lastAm).toString()+'%'+a);
                break;
            default:
                return res=a;
        };
        props.onSetLastAmount(a);
        props.onSetAmount(res);
        props.onLastWasTypicOperation(false);
        onAboutToSave(false);

        if(a){setAbleToSave(true);}
    };

    const backOperation=()=>{
        if(amount.length>1){
            props.onSetAmount(amount.substring(0,amount.length-1));
            props.onSetBefore(null);
        }else{
            props.onSetAmount(0);
            props.onSetBefore(null);
        }
        props.onSetOperation(null);
        props.onLastWasTypicOperation(false);
    };

    const cancelOperation=()=>{
        props.onSetAmount(0);
        props.onSetLastAmount(0);
        props.onSetOperation(null);
        props.onSetBefore(null);
        props.onLastWasTypicOperation(false);
    };

    const commaOperation=()=>{
        if(amount.indexOf('.')===-1){
            const digit=amount.concat('.'); 
            props.onSetAmount(digit);
        };
    };

    const changeOperation=()=>{
        props.onSetAmount(-amount);
    };    

    const isValidNumber=(num)=>{
        return typeof +num == 'number' && isFinite(num);
    };

    useEffect(()=>{
        if(amount && amount.toString().length>15){ setIsValidAmount(false); } 
            else { setIsValidAmount(true); };
        if(before && before.toString().length>20){ setIsValidBefore(false); }
            else{ setIsValidBefore(true); };
    },[amount,before]);

    const saveHandler=(event)=>{
        event.preventDefault();
        if(props.isAuthenticated){
            onSave(amount,userId,token);
        }else{
            onAboutToSave(true);
            props.onSetAuthRedirectPath('/results');
            props.history.push("/auth");
        }
    };

    let am= amount? replace(amount,".",","):0;
    let bef= before? replace(before,".",","):null; 
    if(!isValidAmount){
        am= amount? amount.toString().substring(0,15).replace(".",",")+'!!!': 0;
    };
    //charReplace is because of the double numbers!
    if(amount && !isValidNumber(replace(amount,",","9"))){am= "Hibás számítás!";}; 
    if(!isValidBefore){
        bef= before? replace(before.toString().substring(0,20),".",","):null;
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

    let redirect=null;
    if(aboutToSave){ 
        // debugger;
        redirect=<Redirect to={redirectPath} />; 
        onAboutToSave(false);
        onSave(amount,userId,token);
    }
    
    return(
        <div>
            <div className={classes.Content}>
                {redirect}
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
        lastAmount:state.calculator.lastAmount,
        before:state.calculator.before,
        operation:state.calculator.operation,
        lastWasOperation:state.calculator.lastWasOperation,
        token:state.auth.token,
        userId:state.auth.userId,
        resultLoading:state.results.loading,
        isAuthenticated:state.auth.token!==null,
        aboutToSave:state.calculator.aboutToSave,
        redirectPath:state.auth.authRedirectPath
    };
};

const mapDispatchToProps=dispatch=>{
    return{
        onLastWasTypicOperation:(bool)=>dispatch(actions.setLastWasOperation(bool)),
        onSetAmount:(am)=>dispatch(actions.setAmount(am)), //action creators miatt NEM {type:"...", amount:am}// A return (JSObj lesz dispatch-elve)
        onSetLastAmount:(lam)=>dispatch(actions.setLastAmount(lam)),
        onSetBefore:(bef)=>dispatch(actions.setBefore(bef)),
        onSetOperation:(op)=>dispatch(actions.setOperation(op)),
        onSave:(res,uid,token)=>dispatch(actions.saveResult(res,uid,token)),
        onAboutToSave:(bool)=>dispatch(actions.aboutToSave(bool)),
        onSetAuthRedirectPath:(path)=>dispatch(actions.setRedirectPath(path))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(React.memo(Calculator));