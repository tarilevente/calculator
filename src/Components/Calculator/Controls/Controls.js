import React from 'react';
import classes from './Controls.module.css';
import ControlElement from './ControlElement/ControlElement';

const controls={
        CLEAR:{
            display:"C",
            click:"props.cancel",
            color:"darkred",
            bg:"honeydew"
        },
        MPlus:{
            display:"M+",
            click:"props.MPlus",
            color:"darkred",
            bg:"honeydew"
        },
        MMinus:{
            display:"M-",
            click:"MMinus",
            color:"darkred",
            bg:"honeydew"
        },
        MS:{
            display:"MS",
            click:"MS",
            color:"darkred",
            bg:"honeydew"
        },
        SEVEN:{
            display:"7",
            click:"7",
            color:"black",
            bg:"lightgray"
        },
        EIGHT:{
            display:"8",
            click:"8",
            color:"black",
            bg:"lightgray"
        },
        NINE:{
            display:"9",
            click:"9",
            color:"black",
            bg:"lightgray"
        },
        X:{
            display:"X",
            click:"X",
            color:"darkred",
            bg:"honeydew"
        },
        FOUR:{
            display:"4",
            click:"4",
            color:"black",
            bg:"lightgray"
        },
        FIVE:{
            display:"5",
            click:"5",
            color:"black",
            bg:"lightgray"
        },
        SIX:{
            display:"6",
            click:"6",
            color:"black",
            bg:"lightgray"
        },
        NEG:{
            display:"-",
            click:"NEG",
            color:"darkred",
            bg:"honeydew"
        },
        ONE:{
            display:"1",
            click:"1",
            color:"black",
            bg:"lightgray"
        },
        TWO:{
            display:"2",
            click:"2",
            color:"black",
            bg:"lightgray"
        },
        THREE:{
            display:"3",
            click:"3",
            color:"black",
            bg:"lightgray"
        },
        PLUS:{
            display:"+",
            click:"PLUS",
            color:"darlred",
            bg:"honeydew"
        },
        CHANGE:{
            display:"+/-",
            click:"CHANGE",
            color:"darkred",
            bg:"honeydew"
        },
        NULL:{
            display:"0",
            click:"0",
            color:"black",
            bg:"lightgray"
        },
        COMMA:{
            display:",",
            click:"COMMA",
            color:"darkred",
            bg:"honeydew"
        },
        EQUAL:{
            display:"=",
            click:"EQUAL",
            color:"white",
            bg:"rgba(226, 106, 106, 1)"
        }
};

const Controls =props=>{
    const contrl=Object.keys(controls).map(el=>{
        return (<ControlElement 
                    key={controls[el].display}
                    // clicked={controls[el].click}
                    color={controls[el].color}
                    bg={controls[el].bg}>
                    {controls[el].display}
                </ControlElement>);
    });
    console.log(contrl);
    return(
        <div className={classes.Controls}>
            {contrl}
        </div>
    );
};

export default Controls;