var dimension = [1920, 600];
var selected_year = 2008;
var selected_country = 'United States';

function sigmoid(radius, w=90, b=40, c=4){
  return (1/(1+Math.pow(Math.E, -(radius / w))) * w - b ) * c/2;
  // return (1+Math.log(radius)) * 10;
}
var continent_color = d3.scaleOrdinal().domain(['Asia', 'Africa', 'South America', 'Europe', 'Oceania', 'North America']).range(d3.schemeCategory10);
var HDI_color = d3.scaleSequential(d3.interpolateCool);

draw1 = draw(2008)

function draw(selected_year){
  


  console.log(selected_year)
  d3.csv("data/new_locations_continents.csv", function(data){
    function display_hdi(d = d => d.Country_Name == 'United States'){
      console.log(d)
      document.getElementById("demo").innerHTML = "Detailed Info:<br>" +
      "\nCountry Name: " + d.Country_Name +
      "<br>\nYear: " + d.Year +
      "<br>\nMedal Count: " + d.Total_Medals +
      "<br>\n HDI Index: " + d.HDI;
    
      return "Detailed Info:" +
        "\nCountry Name: " + d.Country_Name +
        "\nYear: " + d.Year +
        "\nMedal Count: " + d.Total_Medals +
        "\n HDI Index: " + d.HDI;
    }

    var dataTime = d3.range(1896, 2021, 4).map(function(d) {
      return new Date(d, 10, 3);
    });

    var sliderTime = d3
      .sliderBottom()
      .min(d3.min(dataTime))
      .max(d3.max(dataTime))
      .step(4*1000 * 60 * 60 * 24 * 365)
      .width(300)
      .tickFormat(d3.timeFormat('%Y'))
      .tickValues(dataTime)
      .default(new Date(2008, 10, 3))
      .on('onchange', val => {
        d3.select('p#value-time').text(d3.timeFormat('%Y')(val));
        svg.selectAll("*").remove();
        svg2.selectAll("*").remove();
        draw2(d3.timeFormat('%Y')(sliderTime.value()))
      });

    var gTime = d3
      .select('div#slider-time')
      .append('svg')
      .attr('width', 500)
      .attr('height', 100)
      .append('g')
      .attr('transform', 'translate(30,30)');

    gTime.call(sliderTime);

    d3.select('p#value-time').text(d3.timeFormat('%Y')(sliderTime.value()));
    
    var svg = d3.select("svg")
                .attr("width", dimension[0])
                .attr("height", dimension[1])
    var svg2 = d3.select("#svg2");
    draw2()
    function draw2(selected_year = 2008){
      var myColor = d3.scaleOrdinal()
    for (var i = 0; i < data.length; i++) {
        // console.log(data[i].longitude);
        // console.log(data[i].latitude);
    }
    data1 = data.filter(d => d.Year == selected_year);
    // data = data.filter(d => d.Continent == "Asia")
    // console.log(data.Continent);
    // Step 3
    
                
    svg.append("line")          // attach a line
    .style("stroke", "black")  // colour the line
    .attr("x1", 450/2)     // x position of the first end of the line
    .attr("y1", 0)      // y position of the first end of the line
    .attr("x2", 450/2)     // x position of the second end of the line
    .attr("y2", 500);    // y position of the second end of the line
  
    svg.append("line")          // attach a line
    .style("stroke", "black")  // colour the line
    .attr("x1", 0)     // x position of the first end of the line
    .attr("y1", 310)      // y position of the first end of the line
    .attr("x2", 225)     // x position of the second end of the line
    .attr("y2", 310);    // y position of the second end of the line
  
    svg.append("line")          // attach a line
    .style("stroke", "black")  // colour the line
    .attr("x1", 225)     // x position of the first end of the line
    .attr("y1", 375)      // y position of the first end of the line
    .attr("x2", 1000)     // x position of the second end of the line
    .attr("y2", 375);    // y position of the second end of the line
  
    svg.append("line")          // attach a line
    .style("stroke", "black")  // colour the line
    .attr("x1", 650)     // x position of the first end of the line
    .attr("y1", 0)      // y position of the first end of the line
    .attr("x2", 650)     // x position of the second end of the line
    .attr("y2", 375);    // y position of the second end of the line
  
    svg.append("line")          // attach a line
    .style("stroke", "black")  // colour the line
    .attr("x1", 750)     // x position of the first end of the line
    .attr("y1", 375)      // y position of the first end of the line
    .attr("x2", 750)     // x position of the second end of the line
    .attr("y2", 500);    // y position of the second end of the line
    // Step 4
    default_data = data1.filter(d => d.Country_Name == selected_country)
    console.log(default_data)
    display_hdi(default_data[0])
    svg.selectAll("circle")
        .data(data1).enter()
        .append("circle")
        .attr("class", function(d) { return "bubbles " + parseFloat(d.HDI).toFixed(1) })
        .on("click", function(data1) {
          selected_country = data1.Country_Name
          data2 = data.filter(d => d.Country_Name == selected_country);
          console.log(data2)
          svg.selectAll("*").remove();
          svg2.selectAll("*").remove();
          draw2(d3.timeFormat('%Y')(sliderTime.value()))
          ;})
          .attr("cx", function(d) {return (d.latitude/2)})
          .attr("cy", function(d) {return (d.longitude/2)})
  
          .attr("r", function(data1) {
            var radius = data1.Total_Medals;
            if (radius === undefined){
              radius = 0;
            }
            radius = 0.0 + radius;
             // console.log(data.Country_Name, sigmoid(radius));
             // console.log(Math.sqrt([2500, 4000, 8000][Math.floor(Math.random() * 3)])/Math.PI);
             return sigmoid(radius)
             // return Math.sqrt([2500, 4000, 8000][Math.floor(Math.random() * 3)])/Math.PI
          })
        // .attr("r", function(d) {
        //     return data.filter(function(d){ return d.Year == "2008"}).
        //     })
        .style("fill-opacity", ".75")
        .style("stroke", "#777")
        .attr("fill", function(d) {
        // return ['#C9D6DF', '#F7EECF', '#E3E1B2'][Math.floor(Math.random() * 3)];
        var rgb = HDI_color(d.HDI);
        if (rgb == 'rgb(0, 0, 0)'){
          rgb = 'rgb(200, 200, 200)';
        }
        
        // console.log(d.Country_Name, (d.longitude)*5+1000, (-d.latitude+90)*5);
        console.log(parseFloat(d.HDI).toFixed(1));
        console.log(d.Country_Name, (d.longitude), (d.longitude)/360 * dimension[0]+1/2*dimension[0]);
        return rgb;
        // return continent_color(d.Continent);
        
        });
  
    svg.selectAll("text")
    .data(data1).enter()
    .append("text")
    .attr("x", function(d) {return (d.latitude/2)})
    .attr("y", function(d) {return (d.longitude/2)})
    // .attr("x", function(d) {return (d.longitude)*5+1000})
    // .attr("y", function(d) {return (-d.latitude+90)*5+4})
    .text(function(d) {return d.Country_Name})
    // .text(function(d) {return d.HDI})
    .style("font-family", "Cambria")
    .style("font-size", "8px")
    .style("font-weight", "900")
    .style("text-anchor", "middle")
    //.style("stroke", "#fff")
  
  
    var highlight = function(d){
      // reduce opacity of all groups
      d3.selectAll(".bubbles").style("opacity", 0.95)
      // expect the one that is hovered
      // console.log(d)
      // d3.selectAll(".Asia").style("opacity", 1)
    }
  
    // And when it is not hovered anymore
    var noHighlight = function(d){
      d3.selectAll(".bubbles").style("opacity", 1)
    }
  
    var size = 20
      var allgroups = ["0.8", "0.7", "0.6", "0.5", "0.4", "0.3"]
      svg.selectAll("myrect")
        .data(allgroups)
        .enter()
        .append("circle")
          .attr("cx", 1000)
          .attr("cy", function(d,i){ return 25 + i*(size+5)}) // 100 is where the first dot appears. 25 is the distance between dots
          .attr("r", 7)
          .style("fill", function(d){ return HDI_color(d)})
          .on("mouseover", highlight)
          .on("mouseleave", noHighlight)
  
  
    svg.append("text")
    .attr('x', 1010)
    .attr("y", 13)
    .text("HDI Index")
    .attr("text-anchor", "middle")
    
    svg.selectAll("mylabels")
    .data(allgroups)
    .enter()
    .append("text")
      .attr("x", 1000 + size*.8)
      .attr("y", function(d,i){ return i * (size + 5) + 25}) // 100 is where the first dot appears. 25 is the distance between dots
      .style("fill", function(d){ return myColor(d)})
      .text(function(d){ return d})
      .attr("text-anchor", "left")
      .style("alignment-baseline", "middle")
      .on("mouseover", highlight)
      .on("mouseleave", noHighlight)
  
    
  
    data2 = data.filter(d => d.Country_Name == selected_country);
    console.log(data2)
    
    // svg2.append("text")
    //      .attr('x', 100)
    //      .attr("y", 13)
    //      .text(data2[0].Country_Name)
    //      .attr("text-anchor", "middle")
  
    var x = d3.scaleLinear()
      .domain( [1890, 2021])
      .range([ 0, 400]);
    svg2.append("g")
      .attr("transform", "translate(0," + 300 + ")")
      .call(d3.axisBottom(x));
    // Add Y axis
    var y = d3.scaleLinear()
      .domain( [0, 300])
      .range([ 300, 0 ]);
  
    var y1 = d3.scaleLinear()
      .domain( [0, 1])
      .range([ 300, 0 ]);
    svg2.append("g")
      .style("fill", "red")
      .call(d3.axisRight(y));
      
    svg2.append("g")
      .call(d3.axisLeft(y1))
      .style("fill", "green")
      .attr("transform", "translate(400," + 0 + ")");
    // Add the line
    svg2.append("path")
      .datum(data2)
      .attr("fill", "none")
      .attr("stroke", "black")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x(function(d) { return x(d.Year) })
        .y(function(d) { return y(d.Total_Medals) })
        )
    // Add the points
    svg2
      .append("g")
      .selectAll("dot")
      .data(data2)
      .enter()
      .append("circle")
        .attr("cx", function(d) { return x(d.Year) } )
        .attr("cy", function(d) { return y(d.Total_Medals) } )
        .attr("r", 5)
        .attr("fill", "red")
  
  
    svg2.append("path")
    .datum(data2)
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("stroke-width", 1.5)
    .attr("d", d3.line()
      .x(function(d) { return x(d.Year) })
      .y(function(d) { return y1(d.HDI) })
      )
    svg2
    .append("g")
    .selectAll("dot")
    .data(data2)
    .enter()
    .append("circle")
      .attr("cx", function(d) { return x(d.Year) } )
      .attr("cy", function(d) { return y1(d.HDI) } )
      .attr("r", 5)
      .attr("fill", "green")
  
    var HDIME = ["HDI", "Total_Medals"]
    svg2.selectAll("myrect")
      .data(HDIME)
      .enter()
      .append("circle")
        .attr("cx", 300)
        .attr("cy", function(d,i){ return 25 + i*(size+5)}) // 100 is where the first dot appears. 25 is the distance between dots
        .attr("r", 7)
        .style("fill", function(d, i){ return ["green", "red"][i]})
        .on("mouseover", highlight)
        .on("mouseleave", noHighlight)
    svg2.selectAll("mylabels")
    .data(HDIME)
    .enter()
    .append("text")
      .attr("x", 300 + size*.8)
      .attr("y", function(d,i){ return i * (size + 5) + 25}) // 100 is where the first dot appears. 25 is the distance between dots
      .style("fill", function(d, i){ return ["freen", "red"][i]})
      .text(function(d){ return d})
      .attr("text-anchor", "left")
      .style("alignment-baseline", "middle")
      .on("mouseover", highlight)
      .on("mouseleave", noHighlight)
    }

    
  });
  
}
