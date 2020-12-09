export const updateObject=(oldObject, updatedProperties)=>{
    return{
        ...oldObject, 
        ...updatedProperties
    };
};

export const checkValidity = ( value, rules ) => {
    let isValid = true;
    if ( !rules ) {
        return true;
    }

    if ( rules.required ) {
        isValid = value.trim() !== '' && isValid;
    }

    if ( rules.minLength ) {
        isValid = value.length >= rules.minLength && isValid
    }

    if ( rules.maxLength ) {
        isValid = value.length <= rules.maxLength && isValid
    }

    if ( rules.isEmail ) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = pattern.test( value ) && isValid
    }

    if ( rules.isNumeric ) {
        const pattern = /^\d+$/;
        isValid = pattern.test( value ) && isValid
    }

    return isValid;
};

export const charReplace=( str , charRemove, newChar )=>{
    return str.toString().replace(charRemove,newChar);
};

export const dateFormat=(datum)=>{
    const date=new Date(datum);
    let month=(+date.getMonth()+1).toString();
    if(month.length<2){month='0'+month;}
    let day=date.getDate().toString();
    if(day.length<2){day='0'+day;}
    const d=date.getFullYear()+'.'+month+'.'+day+'.';
    let min=date.getMinutes().toString();
    let sec=date.getSeconds().toString();
    if(min.length<2){min='0'+min;}
    if(sec.length<2){sec='0'+sec;}
    const i=date.getHours()+':'+min+':'+sec;

    return [d,i];
};

export const isNumber=(arr)=>{ return arr[0] === "NUMBER"; };
export const isOp=(arr)=>{ return arr[0] === "OPERATIONS" };
export const isBackCat=(arr)=>{ return arr[1] === "BACK" };
export const isBackOp=(val)=>{ return val === "BACK"};
export const isCancelOp=(val)=>{ return val === "CANCEL"};
export const isComma=(arr)=>{ return arr[1] === "COMMA" };
export const isEqual=(arr)=>{ return arr[1] === "EQUAL" };
export const isTypicOp=(arr)=>{ return arr[1] === "TYPIC_OPERATIONS" };

export const switchOp=(val)=>{
    switch (val) {
        case 'DIVIDE_SPEC': return{method:"onSetOperation", op:'DIVIDE_SPEC', opSign:'%'}; 
        case 'DIVIDE':  return{method:"onSetOperation", op:'DIVIDE', opSign:'/'}; 
        case 'X':       return{method:"onSetOperation", op:'X', opSign:'*'}; 
        case 'NEG':     return{method:"onSetOperation", op:'NEG', opSign:'-'}; 
        case 'PLUS':    return{method:"onSetOperation", op:'PLUS', opSign:'+'}; 
        case 'CHANGE':  return {method:"CHANGE", operation:null, opSign:null};
        default: 
            throw new Error('Hiba a Calculator.js : typicOperation-nál');
    }
}


export const isValidNumber=(num)=>{
    return typeof +num == 'number' && isFinite(num);
};
