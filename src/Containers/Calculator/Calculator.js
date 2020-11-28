import React,{useEffect, useState} from 'react';
import classes from './Calculator.module.css';

import Controls from '../../Components/Calculator/Controls/Controls';
import Monitor from '../../Components/Calculator/Monitor/Monitor';
import Button from '../../Components/UI/Button/Button';
import Spinner from '../../Components/UI/Spinner/Spinner';

import {charReplace as replace} from '../../shared/utility';

import {connect} from 'react-redux';
import * as actions from '../../Store/Actions/index';

const Calculator =props=>{
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
        if(!props.getAmount){ 
            props.onSetAmount(val); 
            props.onLastWasTypicOperation(false); 
        } else if(
            props.getAmount.length<14){
            const actAmount = props.getAmount + val;
            props.onSetAmount(actAmount); 
            props.onLastWasTypicOperation(false);
        };
    };

    const typicOperation=(val)=>{
        let operation='';
        switch (val) {
            case 'DIVIDE_SPEC':props.onSetOperation('DIVIDE_SPEC'); operation='%'; props.onSetBefore(props.getAmount.toString()+'%');
                break;
            case 'DIVIDE':props.onSetOperation('DIVIDE'); operation='/'; props.onSetBefore(props.getAmount.toString()+'/');
                break;
            case 'X':props.onSetOperation('X'); operation='*'; props.onSetBefore(props.getAmount.toString()+'*');
                break;
            case 'NEG':props.onSetOperation('NEG'); operation='-'; props.onSetBefore(props.getAmount.toString()+'-');
                break;
            case 'PLUS':props.onSetOperation('PLUS'); operation='+'; props.onSetBefore(props.getAmount.toString()+'+');
                break;
            case 'CHANGE': 
                return changeOperation();
            default: 
                throw new Error('Hiba a Calculator.js : typicOperation-nál');
        }
        if(props.getLastWasOperation){
            props.onSetBefore(props.getLastAmount.toString()+operation);
            props.onLastWasTypicOperation(true);
        }else{
            props.onLastWasTypicOperation(true);
            props.onSetLastAmount(props.getAmount);
            props.onSetAmount(0);
        }
    };

    const equalOperation=()=>{
        const a= +props.getAmount;
        const lastAm= +props.getLastAmount;
        const op= props.getOperation;
        let res=null;
        switch (op) {
            case 'PLUS': res=lastAm+a; props.onSetBefore(lastAm.toString()+'+'+a);
                break;
            case 'NEG': res=lastAm-a; props.onSetBefore(lastAm.toString()+'-'+a);
                break;
            case 'X': res=lastAm*a; props.onSetBefore(lastAm.toString()+'*'+a);
                break;
            case 'DIVIDE': res=lastAm/a; props.onSetBefore(lastAm.toString()+'/'+a);
                break;
            case 'DIVIDE_SPEC': res=lastAm%a; props.onSetBefore(lastAm.toString()+'%'+a);
                break;
            default:
                return res=a;
        };
        props.onSetLastAmount(a);
        props.onSetAmount(res);
        props.onLastWasTypicOperation(false);

        if(a){setAbleToSave(true);}
    };

    const backOperation=()=>{
        if(props.getAmount.length>1){
            props.onSetAmount(props.getAmount.substring(0,props.getAmount.length-1));
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
        if(props.getAmount.indexOf('.')===-1){
            const digit=props.getAmount.concat('.'); 
            props.onSetAmount(digit);
        };
    };

    const changeOperation=()=>{
        props.onSetAmount(-props.getAmount);
    };    

    const isValidNumber=(num)=>{
        return typeof +num == 'number' && isFinite(num);
    };

    useEffect(()=>{
        if(props.getAmount && props.getAmount.toString().length>15){ setIsValidAmount(false); } 
            else { setIsValidAmount(true); };
        if(props.getBefore && props.getBefore.toString().length>20){ setIsValidBefore(false); }
            else{ setIsValidBefore(true); };
    },[props.getAmount,props.getBefore]);

    const saveHandler=(event)=>{
        event.preventDefault();
        props.onSave(props.getAmount,props.getUserId,props.getToken);
    };

    let am= props.getAmount? replace(props.getAmount,".",","):0;
    let bef= props.getBefore? replace(props.getBefore,".",","):null; 
    if(!isValidAmount){
        am= props.getAmount? props.getAmount.toString().substring(0,15).replace(".",",")+'!!!': 0;
    };
    //charReplace is because of the double numbers!
    if(props.getAmount && !isValidNumber(replace(props.getAmount,",","9"))){am= "Hibás számítás!";}; 
    if(!isValidBefore){
        bef= props.getBefore? replace(props.getBefore.toString().substring(0,20),".",","):null;
    };

    let monitor=<Monitor amount={am} before={bef} />;
    let save=(
        <div className={classes.saveDiv}>
            <form onSubmit={saveHandler}>
                <Button disabled={!ableToSave}
                        btnType={!ableToSave?'Danger':'Success'}        
                >Eredmény mentése</Button>
            </form>
        </div>
    );
    let controls=<Controls clicked={clickedHandler}/>;
    if(props.resultLoading){controls=<Spinner />;}

    return(
        <div className={classes.Content}>
            {monitor}
            {controls}
            {save}
        </div>
    );
};

const mapStateToProps=state=>{
    return{
        getAmount:state.calculator.amount,
        getLastAmount:state.calculator.lastAmount,
        getBefore:state.calculator.before,
        getOperation:state.calculator.operation,
        getLastWasOperation:state.calculator.lastWasOperation,
        getToken:state.auth.token,
        getUserId:state.auth.userId,
        resultLoading:state.results.loading
    };
};

const mapDispatchToProps=dispatch=>{
    return{
        onLastWasTypicOperation:(bool)=>dispatch(actions.setLastWasOperation(bool)),
        onSetAmount:(am)=>dispatch(actions.setAmount(am)), //action creators miatt NEM {type:"...", amount:am}// A return (JSObj lesz dispatch-elve)
        onSetLastAmount:(lam)=>dispatch(actions.setLastAmount(lam)),
        onSetBefore:(bef)=>dispatch(actions.setBefore(bef)),
        onSetOperation:(op)=>dispatch(actions.setOperation(op)),
        onSave:(res,uid,token)=>dispatch(actions.saveResult(res,uid,token))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(React.memo(Calculator));