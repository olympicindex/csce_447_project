// // Step 1
// var data = [
//   {source:"Item 1", x: 100, y: 60, val: 1350, color: "#C9D6DF"},
//   {source:"Item 2", x: 30, y: 80, val: 2500, color: "#F7EECF"},
//   {source:"Item 3", x: 50, y: 40, val: 5700, color: "#E3E1B2"},
//   {source:"Item 4", x: 190, y: 100, val: 30000, color: "#F9CAC8"},
//   {source:"Item 5", x: 80, y: 170, val: 47500, color: "#D1C2E0"}
// ]


// // Step 3
// var svg = d3.select("svg")
//           .attr("width", 500)
//           .attr("height", 500);

// // Step 4
// svg.selectAll("circle")
//   .data(data).enter()
//   .append("circle")
//   .attr("cx", function(d) {return d.x})
//   .attr("cy", function(d) {return d.y})
//   .attr("r", function(d) {
//     return Math.sqrt(d.val)/Math.PI
//   })
//   .attr("fill", function(d) {
//     return d.color;
//   });

// // Step 5
// svg.selectAll("text")
//   .data(data).enter()
//   .append("text")
//   .attr("x", function(d) {return d.x+(Math.sqrt(d.val)/Math.PI)})
//   .attr("y", function(d) {return d.y+4})
//   .text(function(d) {return d.source})
//   .style("font-family", "arial")
//   .style("font-size", "12px")
// var hdi = d3.csv("data/hdi.csv", function(d) {
// return {
//   Entity: d.Entity,
//   // model: d.Model,
//   // length: +d.Length // convert "Length" column to number
// };
// }, function(error, rows) {
// console.log(rows);
// });
var selected_year = 2008;
function display_hdi(d){
  return "Detailed Info:" +
    "\nCountry Name: " + d.Country_Name +
    "\nYear: " + d.Year +
    "\nMedal Count: " + d.Total_Medals +
    "\n HDI Index: " + d.HDI;
}
function sigmoid(radius, w=90, b=40, c=3.5){
  return (1/(1+Math.pow(Math.E, -(radius / w))) * w - b ) * c;
  // return (1+Math.log(radius)) * 10;
}
var continent_color = d3.scaleOrdinal().domain(['Asia', 'Africa', 'South America', 'Europe', 'Oceania', 'North America']).range(d3.schemeCategory10);
var HDI_color = d3.scaleSequential(d3.interpolateCool);

d3.csv("data/sicong_data.csv", function(data){
  var myColor = d3.scaleOrdinal()
  for (var i = 0; i < data.length; i++) {
      // console.log(data[i].longitude);
      // console.log(data[i].latitude);
  }
  data = data.filter(d => d.Year == selected_year);
  // console.log(data.Continent);
  // Step 3
  var svg = d3.select("svg")
              .attr("width", 1920)
              .attr("height", 1080);

  // Step 4
  svg.selectAll("circle")
      .data(data).enter()
      .append("circle")
      .on("click", function(data) {
        alert("on click get data \n" +display_hdi(data));})
        .attr("cx", function(d) {return (d.longitude)*5+1000})
        .attr("cy", function(d) {return (-d.latitude+90)*5})
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
      .attr("fill", function(d) {
      // return ['#C9D6DF', '#F7EECF', '#E3E1B2'][Math.floor(Math.random() * 3)];
      var rgb = HDI_color(d.HDI);
      if (rgb == 'rgb(0, 0, 0)'){
        rgb = 'rgb(200, 200, 200)';
      }
      console.log(d.Country_Name, rgb);
      return rgb;
      // return continent_color(d.Continent);
      });

  svg.selectAll("text")
  .data(data).enter()
  .append("text")
  .attr("x", function(d) {return (d.longitude)*5+1000})
  .attr("y", function(d) {return (-d.latitude+90)*5+4})
  .text(function(d) {return d.Country_Name})
  .style("font-family", "arial")
  .style("font-size", "12px")
});
