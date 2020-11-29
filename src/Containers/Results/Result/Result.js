import React from 'react';
import classes from './Result.module.css';

const Result = props =>{
    const date=new Date(props.date);
    const d=date.getFullYear()+'.'+(+date.getMonth()+1)+'.'+date.getDate()+'.';
    let min=date.getMinutes().toString();
    let sec=date.getSeconds().toString();
    if(min.length<2){min='0'+min;}
    if(sec.length<2){sec='0'+sec;}
    const i=date.getHours()+':'+min+':'+sec;
    return(
        <div className={classes.Result}>
            <p>Date: {d}</p>
            <p>Time: {i}</p>
            <p>Result: {props.result}</p>
        </div>
    );
};

export default Result;