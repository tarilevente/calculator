import React from 'react';
import {dateFormat} from '../../../../shared/utility';
import classes from './DataPage.module.css';
import {withRouter} from 'react-router-dom';

const DataPage=props=>{
    const [d,i]=dateFormat(props.res);
    const data=props.match.params.dataName==='time'?i:d;
    return(
        <div className={classes.DataPage}>
            <h3>Data Page</h3>
            <h4>{data}</h4>
        </div>
    );
};

export default withRouter(DataPage);