import React,{useEffect, useState} from 'react';
import classes from './Calculator.module.css';
import Controls from '../../Components/Calculator/Controls/Controls';
import Monitor from '../../Components/Calculator/Monitor/Monitor';

const Calculator =props=>{
    const [amount,setAmount]=useState(0);
    const [lastAmount,setLastAmount]=useState(0);
    const [operation, setOperation]=useState(null);
    const [before, setBefore]=useState(0);
    const [isValidAmount,setIsValidAmount]=useState(true);
    const [isValidBefore,setIsValidBefore]=useState(true);

    const clickedHandler=(val)=>{
        switch (val[0]) {
            case '#': numberIsNext(val);
                break;
            case '&': opIsNext(val);
                break;
            case ',': commaOperation();
                break;
            default: throw new Error('Hiba a Calculator.js- clickHandler-nél');
        }
    };

    const numberIsNext=(val)=>{
        const v=val.substring(1);
        if(!amount){
            setAmount(v);
        }else if(amount.length<14){
            const actAmount=amount+v;
            setAmount(actAmount);
        };
    };

    const opIsNext=(val)=>{
        setLastAmount(amount);
        setAmount(0);
        const v= val.substring(1);
        switch (v[0]) {
            case '&': typicOperation(v);
                break;
            case '=': equalOperation();
                break;
            case '!': deleteOperation(v);
                break;
        
            default: throw new Error('Hiba a Calculator.js opIsNext()-nél');
        }
    };

    const typicOperation=(val)=>{
        const v=val.substring(1);
        switch (v) {
            case 'DIVIDE_SPEC':setOperation('DIVIDE_SPEC');setBefore(amount.toString()+'%');
                break;
            case 'DIVIDE':setOperation('DIVIDE');setBefore(amount.toString()+'/');
                break;
            case 'X':setOperation('X');setBefore(amount.toString()+'*');
                break;
            case 'NEG':setOperation('NEG');setBefore(amount.toString()+'-');
                break;
            case 'PLUS':setOperation('PLUS');setBefore(amount.toString()+'+');
                break;
            case 'CHANGE':changeOperation(); setBefore(null);
                break;
            default: 
                throw new Error('Hiba a Calculator.js : controlOperation-nál');
        }
    };

    const equalOperation=()=>{
        const a=+amount;
        const la=+lastAmount;
        const op=operation;
        let res=null;
        switch (op) {
            case 'PLUS': res=la+a; setBefore(la.toString()+'+'+a);
                break;
            case 'NEG': res=la-a; setBefore(la.toString()+'-'+a);
                break;
            case 'X': res=la*a; setBefore(la.toString()+'*'+a);
                break;
            case 'DIVIDE': res=la/a; setBefore(la.toString()+'/'+a);
                break;
            case 'DIVIDE_SPEC': res=la%a; setBefore(la.toString()+'%'+a);
                break;
        };
        setLastAmount(amount);
        setAmount(res);
    };

    const deleteOperation=(val)=>{
        const v=val.substring(1);
        if(v==='BACK'){
            if(amount.length>1){
                setAmount(amount.substring(0,amount.length-1));
                setBefore(null);
            }else{
                setAmount(0);
                setBefore(null);
            }
            setOperation(null);
        }else if(val.substring(1)==='CANCEL'){
            setAmount(0);
            setLastAmount(0);
            setOperation(null);
            setBefore(null);
        }
    };

    const commaOperation=()=>{
        if(amount.indexOf('.')==-1){
            const digit=amount+'.';
            console.log(digit);
            setAmount(digit);
        }
    };

    const changeOperation=()=>{
        setAmount(-amount);
        setOperation(null);
    };    

    const isNumber=(num)=>{
        return typeof +num == 'number' && isFinite(num);
    };

    useEffect(()=>{
        if(amount && amount.toString().length>15){
            setIsValidAmount(false);
        }else{
            setIsValidAmount(true);
        };
        if(before && before.toString().length>20){
            setIsValidBefore(false);
        }else{
            setIsValidBefore(true);
        };
    },[amount,before]);

    useEffect(()=>{
    },[operation]);

    let am=amount?amount.toString().replace(".", ","):0;
    let bef=before?before.toString().replace(".", ","):null;
    if(!isValidAmount){
        am=amount?amount.toString().substring(0,15).replace(".",",")+'!!!':0;
    };
    if(amount && !isNumber(amount.toString().replace(",","9"))){am="Hibás számítás!";};
    if(!isValidBefore){
        bef=before?before.toString().substring(0,20).replace(".",",")+'!!!':null;
    };
    let render=<Monitor amount={am} before={bef} />;
    
    return(
        <div className={classes.Content}>
            {render}
            <Controls clicked={clickedHandler}/>
        </div>
    );
};

export default Calculator;