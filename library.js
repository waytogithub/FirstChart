var renderChart=function(divid,width,height,chartdata) {
    this.chartdata = chartdata;
    this.yaxisticks = 6;
    this.xaxisticks = 5;
    this.width = width;
    this.height = height;
    this.divid=divid;
    
    //console.log(chartdata);
    createLimit(chartdata);
        
    };


var calculateMaxMin =function(obj,noOfGraphs){
        
       
        var noOfIteration=((obj.data).length),j;
        var maxminobj={};
        
        var max,min;
        for(var i=0;i<noOfGraphs;i++){
            min = obj.data[0].value[i];max=min;

            j= 1;
             while(j<noOfIteration){
                 if((obj.data[j].value[i])>max){
                  max =obj.data[j].value[i]
                  }
                 if((obj.data[j].value[i])<min){ 
                  min =obj.data[j].value[i]
                  }
                 j++;
             }
             maxminobj[i] = {"max": max,"min": min}; 
             
        }
         return maxminobj;  
};

var createLimit=function(chartdata){
    var limits;
    var noOfGraphs = (chartdata.chart.yAxisName).length;
    //console.log(noOfGraphs);
    var maxmin=calculateMaxMin(chartdata,noOfGraphs);
    console.log(maxmin);
    for(var i=0;i<noOfGraphs;i++){
       var max=maxmin[i].max;
       var min=maxmin[i].min;  
       var maxVal=max.toString();
       var minVal=min.toString();
     limits=getlimits(maxVal,minVal);
     maxVal=limits[0],minval=limits[1];

     xaxisticks=(chartdata.data).length;
     console.log(xaxisticks);
     scaling(chartdata,5,5,maxVal,minVal,i);
      }
  };

   
  
this.getlimits= function(ulimit,llimit){
                  var ullength=ulimit.length;
                  var lllength=llimit.length;
                  if((ulimit%1)==0){
                  ulimit=ulimit.substr(0,1);
                  ulimit=(parseInt(ulimit)+1).toString();
                  ulimit=this.placeZero(ulimit,ullength,1);
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
                      }
                   if((llimit%1)==0){
                   llimit=llimit.substr(0,1);
                   llimit=this.placeZero(llimit,lllength,1);
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
                    
             return [ulimit,llimit];
};
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

};


var scaling= function(chartdata,xaxisticks,yaxisticks,newmax,newmin,index){
        
        var svgHeight = 500;
        var svgWidth = 600;
        var chartHeight=svgHeight-100;
        var chartWidth=svgWidth-100;
        var divisionX = (chartWidth) / xaxisticks;
        var divisiony = (chartHeight) / yaxisticks;
        var ratio = chartHeight/(newmax-newmin); 
        var coordString="",ycord,xcord,marginxy = 50;
        var tickX,tickY,textColor="#000",fontSize=15;
        var i = 1;
        for(var k =0;k<chartdata.data.length;k++){
                xcord= (divisionX*(parseInt(k)+1))+marginxy;
                ycord = (chartHeight - ((chartdata.data[k].value[index]-newmin)*ratio))+marginxy;
                coordString += xcord+","+ycord+" ";i++;
        }

         //console.log(coordString);
         var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                svg.setAttribute('width', svgWidth);
                svg.setAttribute('height', svgHeight);
                svg.setAttribute("style", "margin:20px");
         
         var url = "http://www.w3.org/2000/svg";
        
         //Drawing Axes  
        this.createLines(url,svg,marginxy,chartHeight+marginxy,chartWidth+marginxy,chartHeight+marginxy);
        this.createLines(url,svg,marginxy,marginxy,marginxy,chartHeight+marginxy);
        for(var i=0;i<xaxisticks;i++){
                    tickX = parseInt(divisionX)*(i+1)+marginxy;
                    this.createLines(url,svg,tickX,(chartHeight+marginxy+25),tickX,(chartHeight+marginxy+15),"stroke:#000000");
                    var text =this.chartdata.data[i].label;
                    this.createText(url,svg,(tickX),(chartHeight+marginxy+45),text);
        }
        
        this.createPolyLine(url,svg,coordString);
        document.body.appendChild(svg);
        };
         

    this.createLines = function(url,svg,x1,y1,x2,y2,style){
        

        var lineXY = document.createElementNS(url, "line");
            lineXY.setAttributeNS(null, "x1",x1);
            lineXY.setAttributeNS(null, "y1",y1);
            lineXY.setAttributeNS(null, "x2",x2);
            lineXY.setAttributeNS(null, "y2",y2);
            lineXY.setAttribute('style', "stroke:#5BDE6C");
            svg.appendChild(lineXY);
       
    };
    
    this.createPolyLine = function(url,svg,coordString){
        var shape = document.createElementNS(url, "polyline");
        shape.setAttributeNS(null, "points", coordString);
        shape.setAttribute('style', "stroke:#5BDE6C; fill:none;");
        svg.appendChild(shape); 
    };
    this.createText = function(url,svg,x,y,textVal,textColor,fontSize){
        var newText = document.createElementNS(url,"text");
            newText.setAttributeNS(null,"x",x);     
            newText.setAttributeNS(null,"y",y); 
            newText.setAttributeNS(null,"font-size","fontSize");
            newText.setAttributeNS(null,"text-anchor","middle");
            newText.setAttributeNS(null, "fill", textColor);
        var textNode = document.createTextNode(textVal);
            newText.appendChild(textNode);
            svg.appendChild(newText);

    };
 

