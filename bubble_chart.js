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

d3.csv("data/countries.csv", function(data) {
    d3.csv("data/CleanedData.csv", function(medals){
        for (var i = 0; i < data.length; i++) {
            console.log(data[i].longitude);
            console.log(data[i].latitude);
        }
        // Step 3
        var svg = d3.select("svg")
                    .attr("width", 3000)
                    .attr("height", 800);
    
        // Step 4
        svg.selectAll("circle")
            .data(data).enter()
            .append("circle")
            .on("click", function(d) {
        alert("on click get data" + d.id);})
            .attr("cx", function(d) {return (d.longitude)*5+1000})
            .attr("cy", function(d) {return (-d.latitude+90)*5})
            .attr("r", function(d) {
            return Math.sqrt([2500, 4000, 8000][Math.floor(Math.random() * 3)])/Math.PI 
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




// ----------------------------------------------


// Editable
var numItems = 30,
    tlW = window.innerWidth*.95,
    padding = 2,
    itemH = 90,
    openW = 400,
    openH = window.innerHeight*.9;
    
// Don't change these!
var initW = Math.floor( (tlW-padding*(numItems-1))/numItems ),
    smallW,
    old = "",
    current = "";

function init() { 

  // Create timeline items
  for (var i=0; i<numItems; i++) {
    var _i;
    if (i==0) _i = document.getElementById('i0');
    else {
      _i = document.getElementById('i0').cloneNode(true);
      _i.id = "i" + i;
      document.getElementById('timeline').appendChild(_i);
    }
    TweenMax.set(_i, {
      autoAlpha:0,
      transformOrigin:'0% 100%',
      scaleY:.2,
      width:initW,
      height:itemH,      
      x:initW*i + padding*i
    });
    TweenMax.to(_i, 1, {
      delay:i/250,
      autoAlpha:.36,
      scaleY:1,
      ease:Power4.easeOut
    });
    TweenMax.to(_i, 1.5, {
      delay:i/250,
      scaleY:1,
      ease:Elastic.easeOut.config(1.5)    
    });
    addListeners(_i);
  }
  
  document.addEventListener("keydown", keyDown);
  window.addEventListener("resize", resize);
  resize();
}

function addListeners(_i){
  _i.addEventListener("mouseover", over);
  _i.addEventListener("mouseout", out);
  _i.addEventListener("click", click);
}

function removeListeners(_i){
  _i.removeEventListener("mouseover", over);
  _i.removeEventListener("mouseout", out);
  _i.removeEventListener("click", click);
}

function over(e){
  document.getElementById('timeline').appendChild(e.currentTarget);
  TweenMax.to(e.currentTarget, .3, {alpha:1, scaleY:1.15, ease:Back.easeOut.config(6)});
}

function out(e){
  TweenMax.to(e.currentTarget, .25, {alpha:.36});
  TweenMax.to(e.currentTarget, .5, {scaleY:1, ease:Elastic.easeOut.config(.75)});
}

function keyDown(e){
  var _n = 1;
  if (e.keyCode==37) { // Left arrow
    if (current!="") {
      _n = current.id.substr(1);
      if (_n==0) _n = numItems;
    }
    _n -= 1;
  }
  else if (e.keyCode==39) { // Right arrow
    if (current=="") _n = numItems-2; 
    else {
      _n = Number(current.id.substr(1));
      if (_n==numItems-1) _n = -1;
    }
    _n += 1; 
  }
  
  document.getElementById('i'+_n).dispatchEvent(new MouseEvent('mouseover'));      
  document.getElementById('i'+_n).dispatchEvent(new MouseEvent('click'));
}

function click(e){
  if (current!="") {
    old = current;
    TweenMax.to(old, .5, {
      y:0,
      width:smallW,
      height:itemH,
      alpha:.36,
      ease:Power3.easeInOut,
      onComplete:addListeners,
      onCompleteParams:[old]
    });
  }
  current = e.currentTarget;
  removeListeners(current);
  TweenMax.to(current, .5, {
    scaleY:1,
    width:openW,
    height:openH,
    y:-Math.abs(itemH-openH),
    ease:Power3.easeInOut,
    onUpdate:update
  });
}

function update(){
  
  smallW = ( (tlW-parseInt(current.style.width, 10))-(padding*(numItems)) ) / (numItems-1);
  var _i, _pad=0, _prevW=0, _prevX=0;
  
  for (var i=0; i<numItems; i++) {
    
    _i = document.getElementById('i'+i);
    
    if (i>0) {
      _prevW = parseInt(document.getElementById('i'+(i-1)).style.width, 10);
      _prevX = parseInt(document.getElementById('i'+(i-1))._gsTransform.x, 10);
      _pad = padding;
    }
    
    // First expansion
    if (old=="") { 
      if ( i!=current.id.substr(1) ) TweenMax.set(_i, { width:smallW });
    }
    // Subsequent expansions
    else { 
      smallW = ( (tlW-parseInt(current.style.width, 10)-parseInt(old.style.width, 10))-(padding*(numItems)) ) / (numItems-2);
      if ( i!=current.id.substr(1) && i!=old.id.substr(1) ) TweenMax.set(_i, { width:smallW })
    }
    
    TweenMax.set(_i, { x:_prevW+_prevX+_pad })

  }
}

function resize(e){
   TweenMax.set('#timeline', {width:tlW, left:padding/2 + window.innerWidth/2 - tlW/2})
}

init();