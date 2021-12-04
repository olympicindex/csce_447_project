import React from "react";
import Icon from '@mui/material/Icon';

import "./Ologo.css";

function Ologo(){
    return(
        <div>
            <Icon className = "Icons">
                <img className="Icons__icon" src={process.env.PUBLIC_URL + '/SVG_Images/_2.png'}/>
            </Icon>
        </div>
    )
}


export default Ologo;