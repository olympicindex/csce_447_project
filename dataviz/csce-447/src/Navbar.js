import React from "react";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import "./Navbar.css";


var yearval;

const listofyears = new Map();
listofyears.set(0,"1896")
listofyears.set(1,"1900")
listofyears.set(2,"1904")
listofyears.set(3,"1908")
listofyears.set(4,"1912")
listofyears.set(5,"1920")
listofyears.set(6,"1924")
listofyears.set(7,"1928")
listofyears.set(8,"1932")
listofyears.set(9,"1936")
listofyears.set(10,"1948")
listofyears.set(11,"1952")
listofyears.set(12,"1956")
listofyears.set(13,"1960")
listofyears.set(14,"1964")
listofyears.set(15,"1968")
listofyears.set(16,"1972")
listofyears.set(17,"1976")
listofyears.set(18,"1980")
listofyears.set(19,"1984")
listofyears.set(20,"1988")
listofyears.set(21,"1992")
listofyears.set(22,"1996")
listofyears.set(23,"2000")
listofyears.set(24,"2004")
listofyears.set(25,"2008")
listofyears.set(26,"2012")
listofyears.set(27,"2016")
listofyears.set(28,"2020")



function Navbar(){
    const [value,setValue] = React.useState(0);
    
    const handlechange = (event,newValue)=>{
        setValue(newValue)
        yearval = parseInt( listofyears.get(newValue));
        console.log('yearval',yearval);
    }
    


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
}


export  {Navbar, yearval};