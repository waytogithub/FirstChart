var renderChart=function(chartdata) {
    
    
    
  
    //console.log(chartdata);
    createLimit(chartdata);
        
    };


var calculateMaxMin =function(chartdata,noOfGraphs){
        
       
        var arrayLength=((chartdata.data).length),j;
        
        var maxminobj={};
        var maxminarray=[];
        
        var max,min;
        for(var i=0;i<noOfGraphs;i++){
            min = chartdata.data[0].value[i];
            
            max=min;

            j= 1;
             while(j<arrayLength){
                 if((chartdata.data[j].value[i])>Number(max)) {
                  max =chartdata.data[j].value[i];
                  }
                 if(chartdata.data[j].value[i]<Number(min)) {
                  min =chartdata.data[j].value[i];
                  }
                 j++;
             }
          
             maxminobj = {"max": max,"min": min}; 
             maxminarray[i]=maxminobj;
             
        }
         //console.log(maxminarray);
         return maxminarray;  
};

var createLimit=function(chartdata){
    var limits;
    var noOfGraphs = (chartdata.chart.yAxisName).length;
    
    var maxmin=calculateMaxMin(chartdata,noOfGraphs);
    
    for(var i=0;i<noOfGraphs;i++){
       var max=maxmin[i].max;
       
       var min=maxmin[i].min;  
       var maxVal=max.toString();
       var minVal=min.toString();
     limits=getlimits(maxVal,minVal);
     //console.log(limits);
     maxVal=limits[0],minVal=limits[1];
     
     xaxisticks=(chartdata.data).length;
     yaxisticks=(chartdata.data).length;
     scaling(chartdata,xaxisticks,yaxisticks,maxVal,minVal,i);
      }
  };

   
  
var getlimits= function(ulimit,llimit){
                 
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


var scaling= function(chartdata,xaxisticks,yaxisticks,max,min,index){
        //console.log(min);
        
        var svgHeight = 600;
        var svgWidth = 500;
        var chartHeight=svgHeight-100;
        var chartWidth=svgWidth-100;
        var divisionX = (chartWidth) / xaxisticks;
        var divisiony = (chartHeight) / (yaxisticks-1);
        var coordString="",margin = 50;
        var tickX,tickY,textColor="#000",fontSize=15;
        var ratio = chartHeight/(max-min);
        var yValues=[];
        var x,y,yVal;
        
        
        for(var i =0,j=0;i<chartdata.data.length;i++){
                x= (divisionX*(parseInt(i+1)))+margin;
                
                y = (chartHeight - ((chartdata.data[i].value[index]-min)*ratio))+margin;
                
                coordString += x+","+y+" ";
                j++;
                //console.log()
        }
          console.log(coordString);
          yValues[0]=parseInt(min);
          
          
          for(var j=1;j<yaxisticks;j++){
          yValues[j]=(((max-min)/(yaxisticks-1))*j)+parseInt(min);
          
      
        }
      
      //  console.log(yValues);
        
         
         var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                svg.setAttribute('width', svgWidth);
                svg.setAttribute('height', svgHeight);
                svg.setAttribute("style", "margin:20px");
        var url = "http://www.w3.org/2000/svg";
        
        if(index==0){
        createText(url,svg,300,10,chartdata.chart.caption);
        createText(url,svg,300,40,chartdata.chart.subCaption);  
        createTextRotate(url,svg,(margin/2),(chartHeight/2),chartdata.chart.yAxisName[0],"(-90 (margin/2),(chartHeight/2)");
        }
        if(index==2){
         createText(url,svg,250,chartHeight+margin+40,chartdata.chart.xAxisName); 
        }

        createLines(url,svg,margin,chartHeight+margin,chartWidth+margin,chartHeight+margin,"stroke:#000000");
        createLines(url,svg,margin,margin,margin,chartHeight+margin,"stroke:#000000");
        for(var i=0;i<xaxisticks;i++){
                    tickX = parseInt(divisionX)*(i+1)+margin+3;
                    createLines(url,svg,tickX,(chartHeight+margin+10),tickX,(chartHeight+margin+1),"stroke:#000000");
                    var text =chartdata.data[i].label;

                    createText(url,svg,(tickX),(chartHeight+margin+22),text);
        }
        var coordinates = coordString.split(" ");
        var center;
                for( var i = 0;i<(coordinates.length);i++){               
                     center= coordinates[i].split(","); 
                   //console.log(center);
                   createCirle(url,svg,center[0],center[1],3);
                 }
        for(var i=0;i<yaxisticks;i++){
                    
                    tickY =chartHeight-((parseInt(divisiony)*(i)))+margin;
                   createLines(url,svg,margin,tickY,margin-5,tickY);
                    
                    
                    if(((yValues[i])%1)!=0)
                     yValues[i]=yValues[i].toFixed(2);
                    if((yValues[i].toString()).length>3){
                      createText(url,svg,margin-30,tickY+3,yValues[i].toString()); 
                    }
                    else
                    createText(url,svg,margin-15,tickY+3,yValues[i].toString());                    
        }         
        createPolyLine(url,svg,coordString);

        document.body.appendChild(svg);
        };
        

    var createLines = function(url,svg,x1,y1,x2,y2,style){
        

        var line = document.createElementNS(url, "line");
            line.setAttributeNS(null, "x1",x1);
            line.setAttributeNS(null, "y1",y1);
            line.setAttributeNS(null, "x2",x2);
            line.setAttributeNS(null, "y2",y2);
            line.setAttribute('style', "stroke:#5BDE6C");
            svg.appendChild(line);
       
    };
    
  var createPolyLine = function(url,svg,coordString){
        var poly = document.createElementNS(url, "polyline");
        poly.setAttributeNS(null, "points", coordString);
        poly.setAttribute('style', "stroke:#5BDE6C; fill:none;");
        svg.appendChild(poly); 
    };
   var createText = function(url,svg,x,y,textVal,textColor){
        var newText = document.createElementNS(url,"text");
            newText.setAttributeNS(null,"x",x);     
            newText.setAttributeNS(null,"y",y); 
            newText.setAttributeNS(null,"font-size","13");
            newText.setAttributeNS(null,"text-anchor","middle");
            newText.setAttributeNS(null, "fill", "green");

        var textNode = document.createTextNode(textVal);
            newText.appendChild(textNode);
            svg.appendChild(newText);

    };
   var createCirle = function(url,svg,x,y,r){
            //console.log(x,y);
            var shape = document.createElementNS(url, "circle");
            shape.setAttributeNS(null, "cx", x);
            shape.setAttributeNS(null, "cy", y);
            shape.setAttributeNS(null, "r",  r);
            shape.setAttributeNS(null, "fill", "rgba(50,140,90,0.5)");
            svg.appendChild(shape);
};
var createTextRotate = function(url,svg,x,y,textVal,textColor,rotate){
        var newText = document.createElementNS(url,"text");
            newText.setAttributeNS(null,"x",x);     
            newText.setAttributeNS(null,"y",y); 
            newText.setAttributeNS(null,"font-size","13");
            newText.setAttributeNS(null,"text-anchor","middle");
            newText.setAttributeNS(null, "fill", "green");
            newText.setAttributeNS(null,"transform",rotate);
        var textNode = document.createTextNode(textVal);
            newText.appendChild(textNode);
            svg.appendChild(newText);

    };
