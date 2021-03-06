import React from 'react';
import classes from './Controls.module.css';
import ControlElement from './ControlElement/ControlElement';

const controls={
        CLEAR:{
            display:"C",
            val:"CANCEL",
            color:"darkred",
            bg:"honeydew",
            category:["OPERATIONS","BACK"]
        },
        Back:{
            display:"back",
            val:"BACK",
            color:"darkred",
            bg:"honeydew",
            category:["OPERATIONS","BACK"]
        },
        MaradekosOsztas:{
            display:"%",
            val:"DIVIDE_SPEC",
            color:"darkred",
            bg:"honeydew",
            category:["OPERATIONS","TYPIC_OPERATIONS"]
        },
        MS:{
            display:"/",
            val:"DIVIDE",
            color:"darkred",
            bg:"honeydew",
            category:["OPERATIONS","TYPIC_OPERATIONS"]
        },
        SEVEN:{
            display:"7",
            val:"7",
            color:"black",
            bg:"lightgray",
            category:["NUMBER"]
        },
        EIGHT:{
            display:"8",
            val:"8",
            color:"black",
            bg:"lightgray",
            category:["NUMBER"]
        },
        NINE:{
            display:"9",
            val:"9",
            color:"black",
            bg:"lightgray",
            category:["NUMBER"]
        },
        X:{
            display:"X",
            val:"X",
            color:"darkred",
            bg:"honeydew",
            category:["OPERATIONS","TYPIC_OPERATIONS"]
        },
        FOUR:{
            display:"4",
            val:"4",
            color:"black",
            bg:"lightgray",
            category:["NUMBER"]
        },
        FIVE:{
            display:"5",
            val:"5",
            color:"black",
            bg:"lightgray",
            category:["NUMBER"]
        },
        SIX:{
            display:"6",
            val:"6",
            color:"black",
            bg:"lightgray",
            category:["NUMBER"]
        },
        NEG:{
            display:"-",
            val:"NEG",
            color:"darkred",
            bg:"honeydew",
            category:["OPERATIONS","TYPIC_OPERATIONS"]
        },
        ONE:{
            display:"1",
            val:"1",
            color:"black",
            bg:"lightgray",
            category:["NUMBER"]
        },
        TWO:{
            display:"2",
            val:"2",
            color:"black",
            bg:"lightgray",
            category:["NUMBER"]
        },
        THREE:{
            display:"3",
            val:"3",
            color:"black",
            bg:"lightgray",
            category:["NUMBER"]
        },
        PLUS:{
            display:"+",
            val:"PLUS",
            color:"darkred",
            bg:"honeydew",
            category:["OPERATIONS","TYPIC_OPERATIONS"]
        },
        CHANGE:{
            display:"+/-",
            val:"CHANGE",
            color:"darkred",
            bg:"honeydew",
            category:["OPERATIONS","TYPIC_OPERATIONS"]
        },
        NULL:{
            display:"0",
            val:"0",
            color:"black",
            bg:"lightgray",
            category:["NUMBER"]
        },
        COMMA:{
            display:",",
            val:"COMMA",
            color:"darkred",
            bg:"honeydew",
            category:["OPERATIONS","COMMA"]
        },
        EQUAL:{
            display:"=",
            val:"EQUAL",
            color:"white",
            bg:"rgba(226, 106, 106, 1)",
            category:["OPERATIONS","EQUAL"]
        }
};

const Controls = props => {

    const contrl=Object.keys(controls).map(el=>{
        return (<ControlElement 
                    key={controls[el].display}
                    color={controls[el].color}
                    bg={controls[el].bg}
                    cat={controls[el].category}
                    val={controls[el].val}
                    clicked={()=>props.clicked(controls[el].category, controls[el].val)}>
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