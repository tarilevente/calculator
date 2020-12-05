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
    const {amount, token, userId, onAboutToSave, onSave, onSetAmount, aboutToSave}=props;

    const [isValidAmount,setIsValidAmount]=useState(true);
    const [isValidBefore,setIsValidBefore]=useState(true);
    const [ableToSave,setAbleToSave]=useState(false);

    const [lastAmount, onSetLastAmount]=useState(0);
    const [operation, onSetOperation]=useState(null);
    const [before, onSetBefore]=useState(null);
    const [lastWasOperation, onSetLastWasOperation]=useState(false);

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
            onSetLastWasOperation(false); 
        } else if(
            amount.length<14){
            const actAmount = amount + val;
            onSetAmount(actAmount); 
            onSetLastWasOperation(false);
        };
    };

    const typicOperation=(val)=>{
        let operation='';
        switch (val) {
            case 'DIVIDE_SPEC':onSetOperation('DIVIDE_SPEC'); operation='%'; onSetBefore(Number(amount).toString()+'%');
                break;
            case 'DIVIDE':onSetOperation('DIVIDE'); operation='/'; onSetBefore(Number(amount).toString()+'/');
                break;
            case 'X':onSetOperation('X'); operation='*'; onSetBefore(Number(amount).toString()+'*');
                break;
            case 'NEG':onSetOperation('NEG'); operation='-'; onSetBefore(Number(amount).toString()+'-');
                break;
            case 'PLUS':onSetOperation('PLUS'); operation='+'; onSetBefore(Number(amount).toString()+'+');
                break;
            case 'CHANGE': 
                return changeOperation();
            default: 
                throw new Error('Hiba a Calculator.js : typicOperation-nál');
        }
        if(lastWasOperation){
            onSetBefore(Number(lastAmount).toString()+operation);
            onSetLastWasOperation(true);
        }else{
            onSetLastWasOperation(true);
            onSetLastAmount(amount);
            onSetAmount(0);
        }
    };

    const equalOperation=()=>{
        const a= +amount;
        const lastAm= +lastAmount;
        const op= operation;
        let res=null;
        switch (op) {
            case 'PLUS': res=lastAm+a; onSetBefore(Number(lastAm).toString()+'+'+a);
                break;
            case 'NEG': res=lastAm-a; onSetBefore(Number(lastAm).toString()+'-'+a);
                break;
            case 'X': res=lastAm*a; onSetBefore(Number(lastAm).toString()+'*'+a);
                break;
            case 'DIVIDE': res=lastAm/a; onSetBefore(Number(lastAm).toString()+'/'+a);
                break;
            case 'DIVIDE_SPEC': res=lastAm%a; onSetBefore(Number(lastAm).toString()+'%'+a);
                break;
            default:
                return res=a;
        };
        onSetLastAmount(a);
        onSetAmount(res);
        onSetLastWasOperation(false);
        onAboutToSave(false);

        if(a){setAbleToSave(true);}
    };

    const backOperation=()=>{
        if(amount.length>1){
            onSetAmount(amount.substring(0,amount.length-1));
            onSetBefore(null);
        }else{
            onSetAmount(0);
            onSetBefore(null);
        }
        onSetOperation(null);
        onSetLastWasOperation(false);
    };

    const cancelOperation=()=>{
        onSetAmount(0);
        onSetLastAmount(0);
        onSetOperation(null);
        onSetBefore(null);
        onSetLastWasOperation(false);
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
        if(before && before.toString().length>20){ setIsValidBefore(false); }
            else{ setIsValidBefore(true); };
    },[amount,before]);

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