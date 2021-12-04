import React from "react";
import * as d3 from "d3";
import {Navbar,yearval} from "./Navbar.js";

function BubbleChart(){
    

    
    var dimension = [1920, 1680];
    var selected_year = 2008;

    function display_hdi(d)
    {
        return "Detailed Info:" +
            "\nCountry Name: " + d.Country_Name +
            "\nYear: " + d.Year +
            "\nMedal Count: " + d.Total_Medals +
            "\n HDI Index: " + d.HDI;
    }

    function sigmoid(radius, w=90, b=40, c=3.5)
    {
        return (1/(1+Math.pow(Math.E, -(radius / w))) * w - b ) * c;
    }

    var continent_color = d3.scaleOrdinal().domain(['Asia', 'Africa', 'South America', 'Europe', 'Oceania', 'North America']).range(d3.schemeCategory10);
    
    var HDI_color = d3.scaleSequential(d3.interpolateCool);

    d3.csv(process.env.PUBLIC_URL + '/data/new_locations.csv', function(data)
    {
        var myColor = d3.scaleOrdinal()
        
        data = data.filter(d => d.Year === selected_year);
        // console.log(data.Continent);
        // Step 3
        var svg = d3.select("svg").attr("width", dimension[0]).attr("height", dimension[1]);

        // Step 4
        svg.selectAll("circle")
            .data(data).enter()
            .append("circle")
            .on("click", function(data) 
            {
                alert("on click get data \n" +display_hdi(data));}).attr("cx", function(d) {return (d.longitude)}).attr("cy", function(d) {return (d.latitude)}).attr("r", function(data) {
                var radius = data.Total_Medals;
                if (radius === undefined){
                    radius = 0;
                }
                radius = 0.0 + radius;
            
                return sigmoid(radius)
                
            })
            
            .style("fill-opacity", ".75")
            .style("stroke", "#777")
            .attr("fill", function(d) {
                // return ['#C9D6DF', '#F7EECF', '#E3E1B2'][Math.floor(Math.random() * 3)];
                var rgb = HDI_color(d.HDI);
                if (rgb === 'rgb(0, 0, 0)'){
                    rgb = 'rgb(200, 200, 200)';
                }
                
                // console.log(d.Country_Name, (d.longitude)*5+1000, (-d.latitude+90)*5);
                // console.log(d.Country_Name, (d.longitude), (d.latitude));
                console.log(d.Country_Name, (d.longitude), (d.longitude)/360 * dimension[0]+1/2*dimension[0]);
                return rgb;
                // return continent_color(d.Continent);
            
            });

        svg.selectAll("text")
            .data(data).enter()
            .append("text")
            .attr("x", function(d) {return (d.longitude)})
            .attr("y", function(d) {return (d.latitude)})
            // .attr("x", function(d) {return (d.longitude)*5+1000})
            // .attr("y", function(d) {return (-d.latitude+90)*5+4})
            .text(function(d) {return d.Country_Name})
            .style("font-family", "Cambria")
            .style("font-size", "13px")
            .style("font-weight", "900")
            .style("text-anchor", "middle")
    }
    );
    
}

export default BubbleChart