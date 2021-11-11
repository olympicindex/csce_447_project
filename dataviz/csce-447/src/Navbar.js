import React from "react";
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import "./Navbar.css";



function Navbar(){
    const [value,setValue] = React.useState(0);
    
    const handlechange = (event,newValue)=>{
        setValue(newValue)
    }
    return(
        <div className="timeline">
            <BottomNavigation 
            className = "timeline__sections" 
            showLabels
            value={value}
            onChange = {(event,newValue)=>handlechange(event,newValue)}
            >
                <BottomNavigationAction label="2000"/>
                <BottomNavigationAction label="2004"/>
                <BottomNavigationAction label="2008"/>
                <BottomNavigationAction label="2012"/>
                <BottomNavigationAction label="2016"/>
                <BottomNavigationAction label="2020"/>
            </BottomNavigation>
        </div>
    )
}

export default Navbar;