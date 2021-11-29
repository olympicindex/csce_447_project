import React from "react";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import "./Navbar.css";

// var obj = new callReactFunction();

const [value,setValue] = React.useState(0);

const handlechange = (event,newValue)=>{
    setValue(newValue)
}
console.log("True")

return(
    
    <Box className="Content">
        <Box className="Content__timeline">
            <Tabs className="timeline__sections"
            value={value}
            onChange = {(event,newValue)=>handlechange(event,newValue)}
            variant="scrollable"
            >
                <Tab label="1896"/>
                <Tab label="1900"/>
                <Tab label="1904"/>
                <Tab label="1908"/>
                <Tab label="1912"/>
                <Tab label="1920"/>
                <Tab label="1924"/>
                <Tab label="1928"/>
                <Tab label="1932"/>
                <Tab label="1936"/>
                <Tab label="1948"/>
                <Tab label="1952"/>
                <Tab label="1956"/>
                <Tab label="1960"/>
                <Tab label="1964"/>
                <Tab label="1968"/>
                <Tab label="1972"/>
                <Tab label="1976"/>
                <Tab label="1980"/>
                <Tab label="1984"/>
                <Tab label="1988"/>
                <Tab label="1992"/>
                <Tab label="1996"/>
                <Tab label="2000"/>
                <Tab label="2004"/>
                <Tab label="2008"/>
                <Tab label="2012"/>
                <Tab label="2016"/>
                <Tab label="2020"/>
            </Tabs>
        </Box>
    </Box>
)