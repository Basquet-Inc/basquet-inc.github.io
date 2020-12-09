//Data
var toCSV = [
  { name: 'USD', value: 65 },
  { name: 'EURO', value: 45 },
  { name: 'GBP', value: 15 },
  { name: 'YEN', value: 15 },
  { name: 'WON', value: 9 },
  { name: 'AUD', value: 4 },
  { name: 'CAD', value: 4 },
  { name: 'NZD', value: 4 },
  { name: 'Other', value: 4 }
];

var margin = {top: 30,right: 20,bottom: 20,left: 20},
         width = 300,
         height = 220;
         var radius = Math.min(width, height) / 4;
         var donutWidth = 75;
         var color = d3.scaleOrdinal()
             .domain([1, 2, 3, 4, 5, 6, 7, 8, 9])
             .range(["#29066b", "#7d3ac1", "#af4bce" , "#db4cb2", "#eb548c", "#ea7369", "#f0a58f", "#fceae6", "#fcf8e7"]);
         var count = 0;
         var svg = d3.select("#chart").append("svg")
                      .attr("viewBox", '0 0 300 220')
                      .append('g')
                      .attr('transform', 'translate(' + (width / 2.5 + 10) +
                      ',' + (height / 2.2 + 10) + ')');

      var arc = d3.arc()
                  .innerRadius(0)
                  .outerRadius(100);

      var arcOver = d3.arc()
                    .innerRadius(0)
                    .outerRadius(100 + 5);

       var pie = d3.pie()
                 .sort(null)
                 .value(function (d) {
                 return d.value;
                 });
       var pcnt =  d3.sum(toCSV, function(d) {
                       return d.value;
                         });

//Hover effects
            var getAngle = function (d) {
                  return (180 / Math.PI * (d.startAngle + d.endAngle) / 2 - 90);
              };
            var g = svg.selectAll(".arc")
                       .data(pie(toCSV))
                       .enter().append("g")
                       .attr('class',"arc")
                       .on("mouseover", function() {
                            d3.select(this).select("path").transition().attr("d",arcOver).duration(200);
                            tooltip.style("display", null);

                            })
                       .on("mousemove", function(d) {
                          tooltip.transition().duration(200)
                         .style("opacity", 0.9);
                          tooltip.select("div").html( d.data.name)
                         .style("position", "fixed")
                         .style("text-align", "center")
                         .style("width", "80px")
                         .style("height", "30px")
                         .style("padding", "7px")
                         .style("font", "12px sans-serif")
                         .style("background", "lightsteelblue")
                         .style("border", "0px")
                         .style("border-radius", "8px")
                         .style("left", (d3.event.pageX + 15) + "px")
                         .style("top", (d3.event.pageY - 28) + "px");
                      })
                       .on("mouseout", function() {
                             tooltip.style("display", "none");
                             d3.select(this).select("path").transition()
                               .attr("d",arc)
                               .duration(500);
                            });
//Tooltip
             var tooltip = d3.select("body").append("div")
               .attr("class", "tooltip")
               .style("opacity", 0.5);

             tooltip.append("rect")
               .attr("width", 30)
               .attr("height", 20)
               .attr("fill", "#ffffff")
               .style("opacity", 0.5);

             tooltip.append("div")
               .attr("x", 15)
               .attr("dy", "1.2em")
               .style("text-anchor", "middle")
               .attr("font-size", "1.5em")
               .attr("font-weight", "bold");

         g.append("path")
             .attr("d", arc)
             .style("fill", function (d) {
                 return color(d.data.name);
              });

         count = 0;

//Legend
         var legend = svg.selectAll(".legend")
             .data(toCSV).enter()
             .append("g").attr("class", "legend")
             .attr("legend-id", function(d) {
                 return count++;
             })
             .attr("transform", function(d, i) {
                 return "translate(-30," + (-90 + i * 15) + ")";
             });


         legend.append("circle")
             .attr("cx", 160)
             .attr("cy", 10)
             .attr("r", 3)
             .attr("word-wrap","break-word")
             .attr("width", 18).attr("height", 18)
             .style("fill", function(d) {
                 return color(d.name);
             });
         legend.append("text").attr("x", width / 1.714)
             .attr("y", 10).attr("dy", ".35em")
             .style("text-anchor", "start").text(function(d) {
                 return d.name;
             });
