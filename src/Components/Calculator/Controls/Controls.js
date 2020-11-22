import React from 'react';
import classes from './Controls.module.css';
import ControlElement from './ControlElement/ControlElement';

const controls={
        CLEAR:{
            display:"C",
            val:"&!CANCEL",
            color:"darkred",
            bg:"honeydew"
        },
        Back:{
            display:"back",
            val:"&!BACK",
            color:"darkred",
            bg:"honeydew"
        },
        MaradekosOsztas:{
            display:"%",
            val:"&&DIVIDE_SPEC",
            color:"darkred",
            bg:"honeydew"
        },
        MS:{
            display:"/",
            val:"&&DIVIDE",
            color:"darkred",
            bg:"honeydew"
        },
        SEVEN:{
            display:"7",
            val:"#7",
            color:"black",
            bg:"lightgray"
        },
        EIGHT:{
            display:"8",
            val:"#8",
            color:"black",
            bg:"lightgray"
        },
        NINE:{
            display:"9",
            val:"#9",
            color:"black",
            bg:"lightgray"
        },
        X:{
            display:"X",
            val:"&&X",
            color:"darkred",
            bg:"honeydew"
        },
        FOUR:{
            display:"4",
            val:"#4",
            color:"black",
            bg:"lightgray"
        },
        FIVE:{
            display:"5",
            val:"#5",
            color:"black",
            bg:"lightgray"
        },
        SIX:{
            display:"6",
            val:"#6",
            color:"black",
            bg:"lightgray"
        },
        NEG:{
            display:"-",
            val:"&&NEG",
            color:"darkred",
            bg:"honeydew"
        },
        ONE:{
            display:"1",
            val:"#1",
            color:"black",
            bg:"lightgray"
        },
        TWO:{
            display:"2",
            val:"#2",
            color:"black",
            bg:"lightgray"
        },
        THREE:{
            display:"3",
            val:"#3",
            color:"black",
            bg:"lightgray"
        },
        PLUS:{
            display:"+",
            val:"&&PLUS",
            color:"darlred",
            bg:"honeydew"
        },
        CHANGE:{
            display:"+/-",
            val:"&&CHANGE",
            color:"darkred",
            bg:"honeydew"
        },
        NULL:{
            display:"0",
            val:"#0",
            color:"black",
            bg:"lightgray"
        },
        COMMA:{
            display:",",
            val:",COMMA",
            color:"darkred",
            bg:"honeydew"
        },
        EQUAL:{
            display:"=",
            val:"&=EQUAL",
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
                    bg={controls[el].bg}
                    val={controls[el].val}
                    clicked={()=>props.clicked(controls[el].val)}>
                    {controls[el].display}
                </ControlElement>);
    });
    return(
        <div className={classes.Controls}>
            {contrl}
        </div>
    );
};

export default Controls;