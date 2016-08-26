function column(chartData,xAxisTicks,yAxisTicks,chartHeight,chartWidth,max,min,index,circleXCoord){
        //console.log(min);
  var margin = 70,i,j,
  svgHeight = chartHeight+100,
  svgWidth = chartWidth+100,
  captionHeight=20,
  captionWidth=10;
  url = "http://www.w3.org/2000/svg",
  divId=document.getElementById("container"),
  canvas=new Canvas(url), 
  svg=canvas.createSvg(svgWidth,svgHeight,circleXCoord,index);
  divId.appendChild(svg);
  canvas.createLines(svg,margin,margin,margin,margin+chartHeight,"stroke:#000000");
  canvas.createLines(svg,margin,chartHeight+margin,margin+chartWidth,margin+chartHeight,"stroke:#000000");
   
  }
