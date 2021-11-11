import React from "react";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import "./Navbar.css";



function Navbar(){
    const [value,setValue] = React.useState(0);
    
    const handlechange = (event,newValue)=>{
        setValue(newValue)
    }

    return(
        <Box className="timeline">
            <Tabs className="timeline__sections"
            value={value}
            onChange = {(event,newValue)=>handlechange(event,newValue)}
            >
                <Tab label="2020" />
                <Tab label="2020" />
                <Tab label="2020" />
                <Tab label="2020" />
            </Tabs>
        </Box>
    )
}

export default Navbar;