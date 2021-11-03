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
function display_hdi(d, m, h){
  return "Detailed Info:" +
    "\nCountry Name: " + h.Entity +
    "\nYear: " + h.Year +
    "\nMedal Count: " + m.Total_Medals +
    "\n HDI Index: " + h.hdi;
}
function sigmoid(radius, w=100, b=35, c=2){
  return (1/(1+Math.pow(Math.E, -(radius / w))) * w - b ) * c;
}

d3.csv("data/countries.csv", function(data) {
    d3.csv("data/CleanedData.csv", function(medals){
        d3.csv("data/hdi.csv", function(hdi) {
        for (var i = 0; i < data.length; i++) {
            // console.log(data[i].longitude);
            // console.log(data[i].latitude);
        }
        // Step 3
        var svg = d3.select("svg")
                    .attr("width", 1920)
                    .attr("height", 1080);

        // Step 4
        svg.selectAll("circle")
            .data(data).enter()
            .append("circle")
            .on("click", function(data) {
              var h_val = "";
              var m_val = "";
              for (var i = 0; i < hdi.length; i++) {
                if (hdi[i].Entity == data.COUNTRYAFF && hdi[i].Year==2000){
                  console.log(hdi[i]);
                  h_val = hdi[i];
                }
              }
              for (var i = 0; i < medals.length; i++) {
                if (medals[i].Country_Name == data.COUNTRYAFF && medals[i].Year==2000){
                  console.log(medals[i]);
                  m_val = medals[i];
                }
              }
              // console.log(data);
              alert("on click get data \n" +display_hdi(data, m_val, h_val));})
              .attr("cx", function(d) {return (d.longitude)*5+1000})
              .attr("cy", function(d) {return (-d.latitude+90)*5})

              .attr("r", function(data) {
                var h_val = "";
                var m_val = "";
                for (var i = 0; i < hdi.length; i++) {
                  if (hdi[i].Entity == data.COUNTRYAFF && hdi[i].Year==2000){
                    // console.log(hdi[i]);
                    h_val = hdi[i];
                  }
                }
                for (var i = 0; i < medals.length; i++) {
                  if (medals[i].Country_Name == data.COUNTRYAFF && medals[i].Year==2000){
                    // console.log(medals[i]);
                    m_val = medals[i];
                  }
                }
                var radius = m_val.Total_Medals;
                if (radius === undefined){
                  radius = 0;
                }
                radius = 0.0 + radius;
                 console.log(data.COUNTRYAFF, sigmoid(radius));
                 console.log(Math.sqrt([2500, 4000, 8000][Math.floor(Math.random() * 3)])/Math.PI);
                 return sigmoid(radius)
                 // return Math.sqrt([2500, 4000, 8000][Math.floor(Math.random() * 3)])/Math.PI
              })
            // .attr("r", function(d) {
            //     return data.filter(function(d){ return d.Year == "2008"}).
            //     })
            .attr("fill", function(d) {
            return ['#C9D6DF', '#F7EECF', '#E3E1B2'][Math.floor(Math.random() * 3)];
            });

        svg.selectAll("text")
        .data(data).enter()
        .append("text")
        .attr("x", function(d) {return (d.longitude)*5+1000})
        .attr("y", function(d) {return (-d.latitude+90)*5+4})
        .text(function(d) {return d.ISO})
        .style("font-family", "arial")
        .style("font-size", "12px")
      });
    });
});
