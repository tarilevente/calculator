import React,{useEffect, useState} from 'react';
import classes from './Calculator.module.css';
import Controls from '../../Components/Calculator/Controls/Controls';
import Monitor from '../../Components/Calculator/Monitor/Monitor';
import {charReplace as replace} from '../../shared/utility';

const Calculator =props=>{
    // const [amount,setAmount]=useState(0);
    // const [lastAmount,setLastAmount]=useState(0);
    // const [operation, setOperation]=useState(null);
    // const [before, setBefore]=useState(0);

    
    const [isValidAmount,setIsValidAmount]=useState(true);
    const [isValidBefore,setIsValidBefore]=useState(true);

    const isNumber=(arr)=>{ return arr[0] === "NUMBER"; };
    const isOp=(arr)=>{ return arr[0] === "OPERATIONS" };
    const isBackCat=(arr)=>{ return arr[1] === "BACK" };
    const isBackOp=(val)=>{ return val === "BACK"};
    const isCancelOp=(val)=>{ return val === "CANCEL"};
    const isComma=(arr)=>{ return arr[1] === "COMMA" };
    const isEqual=(arr)=>{ return arr[1] === "EQUAL" };
    const isTypicOp=(arr)=>{ return arr[1] === "TYPIC_OPERATIONS" };

    const clickedHandler=(cat,val)=>{
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
        if(!amount){ setAmount(val); } else 
        if(amount.length<14){
            const actAmount = amount + val;
            setAmount(actAmount);
        };
    };

    const typicOperation=(val)=>{
        switch (val) {
            case 'DIVIDE_SPEC':setOperation('DIVIDE_SPEC'); setBefore(amount.toString()+'%');
                break;
            case 'DIVIDE':setOperation('DIVIDE'); setBefore(amount.toString()+'/');
                break;
            case 'X':setOperation('X'); setBefore(amount.toString()+'*');
                break;
            case 'NEG':setOperation('NEG'); setBefore(amount.toString()+'-');
                break;
            case 'PLUS':setOperation('PLUS'); setBefore(amount.toString()+'+');
                break;
            case 'CHANGE': 
                return changeOperation();
            default: 
                throw new Error('Hiba a Calculator.js : typicOperation-nál');
        }
        setLastAmount(amount);
        setAmount(0);
    };

    const equalOperation=()=>{
        const a= +amount;
        const lastAm= +lastAmount;
        const op= operation;
        let res=null;
        switch (op) {
            case 'PLUS': res=lastAm+a; setBefore(lastAm.toString()+'+'+a);
                break;
            case 'NEG': res=lastAm-a; setBefore(lastAm.toString()+'-'+a);
                break;
            case 'X': res=lastAm*a; setBefore(lastAm.toString()+'*'+a);
                break;
            case 'DIVIDE': res=lastAm/a; setBefore(lastAm.toString()+'/'+a);
                break;
            case 'DIVIDE_SPEC': res=lastAm%a; setBefore(lastAm.toString()+'%'+a);
                break;
            default:
                throw new Error('hiba a calculator.js-ben az equalOperation-nál.');
        };
        setLastAmount(amount);
        setAmount(res);
    };

    const backOperation=()=>{
        if(amount.length>1){
            setAmount(amount.substring(0,amount.length-1));
            setBefore(null);
        }else{
            setAmount(0);
            setBefore(null);
        }
        setOperation(null);
    };

    const cancelOperation=()=>{
        setAmount(0);
        setLastAmount(0);
        setOperation(null);
        setBefore(null);
    };

    const commaOperation=()=>{
        if(amount.indexOf('.')===-1){
            const digit=amount.concat('.'); 
            setAmount(digit);
        };
    };

    const changeOperation=()=>{
        setAmount(-amount);
        // setOperation(null);
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

    let render=<Monitor amount={am} before={bef} />;
    return(
        <div className={classes.Content}>
            {render}
            <Controls clicked={clickedHandler}/>
        </div>
    );
};

export default React.memo(Calculator);