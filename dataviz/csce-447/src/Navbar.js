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
                <BottomNavigationAction label="1896"/>
                <BottomNavigationAction label="1900"/>
                <BottomNavigationAction label="1904"/>
                <BottomNavigationAction label="1908"/>
                <BottomNavigationAction label="1912"/>
                <BottomNavigationAction label="1920"/>
                <BottomNavigationAction label="1924"/>
                <BottomNavigationAction label="1928"/>
                <BottomNavigationAction label="1932"/>
                <BottomNavigationAction label="1936"/>
                <BottomNavigationAction label="1948"/>
                <BottomNavigationAction label="1952"/>
                <BottomNavigationAction label="1956"/>
                <BottomNavigationAction label="1960"/>
                <BottomNavigationAction label="1964"/>
                <BottomNavigationAction label="1968"/>
                <BottomNavigationAction label="1972"/>
                <BottomNavigationAction label="1976"/>
                <BottomNavigationAction label="1980"/>
                <BottomNavigationAction label="1984"/>
                <BottomNavigationAction label="1988"/>
                <BottomNavigationAction label="1992"/>
                <BottomNavigationAction label="1996"/>
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