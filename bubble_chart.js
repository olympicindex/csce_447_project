var dimension = [1920, 1680];
var selected_year = 2008;
function display_hdi(d){
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
function sigmoid(radius, w=90, b=40, c=4){
  return (1/(1+Math.pow(Math.E, -(radius / w))) * w - b ) * c/2;
  // return (1+Math.log(radius)) * 10;
}
var continent_color = d3.scaleOrdinal().domain(['Asia', 'Africa', 'South America', 'Europe', 'Oceania', 'North America']).range(d3.schemeCategory10);
var HDI_color = d3.scaleSequential(d3.interpolateCool);

d3.csv("data/new_locations_continents.csv", function(data){
  var myColor = d3.scaleOrdinal()
  for (var i = 0; i < data.length; i++) {
      // console.log(data[i].longitude);
      // console.log(data[i].latitude);
  }
  data = data.filter(d => d.Year == selected_year);
  // data = data.filter(d => d.Continent == "Asia")
  // console.log(data.Continent);
  // Step 3
  var svg = d3.select("svg")
              .attr("width", dimension[0])
              .attr("height", dimension[1])
              
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
  svg.selectAll("circle")
      .data(data).enter()
      .append("circle")
      .attr("class", function(d) { return "bubbles " + parseFloat(d.HDI).toFixed(1) })
      .on("click", function(data) {

        display_hdi(data);})
        // .attr("cx", function(d) {return (d.longitude)*5+1000})
        // .attr("cy", function(d) {return (-d.latitude+90)*5})
        .attr("cx", function(d) {return (d.latitude/2)})
        .attr("cy", function(d) {return (d.longitude/2)})

        .attr("r", function(data) {
          var radius = data.Total_Medals;
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
  .data(data).enter()
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
});
