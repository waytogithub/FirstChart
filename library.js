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
                 if((chartData.data[j].value[i])>Number(max)) {
                  max =chartData.data[j].value[i];
                  }
                 if(chartData.data[j].value[i]<Number(min)) {
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
     console.log(limits);
     maxVal=parseInt(limits[0]),minVal=parseInt(limits[1]);
     xAxisTicks=(chartData.data).length;
     yAxisTicks=(chartData.data).length;
     scaling(chartData,xAxisTicks,yAxisTicks,chartHeight,chartWidth,maxVal,minVal,i);
      }
  }
   
  
function getLimits(ulimit,llimit){
                 
                  var ullength=ulimit.length;
                  var lllength=llimit.length;
                  var neg=0;
                  if((ulimit%1)==0||ulimit<0){
                      if(ulimit<0){
                         neg=1;
                        ulimit=Math.abs(ulimit);
                      } 
                    
                  if(ulimit.substr(0,1)=="9"){
                    var cntZero=parseInt(ulimit.length)+1;
                    ulimit=ulimit.substr(0,1);
                    ulimit = (parseInt(ulimit)+1).toString();
                    ulimit=this.placeZero(ulimit,cntZero,1)
                    }
                  else{
                   ulimit=ulimit.substr(0,1);
                   ulimit=(parseInt(ulimit)+1).toString();
                   ulimit=this.placeZero(ulimit,ullength,1);
                   }
                 }
                  else
                  {   
                     var cntZero=0;
                      var str=ulimit.split(".");
                      var str1=str[0];
                      var str2=str[1];
                      for(var i=0;i<str2.length;i++){
                         if(str[i]=='0')
                         cntZero++;
                      }
                       cntZero++;
                       ulimit = str2.replace(/^0+/, '');
                       ulimit = ulimit.substr(0,1);
                       ulimit = (parseInt(ulimit)+1).toString();
                       ulimit=this.placeZero(ulimit,cntZero,1);
                       ulimit=str[0].concat(ulimit);
                      if(neg==1){
                        ulimit=-(parseInt(ulimit)).toString;
                      }
                    }
                   if((llimit%1)==0){
                     
                     if(llimit.length==1)
                       llimit="0";
                     else{
                       llimit=llimit.substr(0,1);
                       llimit=this.placeZero(llimit,lllength,1);
                      }
                   }
                   else{
                   cntZero=0;       
                   var str=llimit.split(".");
                   var str1=str[0];
                   var str2=str[1];
                   for(var k=0;k<lllength;k++){
                       if(str[k]=='0')
                       cntZero++;
                   }
                   cntZero++;
                   llimit=str2.replace(/^0+/,'');
                   llimit=llimit.substr(0,1);
                   llimit=this.placeZero(llimit,cntZero,0);
                   llimit=str[0].concat(llimit);
                   }
            // console.log(ulimit,llimit);     
             return [ulimit,llimit];

}
var placeZero= function(data,count,flag){
        if(flag==0){
            while (data.length < count) {
             data = '0'+data;
            }
            return "0."+data;
        }else{
            while (data.length < count) {
             data =  data+'0';
            }
            return data;
        
           }

}


function scaling(chartData,xAxisTicks,yAxisTicks,chartHeight,chartWidth,max,min,index){
        //console.log(min);
        var margin = 70;
        var svgHeight = chartHeight+100;
        var svgWidth = chartWidth+100;
        
        var divisionX = (chartWidth) / xAxisTicks;
        var divisionY = (chartHeight) / (yAxisTicks-1);
        var ratio = chartHeight/(max-min);
        var coordinateString="";
        var yValues=[];

        var x,y,yVal;
        var url = "http://www.w3.org/2000/svg";
        var divId=document.getElementById("container");
        //console.log(chartData.chart.yAxisName.length);
        var canvas=new Canvas(url);
        var svg=canvas.createSvg(svgWidth,svgHeight);
        divId.appendChild(svg);
        canvas.createLines(svg,margin,margin,margin,margin+chartHeight,"stroke:#000000");
        canvas.createLines(svg,margin,chartHeight+margin,margin+chartWidth,margin+chartHeight,"stroke:#000000");
        if(index==0){
        canvas.createText(svg,chartWidth/2+margin,margin-10,chartData.chart.caption,"blue",15);
        canvas.createText(svg,chartWidth/2+margin,margin+10,chartData.chart.subCaption,"blue",15);
        }
        //canvas.createRotateText(svg,margin-40,(chartHeight/2)+margin,chartData.chart.yAxisName[index],"blue",13,"rotate(-90 10,260)");
        if(index==chartData.chart.yAxisName.length-1)
        canvas.createText(svg,chartWidth/2+margin,chartHeight+margin+30,chartData.chart.xAxisName,"blue",15);  
        for(var i=0;i<chartData.data.length;i++){

        canvas.createLines(svg,margin+(divisionX*(i)),chartHeight+margin,margin+(divisionX*(i)),chartHeight+margin+5,"stroke:#000000");
        canvas.createText(svg,margin+(divisionX*(i)),chartHeight+margin+15,chartData.data[i].label,"blue",12);
        }
       //console.log(min+(((divisionY)/ratio)*1)); 
       for(var j=0;j<chartData.data.length;j++){
        canvas.createLines(svg,margin,margin+chartHeight-(divisionY*j),margin-5,margin+chartHeight-(divisionY*j),"stroke:#000000");  
        if(max>10000)
        canvas.createText(svg,margin-25,5+margin+chartHeight-(divisionY*j),(min+(((divisionY)/ratio)*j)).toFixed(2),"blue",11);
        else
        canvas.createText(svg,margin-20,5+margin+chartHeight-(divisionY*j),(min+(((divisionY)/ratio)*j)).toFixed(2),"blue",11);
        }
        for(k=0;k<chartData.data.length;k++){
          coordinateString+=margin+divisionX*(k)+","+(margin+chartHeight-((chartData.data[k].value[index]-min)*ratio))+" ";
        }
        canvas.createPolyLine(svg,coordinateString);
        //console.log(((chartData.data[index].value[0]-min)*ratio));
        for(k=0;k<chartData.data.length;k++)
        canvas.createCircle(svg,margin+divisionX*(k),(margin+chartHeight-((chartData.data[k].value[index]-min)*ratio)),3);
      
        }
        

 