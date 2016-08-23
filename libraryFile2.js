function RenderChart(chartHeight,chartWidth,chartData) {
    this.chartHeight=chartHeight;
    this.chartWidth=chartWidth;
    this.chartData=chartData;
   }
RenderChart.prototype.render=function(){
createLimit(this.chartData,this.chartHeight,this.chartWidth);
}


 function calculateMaxMin(chartData,noOfGraphs){
        
       
        var arrayLength=((chartData.data).length),j;
        
        var maxminobj={};
        var maxminarray=[];
        
        var max,min;
        for(var i=0;i<noOfGraphs;i++){
            min = chartData.data[0].value[i];
            
            max=min;
            j= 1;
             while(j<arrayLength){
                 if(parseInt(chartData.data[j].value[i])>Number(max)) {
                  max =chartData.data[j].value[i];
                  }
                 if(parseInt(chartData.data[j].value[i])<Number(min)) {
                  min =chartData.data[j].value[i];
                  }
                 j++;
             }
          
             maxminobj = {"max": max,"min": min}; 
             maxminarray[i]=maxminobj;
             
        }
         //console.log(maxminarray);
         return maxminarray;  
}

  function createLimit(chartData,chartHeight,chartWidth){
    var limits;
    var noOfGraphs = (chartData.chart.yAxisName).length;
    
    var maxmin=calculateMaxMin(chartData,noOfGraphs);
    
    for(var i=0;i<noOfGraphs;i++){
       var max=maxmin[i].max;
       
       var min=maxmin[i].min;  
       var maxVal=max.toString();
       var minVal=min.toString();
     limits=getLimits(maxVal,minVal);
     //console.log(limits);
     maxVal=parseInt(limits[0]),minVal=parseInt(limits[1]);
     xAxisTicks=(chartData.data).length;
     yAxisTicks=(chartData.data).length;
     scaling(chartData,xAxisTicks,yAxisTicks,chartHeight,chartWidth,maxVal,minVal,i);
      }
  }
   
  
function getLimits(ul,ll){
            var addZero=0;
            var flagUl=0,flagLl=0;
            if(parseInt(ul)<0){
               flagUl=1;
               ul=Math.abs(parseInt(ul));
               ul=ul.toString();
            }
            if((parseInt(ul)%1)<0){
               ul=parseInt(ulimit)-(parseInt(ulimit)%1);
               ul=ul.toString();
            }
          
            for(var i=0;i<(ul.length)-1;i++)
               addZero++;
               ul=ul.substr(0,1);
                 if(flagUl==1){
                    ul=parseInt(ul);  
                 }else{
                    ul=parseInt(ul)+1;
                 }
            for(var j=0;j<addZero;j++)
               ul+='0';
            
            if(parseInt(ll)<0){
               flagLl=1;
               ll=Math.abs(parseInt(ll));
               ll=ll.toString();
            }
            if((parseInt(ll)%1)<0){
               ll=parseInt(ll)-(parseInt(ll)%1);
               ll=ll.toString();
            }
            addZero=0;
            for(var i=0;i<(ll.length)-1;i++)
               addZero++;
               ll=ll.substr(0,1);
               if(flagLl==1)
                  ll=parseInt(ll)+1;
               for(var j=0;j<addZero;j++)
                  ll+='0'; 
            
            if(flagUl==1)
               ul=-parseInt(ul);
            if(flagLl==1)
               ll=-parseInt(ll);
       // console.log(ul,ll);
        return [ul,ll];
}
function scaling(chartData,xAxisTicks,yAxisTicks,chartHeight,chartWidth,max,min,index){
        //console.log(min);
        var margin = 70,svgHeight = chartHeight+100,svgWidth = chartWidth+100,
            circleXCoord=[], 
            divisionX = (chartWidth) / xAxisTicks, divisionY = (chartHeight) / (yAxisTicks-1),
            ratio = chartHeight/(max-min),coordinateString="", yValues=[],x,y,yVal,rectHeight=(chartHeight)/6,
            rectWidth=chartWidth,captionHeight=20,captionWidth=10;
            url = "http://www.w3.org/2000/svg",
            divId=document.getElementById("container"),
            canvas=new Canvas(url), 
            svg=canvas.createSvg(svgWidth,svgHeight,circleXCoord);
            
            
        divId.appendChild(svg);
        canvas.createLines(svg,margin,margin,margin,margin+chartHeight,"stroke:#000000");
        canvas.createLines(svg,margin,chartHeight+margin,margin+chartWidth,margin+chartHeight,"stroke:#000000");
  
        for(var i=0;i<5;i++){
           if((i%2)==0) 
              canvas.createRectangle(svg,rectHeight,rectWidth,margin,chartHeight-(rectHeight*i),"green");
        }

        if(index==1){
           canvas.createText(svg,chartWidth/2+margin,captionHeight,chartData.chart.caption,"blue",15);
           canvas.createText(svg,chartWidth/2+margin,captionHeight+20,chartData.chart.subCaption,"blue",15);
        }

        canvas.createRotateText(svg,margin-40,(chartHeight/2)+margin,chartData.chart.yAxisName[index],"blue",14,"rotate(-90 10,260)");
        
        if(index==chartData.chart.yAxisName.length-2)
           canvas.createText(svg,chartWidth/2+margin,chartHeight+margin+30,chartData.chart.xAxisName,"blue",14);  
        for(var i=0;i<chartData.data.length;i++){
           canvas.createLines(svg,margin+(divisionX*(i)),chartHeight+margin,margin+(divisionX*(i)),chartHeight+margin+5,"stroke:#000000");
           if(index>=(chartData.chart.yAxisName.length)-3)
               canvas.createText(svg,margin+(divisionX*(i)),chartHeight+margin+17,chartData.data[i].label,"blue",12);
           }
      
       for(var j=0;j<chartData.data.length;j++){
          canvas.createLines(svg,margin,margin+chartHeight-(divisionY*j),margin-5,margin+chartHeight-(divisionY*j),"stroke:#000000");  
            if(max>10000){
               if(((((min+((divisionY)/ratio)*j))%1))>0)  
                  canvas.createText(svg,margin-25,5+margin+chartHeight-(divisionY*j),((min+((divisionY)/ratio)*j)).toFixed(2),"blue",11);
               else
                  canvas.createText(svg,margin-25,5+margin+chartHeight-(divisionY*j),((min+((divisionY)/ratio)*j)),"blue",11);  
            }else{
                if(((min+((divisionY/ratio)*j))%1)>0) 
                    canvas.createText(svg,margin-25,5+margin+chartHeight-(divisionY*j),(min+(((divisionY)/ratio)*j)).toFixed(2),"blue",11);
                else
                    canvas.createText(svg,margin-25,5+margin+chartHeight-(divisionY*j),(min+(((divisionY)/ratio)*j)),"blue",11);
            }
        }

       for(k=0;k<chartData.data.length;k++){
          coordinateString+=margin+divisionX*(k)+","+(margin+chartHeight-((chartData.data[k].value[index]-min)*ratio))+" ";
        }
       canvas.createPolyLine(svg,coordinateString);
       for(k=0;k<chartData.data.length;k++){
        var shape= canvas.createCircle(svg, margin+divisionX*(k),(margin+chartHeight-((chartData.data[k].value[index]-min)*ratio)),3);
        var obj={};
        obj.shape=shape;
        obj.x=shape.getAttribute("cx");
        circleXCoord.push(obj);
       }
}            
